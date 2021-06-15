import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhdiHdXvsiHTZ2LcNJxELvlPCpULzTY7I",
  authDomain: "codeexp-2021-test.firebaseapp.com",
  projectId: "codeexp-2021-test",
  storageBucket: "codeexp-2021-test.appspot.com",
  messagingSenderId: "568613643738",
  appId: "1:568613643738:web:377de59e68b9fa658f0ce3",
  measurementId: "G-GSZDNEZJ11",
};

firebase.initializeApp(firebaseConfig);
export default firebase;
