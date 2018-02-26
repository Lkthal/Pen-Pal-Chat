import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
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
  constructor(props) {
    super(props);
    this.state = { activeRoom: '' };
    this.activateRoom = this.activateRoom.bind(this);
  }

  activateRoom(room) {
    this.setState({ activeRoom: room });
    console.log(room);
  }

  render() {
    return (
      <div className="App">
            < RoomList firebase={firebase} activeRoom={this.state.activeRoom} activateRoom={this.activateRoom.bind(this)}/>
            < MessageList firebase={firebase} activeRoom={this.state.activeRoom} />

      </div>
    );
  }
}

export default App;
