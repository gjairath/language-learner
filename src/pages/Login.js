import React, { useContext, useState } from "react";

import "./styles/login.css"
import { Redirect } from "react-router-dom";

import firebaseConfig from "../service/firebase_config.js";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


const Login = () => {

    const auth = getAuth();
  const [currentUser, setCurrentUser] = useState(null);    

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
        signInWithEmailAndPassword(auth, email.value, password.value)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
          setCurrentUser(true);

          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("HEY MOM");
          });
      } catch (error) {
      alert(error);
    }
  };
  
    if (currentUser) {
      return <Redirect to="/" />;
  }

    return (
    <>

      <div className="login_container">
            <img
              className="img_container"
              src="/images/cute_cat.jpg"
              alt="Meow"
            />

          <div className="info_wrapper">
        <div className="login_wrapper">
            <h2 className="sign_header">
                Sign in to your account
            </h2>
            <p className="sign_footer">
              Or{' '}
              <a href="#" className="a_link">
                Enter as a Guest
              </a>
            </p>
          </div>
          <form className=".form_container" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="form_wrapper">
              <div>
                <label htmlFor="email-address" className="form_pass">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="form_input"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="form_pass">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="form_input"
                  placeholder="Password"
                />
              </div>
            </div>

                <div className="form_btm">
              <div className="form_btm_wrapper">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="form_item"
                />
                <label htmlFor="remember-me" className="form_label">
                  Remember me
                </label>
              </div>

              <div style={{fontSize: "0.875rem", lineHeight: "1.25rem"}}>
                <a href="#" className="a_link">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="form_submit"
              >
                <span className="fr">

                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}


export default Login;
