import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from 'react'
import App from "./App";
import FlashCard from "./components/flashCard.js"
import Quiz from "./components/Quiz.js"
import {Flasher} from "react-universal-flash";

const Routes = () => {
  return (
  <Router>
           <Flasher position="bottom_center"/>
    <Switch>
        <Route exact path={["/", "/home"]} component={App} />
         <Route path="/flashcards" component={FlashCard}/>
        <Route path="/quiz" component={Quiz} />
    </Switch>
    </Router>
  );
};

export default Routes;
