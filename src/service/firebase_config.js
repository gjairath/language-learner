import firebase from 'firebase/compat/app';
import "firebase/auth";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyDAImcsR4-ixDMLCFKnANHbbEaawjT-4X0",
  authDomain: "language-learner-us.firebaseapp.com",
  projectId: "language-learner-us",
  storageBucket: "language-learner-us.appspot.com",
  messagingSenderId: "685939013541",
  appId: "1:685939013541:web:722b41c08f8800dfd15a4c",
  measurementId: "G-6RXWD2CTLX"
});


export default firebaseConfig;
