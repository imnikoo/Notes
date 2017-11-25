import React from 'react';
import {Route, Link} from 'react-router-dom'
import Start from '../start';
import Auth from '../auth';
import './styles.css';

const App = () => (
    <div className="components">
        <Route exact path="/" component={Start}/>
        <Route exact path="/registration" component={Auth}/>
        <Route exact path="/login" component={Auth}/>
    </div>
);

export default App
