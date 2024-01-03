import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyC7NJeTolp0DigGcy7Dk7Bo6WYJ2MkkWdw",
  authDomain: "shoe-594a2.firebaseapp.com",
  projectId: "shoe-594a2",
  storageBucket: "shoe-594a2.appspot.com",
  messagingSenderId: "146914386101",
  appId: "1:146914386101:web:33e8402a14e71be9135efc"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);