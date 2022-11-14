import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4k7aATGdqBuquTYrR8Tg3EHu5mKGt004",
  authDomain: "thsem-ac399.firebaseapp.com",
  projectId: "thsem-ac399",
  storageBucket: "thsem-ac399.appspot.com",
  messagingSenderId: "629938684699",
  appId: "1:629938684699:web:ce7ba493e5ca3d5332c9be"
};

// Initialize Firebase
export const fire = initializeApp(firebaseConfig);