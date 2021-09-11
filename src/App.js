// App.js

import React, { Component } from "react";

import NavBar from "./components/navbar.js";
import ContentContainer from "./components/Overview.js"

import uniqid from "uniqid";

class App extends Component {
  constructor() {
    super();
  }

  render() {

    return (
        <div className="parent">
            <NavBar />        
            <ContentContainer basePageItems={[ ['Flash-Cards', 'Review Your Cards!', 'fc.png'], ['Quiz', 'Test Your Skills!', 'quiz.png'] ]}/>
        </div>              
    );
  }
}

export default App;
