import Peer from "peerjs";

export class PeerObject {
    private peerID: string|undefined;
    private peer: Peer | undefined;
    public initPeer = async (): Promise<Peer|undefined> => {
        const initPromise = () => new Promise<Peer|undefined>(resolve => {
            this.peer = new Peer({
                host: "localhost",
                port: 3000,
                path: "/peerjs"
            });
            this.peer.on("open", (id) => {
                this.peerID = id;
                resolve(this.peer);
                // resolve(this.peer);
            })});
        return await initPromise();
}
    public getPeerID = ():string => {
        if (this.peerID === undefined){
            throw "Not connected to peer server yet!"
        }
        console.log(this.peerID);
        return this.peerID;
    }
    public disconnectPeerJS = () => {
        this.peerID = "";
        this.peer?.disconnect();
    }
    public isDisconnected = ():boolean|undefined => {
        return this.peer?.disconnected;
    }
}
let peer: PeerObject|undefined;

export const connectToPeerServer = async (): Promise<PeerObject> => {
    peer = new PeerObject();
    await peer.initPeer();
    return peer;
}

export const disconnectToPeerServer = () => {
    if (peer === undefined){
        throw "Not connected to peer server yet!";
    }
    peer.disconnectPeerJS();
    peer = undefined;
}

export const getPeerObject = (): PeerObject => {
    if (peer === undefined){
        throw "Not connected to peer server yet!";
    }
    console.log(peer);
    return peer;
}
