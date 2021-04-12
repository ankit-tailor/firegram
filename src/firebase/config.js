import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyCI5u7iAjR8LQYArpPRd9G6WjyHzux8Jxs",
  authDomain: "firegram-app-14620.firebaseapp.com",
  projectId: "firegram-app-14620",
  storageBucket: "firegram-app-14620.appspot.com",
  messagingSenderId: "793055719930",
  appId: "1:793055719930:web:80bd065ee7da915d8df443",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };
export default firebase;
