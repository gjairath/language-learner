// App.js

import React, {useContext } from "react";

import NavBar from "./components/Navbar.js";
import OverviewContainer from "./components/Overview.js"

import { AuthContext } from "./components/auth";

const App = (props) => {
    const  currentUser  = useContext(AuthContext);
    console.log(currentUser);
    
    let num_decks = JSON.parse(localStorage.getItem(`totalSets`));
    let n_arr = []
    for (let i = 0; i < num_decks; i ++) {
            var ascii = String.fromCharCode(i + 97).toUpperCase();
            var str = `${ascii}`
        n_arr.push(str);
    }
    let ma = ['Mnemonics', 'Visualize Things!', 'memory.png', '/eams', '', '', '', n_arr]
    
    
 
    console.log(ma);
    return (
        <div className="parent">
            <NavBar />        
            <OverviewContainer basePageItems={[ ['Flash-Cards', 'Review Your Cards!', 'fc.png', '/fsets'], 
                                                ['Learn', 'Learn Your Cards!', 'learn.png', '/learn', '', '', '', n_arr],
                                                ma,
                                                ['Quiz', 'Test Your Skills!', 'quiz.png', '/quiz', '', '', '', n_arr] ]}
                                                isDotted=  {false} 
                                                disabled = {true}/>
        </div>              
    );
}

export default App;
