import React from "react";
import { useState } from "react";
import ProgressBar from "./ProgressBar";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [caption, setCaption] = useState("");

  const fileTypes = ["image/png", "image/jpeg"];

  //   console.log(file, error);

  const changeHandler = (event) => {
    let selectedFile = event.target.files[0];
    // console.log(selectedFile.type);
    if (selectedFile && fileTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError("");
    } else {
      setFile(null);
      setError("Please select an image (png or jpg)");
    }
  };

  return (
    <form>
      <div className="input-section">
        <input
          type="text"
          placeholder="What's on your mind?"
          onChange={(e) => setCaption(e.target.value)}
          value={caption}
        />
        <label>
          <input type="file" onChange={changeHandler} />
          <span>+</span>
        </label>
      </div>
      <div className="output">
        {error && <div className="error">{error}</div>}
        {file && <div className="file">{file.name}</div>}
        {file && (
          <ProgressBar
            file={file}
            setFile={setFile}
            caption={caption}
            setCaption={setCaption}
          />
        )}
      </div>
    </form>
  );
};

export default UploadForm;
