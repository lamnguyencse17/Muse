import React from 'react';

function JoinButton(props: {hoverJoin: boolean, toggleHost: () => void}) {
    if (props.hoverJoin){
        return (
            <button onMouseOver={props.toggleHost} onMouseLeave={props.toggleHost} className="mx-auto bg-white text-2xl text-black rounded-2xl p-2 border w-full">Join a Music Session?</button>
        );
    }
    return <button className="mx-auto bg-white text-2xl text-black rounded-2xl p-2 border w-full" style={{visibility: "hidden"}}>Join a Music Session?</button>
}

export default JoinButton;