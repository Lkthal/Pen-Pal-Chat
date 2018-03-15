import React, { Component } from 'react';


class RoomList extends Component{

    constructor(props){
        super(props);
        this.state = {
            newRoomName: "",
            rooms: []
        };

        this.roomsRef = this.props.firebase.database().ref("rooms");
    }

    componentDidMount(){
        this.roomsRef.on("child_added", snapshot =>{
            const roomID = snapshot.val();
            roomID.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( roomID ) });
        });
    }

    handleChange(e){
        this.setState({ newRoomName: e.target.value })
    }

    createRoom(e){
        e.preventDefault();
        if(!this.state.newRoomName) { return; }
        this.roomsRef.push({ name: this.state.newRoomName });
        this.setState({ newRoomName: "" });
    }

    render() {
        return(
            <section className="sidebar">
                <form onSubmit={(e) => this.createRoom(e)}>
                    <input type="text" placeholder="New Room" value={this.state.newRoomName} onChange={(e) => this.handleChange(e)} />
                    <input type="submit" value="Add" />
                </form>
                <ul>
                   {
                     this.state.rooms.map( (roomID, index) =>
                       <li className="roomName" onClick={() => this.props.changeRoom(roomID.name)} key={index}>
                         {roomID.name}
                       </li>
                     )
                   }
                 </ul>

            </section>
        );
    }
}

export default RoomList;
