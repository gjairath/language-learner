import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from 'react'
import App from "./App";
import FlashCard from "./pages/Flashcard.js"
import Message from "./pages/Message.js"
import Quiz from "./pages/Quiz.js"
import EAM from "./pages/Eam.js"
import About from "./pages/about.js"
import Faq from "./pages/Faq.js"
import Learn from "./pages/Learn.js"
import Login from "./pages/Login.js"

import FlashcardSet from "./pages/flashcardSets.js"
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
         <Route path="/sex" component={Login}/>
        <Route path="/quiz/:setID" component={Quiz} />
        <Route path="/learn/:setID" component={Learn} />
        <Route path="/eams/:setID" component={EAM} />
        <Route path="/fsets" component={FlashcardSet} />
        <Route path="/about" component={About} />
        <Route path="/faq" component={Faq} />
    </Switch>
    </Router>
  );
};

export default Routes;
