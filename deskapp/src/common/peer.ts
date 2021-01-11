import Peer, {DataConnection} from "peerjs";
import EventEmitter from "events"
import {PEER_CONNECTED_EVENT, PEER_DISCONNECTED_EVENT} from "./constants/events";

export class PeerObject extends EventEmitter{
    private peer: Peer | undefined;
    private peerID: string | undefined;
    private dataConnections: DataConnection[] = [];
    private isHost: boolean = false;
    public initPeer = async (isHost: boolean): Promise<Peer | undefined> => {
        const initPromise = () => new Promise<Peer | undefined>(resolve => {
            this.isHost = isHost
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
                const connectedDataConnections = [...this.dataConnections, dataConnection]
                this.emit(PEER_CONNECTED_EVENT, connectedDataConnections)
                dataConnection.on("close", () => {
                    const disconnectedDataConnections = this.dataConnections.filter((existedConnection:DataConnection) => existedConnection.peer !== dataConnection.peer)
                    this.emit(PEER_DISCONNECTED_EVENT, disconnectedDataConnections)
                    this.dataConnections = disconnectedDataConnections
                    dataConnection.off("close", () => {})
                })
                this.dataConnections = connectedDataConnections;
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

export const connectToPeerServer = async (isHost: boolean): Promise<PeerObject> => {
    peer = new PeerObject();
    await peer.initPeer(isHost);
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
