import React, {useEffect, useState} from 'react';
import {ipcRenderer} from "electron";
import {GET_PEER_ID, GET_PEER_ID_REPLY, PEERJS_CHANNEL} from "../common/constants/peerjs";

function Host() {
    const [hostId, setHostId] = useState("");
    useEffect(() => {
        ipcRenderer.send(PEERJS_CHANNEL, {eventName: GET_PEER_ID});
        ipcRenderer.once(GET_PEER_ID_REPLY, (event, arg: string) => {
            setHostId(arg);
        })
        // return () => {
        //     ipcRenderer.removeListener(GET_PEER_ID_REPLY, () => {
        //         console.log("REMOVE")
        //     })
        // }
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
