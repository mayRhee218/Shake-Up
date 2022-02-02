import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBcqEdalcZ-N8aTJbM_bzZ9SAhMg-1IV4Q",
  authDomain: "dance-704a8.firebaseapp.com",
  projectId: "dance-704a8",
  storageBucket: "dance-704a8.appspot.com",
  messagingSenderId: "193531776348",
  appId: "1:193531776348:web:11b73572e0aa0bf7854599"
};

const firebaseApp = initializeApp(firebaseConfig);

export const storage = getStorage(firebaseApp);