import React from 'react';
import {Link} from "react-router-dom"

function Navbar(props: {}) {
    return (
        <div className="bg-gray-200 w-full flex content-center flex-wrap justify-center" style={{height: "10%"}}>
            <div className="space-x-10 inline-block h-auto">
                <Link to="/" className="font-bold text-2xl">Home</Link>
                <Link to="/host" className="font-bold text-2xl">Host</Link>
                <Link to="/join" className="font-bold text-2xl">Join</Link>
            </div>
        </div>
    );
}

export default Navbar;
