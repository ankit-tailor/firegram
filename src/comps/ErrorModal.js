import React from "react";

const ErrorModal = ({ title, setShowError, setClick }) => {
  return (
    <div className="backdrop">
      <div className="error-message">
        <h2>{title}</h2>
        <button
          onClick={() => {
            setShowError(false);
            setClick(false);
          }}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
