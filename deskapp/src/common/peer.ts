import Peer, {DataConnection} from "peerjs";

export class PeerObject {
    public peer: Peer | undefined;
    private peerID: string | undefined;
    private dataConnections: DataConnection[] = [];
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
            this.peer?.on("connection", (dataConnection) => {
                this.dataConnections.push(dataConnection);
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
        if (this.peer === undefined) {
            throw "Not connected to peer server yet!"
        }
        return this.peer.disconnected;
    }
    public connectToHost = (hostId:string):boolean => {
        if (this.peer === undefined) {
            throw "Not connected to peer server yet!"
        }
        try {
            this.dataConnections.push(this.peer.connect(hostId));
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }
    public getConnections = (): DataConnection[] => {
        return this.dataConnections;
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
