import express from "express";
import {ExpressPeerServer} from "peer";

const app = express();

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port ${process.env.PORT || 3000}`);
})

const peerServer = ExpressPeerServer(server, {
    path: '/'
});

app.use('/peerjs', peerServer);
