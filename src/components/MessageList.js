import React, { Component } from 'react';

class MessageList extends Component {

  constructor(props) {
    super(props);
    this.state = {
          messages: [],
          currentRoomMessages: [],
          newMessageContent: ""
    };
    this.messagesRef = this.props.firebase.database().ref('messages');
    this.createMessage = this.createMessage.bind(this);
    this.filterAndDisplayMessages = this.filterAndDisplayMessages.bind(this);
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeRoom !== this.props.activeRoom) {
      this.filterAndDisplayMessages( nextProps.activeRoom );
    }
  }

  handleChange(e) {
      this.setState({ newMessageContent: e.target.value });
    }

  createMessage(newMessageContent) {
   if (!this.props.activeRoom || !this.props.user) {return};
   this.messagesRef.push({
     content: this.state.newMessageContent,
     roomId: this.props.activeRoom.key,
     sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
     username: this.props.user.displayName
   });
   this.setState({ newMessageContent: '' });
 }


  filterAndDisplayMessages(activeRoom) {
    this.setState({ currentRoomMessages: this.state.messages.filter(message => message.roomId === activeRoom.key) })
  }

  render(){
        return(
            <section className="message-list">
                <ul className="messages" >
                    {
                        this.state.currentRoomMessages.map( (message, index) => {
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
                <input type="text" value={this.state.newMessageContent} onChange={(e) => this.handleChange(e)} className="message-input"  />

            </section>
        );
    }
}

export default MessageList;
