import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyC8O9s_aKwzfU8rogFDGLm1hJJVQS6eJUM",
    authDomain: "bloc-chat-room-e9f0a.firebaseapp.com",
    databaseURL: "https://bloc-chat-room-e9f0a.firebaseio.com",
    projectId: "bloc-chat-room-e9f0a",
    storageBucket: "bloc-chat-room-e9f0a.appspot.com",
    messagingSenderId: "761207103800"
  };
  firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
            <RoomList firebase={firebase} />
      </div>
    );
  }
}

export default App;
