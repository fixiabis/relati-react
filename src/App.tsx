import React from 'react';
import './App.scss';
import { Route, HashRouter as Router } from 'react-router-dom';

import { MainPage } from './pages/MainPage';
import { GamePage } from './pages/GamePage';
import { HelpPage } from './pages/HelpPage';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/(main|menu|home|)" exact component={MainPage} />
        <Route path="/(game|play)" component={GamePage} />
        <Route path="/help" component={HelpPage} />
      </Router>
    );
  }
}

export default App;