import React, { Component } from "react";
import HostButton from "./components/Landing/HostButton";
import JoinButton from "./components/Landing/JoinButton";

interface AppState {
    hoverHost: boolean,
    hoverJoin: boolean
}

class Landing extends Component<{}, AppState> {
    constructor(props: {}) {
        super(props)
        this.state={ hoverHost: true, hoverJoin: true };
    }
    toggleJoin = () => {
        this.setState({...this.state, hoverJoin: !this.state.hoverJoin})
    }
    toggleHost = () => {
        this.setState({...this.state, hoverHost: !this.state.hoverHost})
    }

  render() {
    return (
      <div className="overflow-hidden bg-indigo-600" style={{height: '90%'}}>
        <div className="mx-auto my-32 w-1/2 md:w-1/3">
            <div className="mx-auto text-5xl text-white text-center mb-10">Welcome To Muse</div>
            <HostButton hoverHost={this.state.hoverHost} toggleJoin={this.toggleJoin}/>
            <JoinButton hoverJoin={this.state.hoverJoin} toggleHost={this.toggleHost}/>
        </div>
      </div>
    );
  }
}

export default Landing;
