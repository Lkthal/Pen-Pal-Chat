import React, { Component } from 'react';
import MessageBox from './MessageBox';

class MessageList extends Component {

  constructor(props) {
    super(props);
    this.state = {
          messages: [],
          newContent:" "

    }
     this.messagesRef = this.props.firebase.database().ref("messages");
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) });
    });
  }

    handleMessageChange(e){
      this.setState({ newContent: e.target.value });
      this.setState({ })
    }

    createMessage(e) {
      e.preventDefault();
      const newContent = this.state.newContent;
      const currentRoom = this.props.currentRoom;
      const sentAt = this.props.firebase.database.ServerValue.TIMESTAMP;
      this.messagesRef.push({ username: this.props.user, content: newContent, sentAt: sentAt,roomID: currentRoom });
    }

    render() {
     return (

       <div>
         <h2 onClick={this.filterMessagesByRoom}>Current Room: {this.props.currentRoom}</h2>

         <ul>
           {
             this.state.messages.map( (message, index) =>
               <MessageBox
                 message={message}
                 key={index}
                 currentRoom={this.props.currentRoom}
               />
             )
           }
         </ul>

         <form
           className="add-new-message"
           onSubmit={(e) => this.props.roomAssigned ? this.createMessage(e) : null}>
             <label>
               {this.props.currentUser}:
               <input
                 type="text"
                 value={this.state.newContent}
                 onChange={ (e) => this.handleMessageChange(e) }
               />
             </label>
             <input type="submit" value="Submit" />
         </form>
       </div>
     );
   }
 }


export default MessageList;
