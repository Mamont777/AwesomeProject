import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPgoJdt9osuIeffrNPDYVhSl6wkrVCnGA",
  authDomain: "awesome-project-415c5.firebaseapp.com",
  projectId: "awesome-project-415c5",
  storageBucket: "awesome-project-415c5.appspot.com",
  messagingSenderId: "246881401143",
  appId: "1:246881401143:web:9a2ff5ac0a80d6753d42b2",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
