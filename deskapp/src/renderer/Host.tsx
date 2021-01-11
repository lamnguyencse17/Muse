import React, {useEffect, useState} from 'react';
import {connectToPeerServer, disconnectToPeerServer, getPeerObject, PeerObject} from "../common/peer";
import {useHistory} from "react-router-dom";
import {PEER_CONNECTED_EVENT} from "../common/constants/events";

function Host() {
    const [hostId, setHostId] = useState("");
    const [peerObject, setPeer] = useState<PeerObject | undefined>(undefined);
    const history = useHistory();
    useEffect(() => {
        (async () => {
            if (peerObject !== undefined) {
                return;
            }
            let returnedPeer: PeerObject | undefined;
            try {
                returnedPeer = getPeerObject();
            } catch (err) {
                returnedPeer = await connectToPeerServer(true)
            }
            if (returnedPeer !== undefined) {
                setPeer(returnedPeer);
                setHostId(returnedPeer.getPeerID());
            }
        })()
        peerObject?.on(PEER_CONNECTED_EVENT, () => {
            history.push("/session");
        })
        return () => {
            if (peerObject?.getConnections().length != 0) {
                peerObject?.off(PEER_CONNECTED_EVENT, () => {
                })
                // peerObject?.peer?.off("connection", () => {
                // });
            } else {
                disconnectToPeerServer();
            }
        }
    }, [peerObject])
    return (
        <div className="overflow-hidden bg-green-400" style={{height: "90%"}}>
            <div className="mx-auto my-24 w-2/3 space-y-10">
                <div className="mx-auto text-4xl text-black text-center">
                    <div>Let's Host A Music Session</div>
                </div>
                <div className="flex flex-col mx-auto text-2xl text-black text-center">
                    <div>Let Everyone Know This Cool ID</div>
                    {hostId === "" ? <></> : <div>{hostId}</div>}
                </div>
            </div>
        </div>
    );
}

export default Host;
