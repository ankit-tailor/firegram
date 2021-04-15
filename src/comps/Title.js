import React from "react";
import { projectAuth } from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

const Title = ({
  setAuthenticate,
  description,
  setClick,
  click,
  setShowError,
}) => {
  const [user] = useAuthState(projectAuth);

  return (
    <div className="title">
      <div className="header">
        <h1>PhotoGram</h1>
        <div className="header__personal">
          <button
            onClick={() => {
              setClick(!click);
              !user && setShowError(true);
            }}
          >
            {!click ? "Your Posts" : "Public"}
          </button>
          <button
            onClick={() => {
              user ? projectAuth.signOut() : setAuthenticate(true);
            }}
          >
            {user ? "Sign Out" : "Sign In"}
          </button>
        </div>
      </div>
      <hr />
      <h2>{click ? "Your Feed" : "Public Feed"}</h2>
      <p>{description}</p>
    </div>
  );
};

export default Title;
