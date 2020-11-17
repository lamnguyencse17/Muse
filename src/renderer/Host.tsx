import React, { Component } from "react";

interface AppState {}

class Host extends Component<{}, AppState> {
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
            <div className="overflow-hidden bg-green-400" style={{height: "90%"}}>
                <div className="mx-auto my-24 w-2/3 space-y-10">
                    <div className="mx-auto text-4xl text-black text-center">
                        <div>Let's Host A Music Session</div>
                    </div>
                    <div className="mx-auto text-2xl text-black text-center">
                        <div>Let Everyone Know This Cool ID</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Host;