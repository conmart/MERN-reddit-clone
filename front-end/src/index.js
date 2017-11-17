import React from 'react';
import { render } from "react-dom";
import './index.css';
import App from './App';
import PostContainer from './containers/PostContainer';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// react-router-dom needs to use BroswerRouter
// switch is used with react-router-dom v4
// npm install react-router-dom

render((
  <BrowserRouter>
    <div>
      <Switch>

        <Route exact path="/" component={App} />
        <Route path="/posts/:id" component={PostContainer} />
      </Switch>
    </div>
  </BrowserRouter>

), document.getElementById('root'));
