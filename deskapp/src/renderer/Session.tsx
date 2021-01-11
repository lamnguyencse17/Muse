import React, {useEffect, useState} from 'react';
import {DataConnection} from "peerjs";
import {useHistory} from "react-router-dom";
import {disconnectToPeerServer, getPeerObject, PeerObject} from "../common/peer";
import {PEER_CONNECTED_EVENT, PEER_DISCONNECTED_EVENT} from "../common/constants/events";

function Session() {
    const history = useHistory();
    const [peerId, setPeerId] = useState("");
    const [peerObject, setPeer] = useState<PeerObject | undefined>(undefined);
    const [connections, setConnections] = useState<DataConnection[]>([]);
    useEffect(() => {
        (async () => {
            if (peerObject !== undefined) {
                return;
            }
            try {
                const returnedPeer = getPeerObject();
                setPeer(returnedPeer);
                setPeerId(returnedPeer.getPeerID());
                setConnections(returnedPeer.getConnections());
            } catch (err) {
                history.push("/")
            }
        })()
        peerObject?.on(PEER_DISCONNECTED_EVENT, (newConnections) => {
            setConnections([...newConnections])
        })
        peerObject?.on(PEER_CONNECTED_EVENT, (newConnections) => {
            setConnections([...newConnections])
        })
        return () => {
            if (peerObject !== undefined && peerObject.isDisconnected()) {
                peerObject?.off(PEER_CONNECTED_EVENT, () => {
                })
                peerObject?.off(PEER_DISCONNECTED_EVENT, () => {
                })
                disconnectToPeerServer();
                history.push("/");
            }
        }
    }, [connections])
    return (
        <div className="overflow-hidden bg-red-400" style={{height: "90%"}}>
            <div className="container mx-auto text-center h-full">
                <div className="text-3xl text-white">Session</div>
                <div className="my-5 grid-cols-3 grid h-full">
                    <div className="col-span-2 h-full grid grid-rows-6">
                        <div className="row-span-5">
                            CONTENT
                        </div>
                        <div className="row-span-1">
                            TOOLBAR
                        </div>
                    </div>
                    <div className="col-span-1 flex flex-col text-center">
                        {connections.map(connection => <div className="text-white text-2xl">{connection.peer}</div>)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Session;
