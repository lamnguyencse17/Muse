import React from "react";
import ReactDom from "react-dom";
import "./assets/main.css";
import Landing from "./Landing";
import { HashRouter, Route } from "react-router-dom";
import Host from "./Host";
import Navbar from "./Navbar";

const Index = () => {
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
