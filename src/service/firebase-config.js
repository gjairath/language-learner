const config = {
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
  apiKey: "AIzaSyDAImcsR4-ixDMLCFKnANHbbEaawjT-4X0",
  authDomain: "language-learner-us.firebaseapp.com",
  projectId: "language-learner-us",
  storageBucket: "language-learner-us.appspot.com",
  messagingSenderId: "685939013541",
  appId: "1:685939013541:web:722b41c08f8800dfd15a4c",
  measurementId: "G-6RXWD2CTLX"
};

export function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error('No Firebase configuration object provided.' + '\n' +
    'Add your web app\'s configuration object to firebase-config.js');
  } else {
    return config;
  }
}