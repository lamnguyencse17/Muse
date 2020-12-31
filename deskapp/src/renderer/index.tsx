import React, {useEffect} from "react";
import ReactDom from "react-dom";
import "./assets/main.css";
import Landing from "./Landing";
import { HashRouter, Route } from "react-router-dom";
import Host from "./Host";
import Navbar from "./Navbar";
import Peer from "peerjs";
import {ipcRenderer} from "electron";
import {PEERJS_CHANNEL, SET_PEER_ID, SET_PEER_ID_REPLY} from "../common/constants/peerjs";

const peer = new Peer({
  host: "localhost",
  port: 3000,
  path: "/peerjs"
});

const Index = () => {
  useEffect(() => {
    peer.on("open", (id) => {
      ipcRenderer.send(PEERJS_CHANNEL, {eventName: SET_PEER_ID, payload: id});
    })
    ipcRenderer.on(SET_PEER_ID_REPLY, () => {
      console.log("SET SUCCESSFULLY")
    })
  })
  return (
    <HashRouter>
      <div className="w-full h-full overflow-hidden">
        <Navbar />
        <Route path="/" exact>
          <Landing />
        </Route>
        <Route path="/host">
          <Host />
        </Route>
      </div>
    </HashRouter>
  );
};

ReactDom.render(<Index />, document.getElementById("root"));
