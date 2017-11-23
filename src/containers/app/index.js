import React from 'react';
import {Route, Link} from 'react-router-dom'
import Home from '../home'
import About from '../about'
import './app.css';

const App = () => (
    <div>
        <header>
            <Link to="/">Home</Link>
            <Link to="/about-us">About</Link>
        </header>
        ХУЇ
        <div className="components">
            <Route exact path="/" component={Home}/>
            <Route exact path="/about-us" component={About}/>
        </div>
    </div>
)

export default App
