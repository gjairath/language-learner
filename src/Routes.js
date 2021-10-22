import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from 'react'
import App from "./App";
import FlashCard from "./components/flashCard.js"
import Message from "./components/Message.js"
import Quiz from "./components/Quiz.js"
import EAM from "./components/Eam.js"
import About from "./components/about.js"
import Faq from "./components/faq.js"

import FlashcardSet from "./components/flashcardSets.js"
import {Flasher} from "react-universal-flash";


const Routes = () => {
  return (
  <Router>
     <Flasher position="bottom_center">
         <Message/>
     </Flasher>
    <Switch>
        <Route exact path={["/", "/home"]} component={App} />
         <Route path="/flashcards/:setID" component={FlashCard}/>
        <Route path="/quiz/:setID" component={Quiz} />
        <Route path="/eams/:setID" component={EAM} />
        <Route path="/fsets" component={FlashcardSet} />
        <Route path="/about" component={About} />
        <Route path="/faq" component={Faq} />
    </Switch>
    </Router>
  );
};

export default Routes;
