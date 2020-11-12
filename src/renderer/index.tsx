import React from 'react';
import ReactDom from 'react-dom';
import "./assets/main.css";
import Landing from "./Landing";

const Index = () => {
  return (
    <div>
        <Landing/>
    </div>
  )
}

ReactDom.render(<Index />, document.getElementById("root"))
