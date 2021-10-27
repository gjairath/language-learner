// App.js

import React, { Component } from "react";

import NavBar from "./components/navbar.js";
import OverviewContainer from "./components/Overview.js"

import uniqid from "uniqid";

const App = (props) => {
    let num_decks = JSON.parse(localStorage.getItem(`totalSets`));    
    let ma = ['Mnemonics', 'Visualize Things!', 'memory.png', '/eams/A']
    
    // dont remove this
    ma.push("");
    for (let i = 1; i < num_decks; i++) {
        var ascii = String.fromCharCode(i + 97).toUpperCase();
        var str = `${ascii}`

        ma.push(str);
    }
 
    console.log(ma);
    return (
        <div className="parent">
            <NavBar />        
            <OverviewContainer basePageItems={[ ['Flash-Cards', 'Review Your Cards!', 'fc.png', '/fsets'], 
                                                ['Learn', 'Learn Your Cards!', '', '/learn/A'],
                                                ma,
                                                ['Quiz', 'Test Your Skills!', 'quiz.png', '/quiz/A'] ]}
                                                isDotted=  {false} 
                                                disabled = {true}/>
        </div>              
    );
}

export default App;
