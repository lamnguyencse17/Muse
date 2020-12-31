import React from "react";
import { Link } from "react-router-dom";

function HostButton(props: { hoverHost: boolean; toggleJoin: () => void }) {
  if (props.hoverHost) {
    return (
      <Link to="/host">
        <button
          onMouseOver={props.toggleJoin}
          onMouseLeave={props.toggleJoin}
          className="mx-auto bg-black text-2xl text-white rounded-2xl p-2 border-white w-full my-5"
        >
          Host a Music Session?
        </button>
      </Link>
    );
  }
  return (
    <Link to="/host">
      <button
        className="mx-auto bg-black text-2xl text-white rounded-2xl p-2 border-white w-full my-5"
        style={{ visibility: "hidden" }}
      >
        Host a Music Session?
      </button>
    </Link>
  );
}

export default HostButton;
