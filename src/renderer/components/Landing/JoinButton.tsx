import React from "react";
import { Link } from "react-router-dom";

function JoinButton(props: { hoverJoin: boolean; toggleHost: () => void }) {
  if (props.hoverJoin) {
    return (
      <Link to="/join">
        <button
          onMouseOver={props.toggleHost}
          onMouseLeave={props.toggleHost}
          className="mx-auto bg-white text-2xl text-black rounded-2xl p-2 border w-full my-5"
        >
          Join a Music Session?
        </button>
      </Link>
    );
  }
  return (
    <Link to="/join">
      <button
        className="mx-auto bg-white text-2xl text-black rounded-2xl p-2 border w-full my-5"
        style={{ visibility: "hidden" }}
      >
        Join a Music Session?
      </button>
    </Link>
  );
}

export default JoinButton;
