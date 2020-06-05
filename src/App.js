import React from 'react';

import Board from './components/Board/Board.js';
import Join from './components/Join/Join.js';

import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
    return (
        <Router>
            <Route path="/" exact component={Join} />
            <Route path="/board" component={Board} />
        </Router>
    );
}


export default App;