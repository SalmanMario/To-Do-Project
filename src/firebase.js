// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA6EPCRQcUi7Or76eDIQtZLXwuD8HRxJsc",
    authDomain: "to-do-project-cf896.firebaseapp.com",
    projectId: "to-do-project-cf896",
    storageBucket: "to-do-project-cf896.appspot.com",
    messagingSenderId: "283001363336",
    appId: "1:283001363336:web:a7f55b7a116440aec1f83d",
    measurementId: "G-9G2M1SDC1E",
    databaseURL: "https://to-do-project-cf896-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);
export const auth = getAuth();