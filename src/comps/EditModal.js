import { motion } from "framer-motion";
import React from "react";
import { useState } from "react";
import { projectFirestore } from "../firebase/config";

const EditModal = ({ imageId, setClicked }) => {
  const [editText, setEditText] = useState("");

  const handelEdit = () => {
    projectFirestore.collection("image").doc(imageId).update({
      caption: editText,
    });
  };

  return (
    <motion.div
      className="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="editor"
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
      >
        <input
          type="text"
          placeholder="Enter the caption"
          onChange={(e) => setEditText(e.target.value)}
        />
        <div>
          <button
            onClick={() => {
              handelEdit();
              setClicked(false);
            }}
          >
            Save
          </button>
          <button onClick={() => setClicked(false)}>Cancel</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EditModal;
