import React, { Component } from 'react';
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
      this.state = {
        activeRoomId: null,
        user: null
      }
    }

    setActiveRoom(e) {
      const roomId = e.target.id;
      this.setState({ activeRoomId: roomId });
    }

  render() {
    return (
      <div className="App" id="container">
              <RoomList firebase={firebase} activeRoom={this.state.activeRoomId} setActiveRoom={(e) => this.setActiveRoom(e)} />
              <aside id="sidebar">Users</aside>
                <main>
                  <section className="message-list">
                  {
                    this.state.activeRoomId
                    ? <MessageList firebase={firebase} activeRoomId={this.state.activeRoomId} />
                    : <h3>Select a room to start!</h3>
                  }
                    </section>
                    <section id="new-message">New message</section>
                </main>
          </div>
    );
  }
}

export default App;
