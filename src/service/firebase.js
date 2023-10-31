import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBYXvvI8I9AF1V9Tzf1VdRYlaZ2i6Yak2E",
  authDomain: "fall2023-tourbooking.firebaseapp.com",
  projectId: "fall2023-tourbooking",
  storageBucket: "fall2023-tourbooking.appspot.com",
  messagingSenderId: "841504507974",
  appId: "1:841504507974:web:69014349e262cf15872247"
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const storage = getStorage(app);

export default firebase;
