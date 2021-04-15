import React from "react";
import "../index.css";
import useFirestore from "../hooks/useFirestore";
import { motion } from "framer-motion";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import {
  projectAuth,
  projectFirestore,
  projectStorage,
} from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import EditModal from "./EditModal";
import { useState } from "react";
import ErrorModal from "./ErrorModal";

const ImageGrid = ({ setImage, click, showError, setShowError, setClick }) => {
  const { imageData } = useFirestore("image");
  const [user] = useAuthState(projectAuth);
  const [clicked, setClicked] = useState(false);
  const [imageId, setImageId] = useState("");

  // console.log(user && projectAuth.currentUser.uid);

  const handelDelete = (id, fileName) => {
    const fileRef = projectStorage.ref(fileName);
    fileRef
      .delete()
      .then(() => {
        projectFirestore.collection("image").doc(id).delete();
      })
      .catch((err) => console.log(err));
  };

  const handelLike = (id, likeCount) => {
    if (!user) {
      alert("signIn or signUp to like the post.");
    } else {
      let newLikes = likeCount;
      const likeRef = projectFirestore
        .collection("image")
        .doc(id)
        .collection("like")
        .doc(projectAuth.currentUser.uid);

      likeRef.get().then((doc) => {
        if (doc.data()) {
          newLikes--;
          likeRef.delete();
          projectFirestore.collection("image").doc(id).update({
            likeCount: newLikes,
          });
        } else {
          newLikes++;
          likeRef.set({
            isLiked: true,
          });
          projectFirestore.collection("image").doc(id).update({
            likeCount: newLikes,
          });
        }
      });
    }
  };

  const handelEdit = (id) => {
    setClicked(!clicked);
    setImageId(id);
  };

  return (
    <div className={click ? "img-grid" : "img-grid"}>
      {imageData && !click
        ? imageData.map((image) => (
            <motion.div
              key={image.id}
              className="post-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.div
                className="img-wrap"
                onClick={() => {
                  setImage(image.url);
                }}
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
              <p>{image.likeCount} likes</p>
              <div className="update-section">
                <FavoriteBorderIcon
                  className="favourite-icon"
                  onClick={() => handelLike(image.id, image.likeCount)}
                />
                {user && projectAuth.currentUser.uid === image.userId && (
                  <div>
                    <EditIcon
                      className="edit-icon"
                      onClick={() => handelEdit(image.id)}
                    />
                    <DeleteIcon
                      className="delete-icon"
                      onClick={() => handelDelete(image.id, image.fileName)}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))
        : !user
        ? showError && (
            <ErrorModal
              title={"please signin or signup to see personal feed."}
              setShowError={setShowError}
              setClick={setClick}
            />
          )
        : imageData.map(
            (image) =>
              user &&
              image.userId === projectAuth.currentUser.uid && (
                <motion.div
                  key={image.id}
                  className="post-section"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <motion.div
                    className="img-wrap"
                    onClick={() => {
                      setImage(image.url);
                    }}
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
                  <p>{image.likeCount} likes</p>
                  <div className="update-section">
                    <FavoriteBorderIcon className="favourite-icon" />
                    {user && projectAuth.currentUser.uid === image.userId && (
                      <div>
                        <EditIcon
                          className="edit-icon"
                          onClick={() => handelEdit(image.id)}
                        />
                        <DeleteIcon
                          className="delete-icon"
                          onClick={() => handelDelete(image.id, image.fileName)}
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              )
          )}
      {clicked && <EditModal imageId={imageId} setClicked={setClicked} />}
    </div>
  );
};

export default ImageGrid;
