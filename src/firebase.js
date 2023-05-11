// Import the Firebase SDK
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCPteMbdJkNaAEod8Y6WsXZKbyNFt-Nz9g",
  authDomain: "portfolio-75703.firebaseapp.com",
  projectId: "portfolio-75703",
  storageBucket: "portfolio-75703.appspot.com",
  messagingSenderId: "794760084006",
  appId: "1:794760084006:web:5ef48f1bd3d2d6cb9304e7",
  measurementId: "G-CVCWCN0GSE",
};

initializeApp(firebaseConfig);

const firebaseStorage = getStorage();

export default firebaseStorage;
