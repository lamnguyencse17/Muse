import React from 'react';

function HostButton(props: {hoverHost: boolean, toggleJoin: () => void}) {
    if (props.hoverHost){
        return (
            <button onMouseOver={props.toggleJoin} onMouseLeave={props.toggleJoin} className="mx-auto bg-black text-2xl text-white rounded-2xl p-2 border-white w-full">Host a Music Session?</button>
        );
    }
    return <button className="mx-auto bg-black text-2xl text-white rounded-2xl p-2 border-white w-full" style={{visibility: "hidden"}}>Host a Music Session?</button>
}

export default HostButton;