// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOWRP9AEwUm4DkRoJNe88LONOk66mrVF4",
  authDomain: "lofi-421823.firebaseapp.com",
  projectId: "lofi-421823",
  databaseURL: "https://lofi-421823-default-rtdb.firebaseio.com/",
  storageBucket: "lofi-421823.appspot.com",
  messagingSenderId: "417581336460",
  appId: "1:417581336460:web:28a77ce8af95602820f8a9",
  measurementId: "G-40R04D61NH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// Export the necessary Firebase services
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
