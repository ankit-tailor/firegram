import { useEffect, useState } from "react";
import {
  projectFirestore,
  projectStorage,
  timestamp,
} from "../firebase/config";

const useStorage = (file, caption) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [url, setUrl] = useState(null);

  useEffect(() => {
    let storageRef = projectStorage.ref(file.name);
    let collectionRef = projectFirestore.collection("image");
    storageRef.put(file).on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        let url = await storageRef.getDownloadURL();
        let createdAt = timestamp();
        setUrl(url);
        collectionRef.add({
          url,
          createdAt,
          caption,
        });
      }
    );
  }, [file, caption]);

  return { progress, url, error };
};

export default useStorage;
