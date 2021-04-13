import React, { useState } from "react";
import ImageGrid from "./comps/ImageGrid";
import Modal from "./comps/Modal";
import Title from "./comps/Title";
import UploadForm from "./comps/UploadForm";
import firebase, { projectAuth } from "./firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import Footer from "./comps/Footer";

function App() {
  const [image, setImage] = useState(null);
  const [user] = useAuthState(projectAuth);

  const signInWithGoogle = () =>
    projectAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  const signOut = () => projectAuth.signOut();

  return (
    <div className="App">
      <Title
        clickHandel={user ? signOut : signInWithGoogle}
        button={user ? "SignOut" : "SignIn"}
        description={
          user
            ? "Enjoy sharing your favourite posts."
            : "Sign In to share your favourite posts."
        }
      />
      {/* {SignIn()} */}
      {user && <UploadForm />}
      <ImageGrid setImage={setImage} />
      {image && <Modal image={image} setImage={setImage} />}
      <Footer />
    </div>
  );
}

export default App;
