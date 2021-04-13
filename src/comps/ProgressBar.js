import { motion } from "framer-motion";
import React from "react";
import { useEffect } from "react";
import useStorage from "../hooks/useStorage";
import "../index.css";

const ProgressBar = ({ file, setFile, caption, setCaption }) => {
  const { url, progress } = useStorage(file, caption);

  useEffect(() => {
    if (url) {
      setFile(null);
      setCaption("");
    }
  }, [url, setFile, setCaption]);

  return (
    <motion.div
      className="progress-bar"
      initial={{ width: 0 }}
      animate={{ width: progress + "%" }}
    ></motion.div>
  );
};

export default ProgressBar;
