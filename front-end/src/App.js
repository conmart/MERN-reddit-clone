import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PostsContainer from './containers/PostsContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h3>Welcome to fake Reddit</h3>
        </header>
        <PostsContainer />
        {this.props.children}
      </div>
    );
  }
}

export default App;
