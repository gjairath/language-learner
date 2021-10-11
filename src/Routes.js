import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from 'react'
import App from "./App";
import FlashCard from "./components/flashCard.js"
import Message from "./components/Message.js"
import Quiz from "./components/Quiz.js"
import EAM from "./components/Eam.js"

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
        <Route path="/quiz" component={Quiz} />
        <Route path="/eams" component={EAM} />
        <Route path="/fsets" component={FlashcardSet} />
    </Switch>
    </Router>
  );
};

export default Routes;
