import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import FlashCard from "./components/flashCard.js"

const Routes = () => {
  return (
  <Router>    
    <Switch>
        <Route exact path={["/", "/home"]} component={App} />
        <Route path="/flashcards" component={FlashCard}/>
    </Switch>
    </Router>
  );
};

export default Routes;
