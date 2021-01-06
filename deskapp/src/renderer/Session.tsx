import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {disconnectToPeerServer, getPeerObject, PeerObject} from "../common/peer";

function Session() {
    const history = useHistory();
    const [peerId, setPeerId] = useState("");
    const [peerObject, setPeer] = useState<PeerObject | undefined>(undefined);
    useEffect(() => {
        (async () => {
            try {
                const returnedPeer = getPeerObject();
                setPeer(returnedPeer);
                setPeerId(returnedPeer.getPeerID());
                if (returnedPeer.peer !== undefined) {
                    returnedPeer.peer.on("connection", () => history.push("/session"))
                }
            } catch (err) {
                console.log(err);
                history.push("/")
            }
        })()
        return () => {
            if (peerObject !== undefined && peerObject.isDisconnected()) {
            peerObject.peer?.off("connection", () => {
            });
            disconnectToPeerServer();
            history.push("/");
        }
        }
    }, [])
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
                        {peerObject?.getConnections().map(connection => <div className="text-white text-2xl">{connection.peer}</div>)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Session;
