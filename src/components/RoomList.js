import React, { Component } from 'react';


class RoomList extends Component{

    constructor(props){
        super(props);
        this.state = {
            newRoomName: "",
            rooms: [],
        };

        this.roomsRef = this.props.firebase.database().ref("rooms");
    }

    componentDidMount(){
        this.roomsRef.on("child_added", snapshot =>{
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) });
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
                <h1>Bloc Chat</h1>
                <form onSubmit={(e) => this.createRoom(e)}>
                    <input type="text" placeholder="New Room" value={this.state.newRoomName} onChange={(e) => this.handleChange(e)} />
                    <input type="submit" value="Add" />
                </form>
                <ul className="room-list">
                    {
                        this.state.rooms.map( (room, index) =>
                            <li className=
                                {
                                    this.props.activeRoom === room.key
                                    ? "active-room"
                                    : "room"
                                }
                                key={index}
                                id={room.key}
                                onClick={ this.props.setActiveRoom }>
                                {room.name}
                            </li>
                        )
                    }
                </ul>
            </section>
        );
    }
}

export default RoomList;
