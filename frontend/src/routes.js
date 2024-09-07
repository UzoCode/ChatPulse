import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat'; // Import Chat component

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/chat" component={Chat} /> {/* Add route for Chat */}
      </Switch>
    </Router>
  );
};

export default Routes;
