import React, { Component } from 'react';

class RoomList extends Component {
   constructor(props) {
     super(props);

     this.state = {

      message: [],
      username: "",
      content: "",
      sentAt: "",
      roomId: ""

    };
    this.messagesRef = this.props.firebase.database().ref('messages');

  }

  componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
       const room = snapshot.val();
       room.key = snapshot.key;
       this.setState({ rooms: this.state.rooms.concat( room ) });
     });
    }


    render() {
     return()
   }



};

export default MessageList;
