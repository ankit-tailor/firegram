import { useEffect, useState } from "react";
import {
  projectAuth,
  projectFirestore,
  projectStorage,
  timestamp,
} from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

const useStorage = (file, caption) => {
  const [user] = useAuthState(projectAuth);
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
          userId: projectAuth.currentUser.uid,
          likeCount: 0,
          fileName: file.name,
        });
      }
    );
  }, [file, caption, user]);

  return { progress, url, error };
};

export default useStorage;
