import express from "express";
import {ExpressPeerServer} from "peer";
import {ExpressPort} from "./constants/config";
import idGenerator from "./generator";

const app = express();

const server = app.listen(process.env.PORT || ExpressPort, () => {
    console.log(`Listening on port ${process.env.PORT || 3000}`);
})

const peerServer = ExpressPeerServer(server, {
    path: '/',
    generateClientId: idGenerator
});

app.use('/peerjs', peerServer);
