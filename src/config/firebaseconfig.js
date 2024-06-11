import { initializeApp } from "firebase/app";
import {getFirestores} from "firebase/firestores"
 // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8C6QfMSGPP57tXh09wOWz6-vn_dNXr64",
  authDomain: "task-b1878.firebaseapp.com",
  projectId: "task-b1878",
  storageBucket: "task-b1878.appspot.com",
  messagingSenderId: "502602365400",
  appId: "1:502602365400:web:9d5443bc04d358ab811aad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestores(app);