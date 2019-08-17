import React from 'react';
import './App.scss';
import { Route, HashRouter as Router } from 'react-router-dom';

import { MainPage } from './views/MainPage';
import { GamePage } from './views/GamePage';
import { HelpPage } from './views/HelpPage';

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