import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD3TlHQ23r6uo7IAbQSRc0BdPCrvGNsu6A",
    authDomain: "verity-otp.firebaseapp.com",
    projectId: "verity-otp",
    storageBucket: "verity-otp.appspot.com",
    messagingSenderId: "928791542109",
    appId: "1:928791542109:web:1f52f13f74b16c954f10b4",
    measurementId: "G-CCYQ97JGWC"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;