import React from 'react';
import {Route, Link} from 'react-router-dom'
import Start from '../start';
import About from '../about'
import './styles.css';

const App = () => (
    <div className="components">
        <Route exact path="/" component={Start}/>
        <Route exact path="/about-us" component={About}/>
    </div>
);

export default App
