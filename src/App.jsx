import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import HomePage from './Pages/HomePage';
import TopicPage from './Pages/TopicPage';
import './App.css';

const App = () => (
  <BrowserRouter>
  <Switch>
    <Route path="/" component={HomePage} exact />
    <Route path="/:id" component={TopicPage} exact />
  </Switch>
  </BrowserRouter>
);

export default App;
