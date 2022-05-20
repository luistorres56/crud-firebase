import firebase from "firebase/app";
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCpcrQXlKpHxkCbWvcJakIqPab3Fpq7gw0",

    authDomain: "crud-48273.firebaseapp.com",

    projectId: "crud-48273",

    storageBucket: "crud-48273.appspot.com",

    messagingSenderId: "161513652833",

    appId: "1:161513652833:web:0def96b2d9120a55d32020"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export{firebase }