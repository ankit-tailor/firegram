import React from "react";
import "../index.css";
import useFirestore from "../hooks/useFirestore";
import { motion } from "framer-motion";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { ImageSearchTwoTone } from "@material-ui/icons";

const ImageGrid = ({ setImage }) => {
  const { imageData } = useFirestore("image");
  return (
    <div className="img-grid">
      {imageData &&
        imageData.map((image) => (
          <motion.div
            className="post-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              className="img-wrap"
              key={image.id}
              onClick={() => setImage(image.url)}
              whileHover={{ opacity: 1 }}
              layout
            >
              <motion.img
                loading="lazy"
                src={image.url}
                alt="uploaded_image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              />
            </motion.div>
            <p>{image.caption}</p>
            <FavoriteBorderIcon className="favourite-icon" />
          </motion.div>
        ))}
    </div>
  );
};

export default ImageGrid;
