import React, { Component } from 'react';

class MessageBox extends Component{
  constructor(props){
    super(props);

    this.state= {

    }
  }

  checkRoom(roomID) {
    if( roomID === this.props.currentRoom ){
      return true;
    } else {
      return false;
    }
  }

  render(){
    const { index, message} = this.props;

    return (
      <li className="messages-name" key={index}>{this.checkRoom(message.roomID) ? message.content : null }</li>

    );
  }
}

export default MessageBox;
