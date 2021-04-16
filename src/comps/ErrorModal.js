import { motion } from "framer-motion";
import React from "react";
import "./ErrorModal.css";

const ErrorModal = ({ title, setShowError, setClick }) => {
  return (
    <motion.div
      className="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div
        className="error-message"
        inital={{ y: "-100vh" }}
        animate={{ y: 0 }}
      >
        <motion.h2 inital={{ y: "-100vh" }} animate={{ y: 0 }}>
          {title}
        </motion.h2>
        <motion.button
          inital={{ y: "-100vh" }}
          animate={{ y: 0 }}
          onClick={() => {
            setShowError(false);
            setClick(false);
          }}
        >
          Dismiss
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ErrorModal;
