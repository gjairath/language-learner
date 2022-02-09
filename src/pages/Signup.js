import React, {useState} from "react";
import { Redirect } from "react-router-dom";

import firebaseConfig from "../service/firebase_config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "./styles/signup.css"

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
      <form className="form_sign" onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
        <label for="email">Email Address</label>
        <input type="email" name="email" className="form_sign_label" placeholder="Email" />
        <div className="height"> </div>
        <label for="password">Password</label>
        <input type="password" name="password"className="form_sign_label" placeholder="Password" />
        <div className="height"> </div>
        <button type="submit" className="form_sign_submit">Submit</button>
                <p className="signup_p">
                    Already registered <a href="/login">login?</a>
                </p>
      </form>

    </>
  );
};

export default SignUp;
