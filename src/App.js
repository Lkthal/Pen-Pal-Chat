import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import * as firebase from 'firebase';
import User from './components/User';

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
        currentRoom: '',
        user: "Guest",
        roomAssigned: false
      }
    }

    changeRoom(roomName) {
      this.setState(
        { currentRoom: roomName },
        function () {
          console.log(this.state.currentRoom)
        }
      );
      this.setState({ roomAssigned: true});
    }

    setUser(user) {
      this.setState({ user: user })
    }

    render() {
      return (
        <div className="App">

          <nav>
          </nav>

          <header>
            <h1>Bloc Chat</h1>
          </header>

          <main>
          </main>

          <RoomList
            firebase={firebase}
            changeRoom={this.changeRoom.bind(this)}
          />

          <MessageList
            firebase={firebase}
            currentRoom={this.state.currentRoom}
            user={this.state.user}
            roomAssigned={this.state.roomAssigned}
          />
          <User
            firebase={firebase}
            setUser={(user) => this.setUser(user)} user={this.state.user}
            />
            
        </div>
      );
    }
  }

export default App;
