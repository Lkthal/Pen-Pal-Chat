import React, { Component } from 'react';


class RoomList extends Component {
   constructor(props) {
     super(props);

     this.state = {
     	rooms: []
     };

     this.roomsRef = this.props.firebase.database().ref('rooms');

 	}

 	componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
       const room = snapshot.val();
       room.key = snapshot.key;
       this.setState({ rooms: this.state.rooms.concat( room ) });
     });
    }

    handleChange(event) {
        this.setState({ newRoomName: event.target.value })
      }

    createRoom(event) {
      event.preventDefault();
      if(!this.state.newRoomName) { return; }
      const newRoom = { name: this.state.newRoomName};
      this.roomsRef.push({ newRoom });
      this.setState({ rooms: [...this.state.rooms, newRoom], newRoomName: "" });

    }
 	render() {
 		return(
      <div>
        <form onSubmit={(event) => this.createRoom(event)}>
          <label>
            Room Name:
            <input type="text" value={this.state.newRoom} onChange={(event) => this.handleChange(event)} />
          </label>
          <input type="submit" value="Add Room" />
        </form>
   			<ul>
   			{
   				this.state.rooms.map( (room, index) =>
   					<li className="room" key={index}>
              {room.name}
            </li> )
   			}
   			</ul>
      </div>
      );
 	}
 };
export default RoomList;
