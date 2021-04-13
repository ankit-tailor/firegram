import React from "react";

const Title = ({ clickHandel, button, description }) => {
  return (
    <div className="title">
      <div className="header">
        <h1>FireGram</h1>
        <button onClick={clickHandel}>{button}</button>
      </div>
      <hr />
      <h2>Your Pictures</h2>
      <p>{description}</p>
    </div>
  );
};

export default Title;
