import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from 'react'
import App from "./App";
import FlashCard from "./pages/flashcard.js"
import Message from "./pages/Message.js"
import Quiz from "./pages/Quiz.js"
import EAM from "./pages/Eam.js"
import About from "./pages/about.js"
import Faq from "./pages/faq.js"
import Learn from "./pages/Learn.js"
import Login from "./pages/Login.js"
import SignUp from "./pages/Signup.js"
import ProtectedRoute from "./components/protectedRoute.js"
import notFound from "./components/NotFound.js"
import {AuthProvider} from "./components/auth.js";

import * as ROUTES from "./constants/routes";

import FlashcardSet from "./pages/flashcardSets.js"
import {Flasher} from "react-universal-flash";


const Routes = () => {
  return (
      <AuthProvider>

      <Router>
         <Flasher position="bottom_center">
             <Message/>
         </Flasher>
        <Switch>
             <Route path={ROUTES.LOGIN} component={Login}/>
             <Route path={ROUTES.SIGN_UP} component={SignUp}/>


            <ProtectedRoute exact path={ROUTES.HOME} component={App} />
             <ProtectedRoute path={ROUTES.FLASH_CARD} component={FlashCard} />

            <ProtectedRoute path={ROUTES.QUIZ} component={Quiz} />
            <ProtectedRoute path={ROUTES.LEARN} component={Learn} />
            <ProtectedRoute path={ROUTES.EAMS} component={EAM} />
            <ProtectedRoute path={ROUTES.FSETS} component={FlashcardSet} />
            <ProtectedRoute path={ROUTES.ABOUT} component={About} />
            <ProtectedRoute path={ROUTES.FAQ} component={Faq} />
            
            <Route path={ROUTES.NOT_FOUND} component={notFound} />
        </Switch>
        </Router>
        </AuthProvider>
  );
};

export default Routes;
