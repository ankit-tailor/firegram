import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { projectAuth } from "../firebase/config";
import { motion } from "framer-motion";

const Authentication = ({
  setAuthenticate,
  email,
  password,
  setEmail,
  setPassword,
}) => {
  const [loginMessage, setLoginMessage] = useState("");
  const handelSignIn = () => {
    projectAuth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        setLoginMessage("Success");
        setEmail("");
        setPassword("");
        setAuthenticate(false);
      })
      .catch((err) => {
        setLoginMessage(err.message);
      });
  };

  const handelSignUp = () => {
    projectAuth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        setLoginMessage("Success");
        setEmail("");
        setPassword("");
        setAuthenticate(false);
      })
      .catch((err) => {
        setLoginMessage(err.message);
      });
    // setAuthenticate(false);
  };

  return (
    <motion.div
      className="backdropp"
      intial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <motion.div className="authentication">
        <CloseIcon
          className="close-icon"
          onClick={() => setAuthenticate(false)}
          initial={{ y: "-100vh" }}
          animate={{ y: 0 }}
          transition={{ delay: 1 }}
        />
        <motion.h3 intial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Sign In
        </motion.h3>
        <motion.hr />
        <p className="auth-text">{loginMessage}</p>
        <motion.form initial={{ y: "-100vh" }} animate={{ y: 0 }}>
          <motion.input
            type="email"
            placeholder="Email E.g abc@xyz.com"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="on"
          />
          <motion.input
            type="password"
            placeholder="Password E.g 12345"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="on"
          />
        </motion.form>
        <motion.button
          initial={{ y: "-100vh" }}
          animate={{ y: 0 }}
          onClick={handelSignIn}
        >
          Sign In
        </motion.button>
        <motion.button
          initial={{ y: "-100vh" }}
          animate={{ y: 0 }}
          onClick={handelSignUp}
        >
          Sign Up
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Authentication;
