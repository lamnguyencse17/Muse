import Peer from "peerjs";

export class PeerObject {
    public peer: Peer | undefined;
    private peerID: string | undefined;

    public initPeer = async (): Promise<Peer | undefined> => {
        const initPromise = () => new Promise<Peer | undefined>(resolve => {
            this.peer = new Peer({
                host: "localhost",
                port: 3000,
                path: "/peerjs"
            });
            this.peer.on("open", (id) => {
                this.peerID = id;
                resolve(this.peer);
            })
        });
        return await initPromise();
    }
    public getPeerID = (): string => {
        if (this.peerID === undefined) {
            throw "Not connected to peer server yet!"
        }
        return this.peerID;
    }
    public disconnectPeerJS = () => {
        this.peerID = "";
        this.peer?.disconnect();
    }
    public isDisconnected = (): boolean | undefined => {
        return this.peer?.disconnected;
    }
}

let peer: PeerObject | undefined;

export const connectToPeerServer = async (): Promise<PeerObject> => {
    peer = new PeerObject();
    await peer.initPeer();
    return peer;
}

export const disconnectToPeerServer = () => {
    if (peer === undefined) {
        throw "Not connected to peer server yet!";
    }
    peer.disconnectPeerJS();
    peer = undefined;
}

export const getPeerObject = (): PeerObject => {
    if (peer === undefined) {
        throw "Not connected to peer server yet!";
    }
    return peer;
}
