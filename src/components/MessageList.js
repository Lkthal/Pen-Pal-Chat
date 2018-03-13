import React, { Component } from 'react';

class MessageList extends Component {

  constructor(props) {
    super(props);
    this.state = {
          messages: [],

    };
     this.messagesRef = this.props.firebase.database().ref("messages");
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) })
    });
  }

  render(){
       return(
           <section className="message-list">
               <ul className="messages" >
                   {
                       this.state.messages.map( (message, index) => {
                       if(message.roomId === this.props.activeRoomId){
                           return(
                               <li className="message" key={index}>
                                   <div className="message-info">
                                       <div className="username">{message.userName}</div>
                                       <div>
                                       <span className="message-content">{message.content}</span>
                                       <span className="time-sent">{message.sentAt}</span>
                                       </div>
                                   </div>

                               </li>
                               )
                           }
                       })
                   }
               </ul>
           </section>
       );
   }
}

export default MessageList;
