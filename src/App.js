import React, { useState } from "react";
import ImageGrid from "./comps/ImageGrid";
import Modal from "./comps/Modal";
import Title from "./comps/Title";
import UploadForm from "./comps/UploadForm";
import { projectAuth } from "./firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import Footer from "./comps/Footer";
import Authentication from "./comps/Authentication";

function App() {
  const [image, setImage] = useState(null);
  const [authenticate, setAuthenticate] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user] = useAuthState(projectAuth);
  const [click, setClick] = useState(false);
  const [showError, setShowError] = useState(false);

  return (
    <div className="App">
      <Title
        description={
          user
            ? "Enjoy sharing your favourite posts."
            : "Sign In to share your favourite posts."
        }
        email={email}
        password={password}
        setAuthenticate={setAuthenticate}
        setClick={setClick}
        click={click}
        setShowError={setShowError}
      />
      {authenticate && (
        <Authentication
          setAuthenticate={setAuthenticate}
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
        />
      )}
      {user && <UploadForm />}
      <ImageGrid
        setImage={setImage}
        click={click}
        setClick={setClick}
        setShowError={setShowError}
        showError={showError}
      />
      {image && <Modal image={image} setImage={setImage} />}
      <Footer />
    </div>
  );
}

export default App;
