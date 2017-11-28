import React from 'react';
import {Route, Link} from 'react-router-dom'
import Start from '../start';
import Auth from '../auth';
import Notification from '../notification';
import Workplace from '../workplace';
import './styles.css';

const App = () => (
   <div className="components">
      <Notification />
      <Route exact path="/" component={Start}/>
      <Route exact path="/registration" component={Auth}/>
      <Route exact path="/login" component={Auth}/>
      <Route exact path="/workplace" component={Workplace}/>
   </div>
);


export default App
