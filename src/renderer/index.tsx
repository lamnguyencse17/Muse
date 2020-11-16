import React from 'react';
import ReactDom from 'react-dom';
import "./assets/main.css";
import Landing from "./Landing";
import {HashRouter, Route} from "react-router-dom"

const Index = () => {
  return (
      <HashRouter>
        <Route path="/" exact>
          <Landing/>
        </Route>
      </HashRouter>
  )
}

ReactDom.render(<Index />, document.getElementById("root"))
