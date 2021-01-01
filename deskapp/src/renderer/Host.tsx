import React, {useEffect, useState} from 'react';
import {connectToPeerServer, disconnectToPeerServer, getPeerObject, PeerObject} from "../common/peer";

function Host() {
    const [hostId, setHostId] = useState("");
    const [peer, setPeer] = useState<PeerObject | undefined>(undefined);
    useEffect(() => {
        (async () => {
            try {
                setPeer(getPeerObject());
            } catch (err) {
                const returnedPeer = await connectToPeerServer()
                setPeer(returnedPeer);
                setHostId(returnedPeer.getPeerID());
            }
        })()
        return () => {
            disconnectToPeerServer();
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
