import { motion } from "framer-motion";
import React from "react";
import "./Modal.css";

const Modal = ({ image, setImage }) => {
  const handelClick = (e) => {
    if (e.target.classList.contains("backdrop")) setImage(null);
  };

  return (
    <motion.div
      className="backdrop"
      onClick={handelClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.img
        src={image}
        alt="uploaded_image"
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
      />
    </motion.div>
  );
};

export default Modal;
