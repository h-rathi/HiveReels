import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAtpRQ-KDi22-_GlzaDfMTJSvrFSbM0XbI",
  authDomain: "instagram-reels-clone-7be5a.firebaseapp.com",
  projectId: "instagram-reels-clone-7be5a",
  storageBucket: "instagram-reels-clone-7be5a.appspot.com",
  messagingSenderId: "113467971533",
  appId: "1:113467971533:web:2f2b0cbb7fd35e92f9d684"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export default db;
