import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" pages={Home} />
        <Route path="/about" pages={About} />
        <Route path="/contact" pages={Contact} />
        <Route path="/dashboard" pages={Dashboard} />
      </Switch>
    </Router>
  );
};

export default Routes;