import React, {useEffect, useState} from 'react';
import {connectToPeerServer, disconnectToPeerServer, getPeerObject, PeerObject} from "../common/peer";
import {useHistory} from "react-router-dom";

function Host() {
    const [hostId, setHostId] = useState("");
    const [peerObject, setPeer] = useState<PeerObject | undefined>(undefined);
    const history = useHistory();
    useEffect(() => {
        let isConnected = false;
        (async () => {
            if (peerObject !== undefined) {
                return;
            }
            let returnedPeer: PeerObject | undefined;
            try {
                returnedPeer = getPeerObject();
            } catch (err) {
                returnedPeer = await connectToPeerServer()
            }
            if (returnedPeer !== undefined && returnedPeer.peer !== undefined) {
                setPeer(returnedPeer);
                setHostId(returnedPeer.getPeerID());
                returnedPeer.peer.on("connection", () => {
                    isConnected = true;
                    history.push("/session");
                })
            }
        })()
        return () => {
            if (isConnected) {
                peerObject?.peer?.off("connection", () => {
                });
            } else {
                disconnectToPeerServer();
            }
        }
    }, [])
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
