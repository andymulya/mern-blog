// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCavaclVnkTgGGyyVwLwWIutGumk2ifYaA",
  authDomain: "mern-blog-b9526.firebaseapp.com",
  projectId: "mern-blog-b9526",
  storageBucket: "mern-blog-b9526.appspot.com",
  messagingSenderId: "260948074167",
  appId: "1:260948074167:web:2e982c1e34943aface7732"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const storage = getStorage(app)

export { app, auth, storage }