import React, {useState} from "react";
import { Redirect } from "react-router-dom";

import firebaseConfig from "../service/firebase_config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {

  const [currentUser, setCurrentUser] = useState(null);    
    const auth = getAuth();

  const handleSubmit = (e) => {
    e.preventDefault();    
    const { email, password } = e.target.elements;
    try {

        createUserWithEmailAndPassword(auth, email.value, password.value)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });


      setCurrentUser(true);
    } catch (error) {
      alert(error);
    }
  };
  if (currentUser) {
      return <Redirect to="/home" />;
  }
  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label for="email">Email</label>
        <input type="email" name="email" placeholder="Email" />
        <label for="password">Password</label>
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default SignUp;
