import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Join.css';


const Join = () => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')



    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleRoomChange = (e) => {
        setRoom(e.target.value)
    }

    const handleSubmit = e => (!name || !room) ? e.preventDefault() : null

    /* useEffect(() => {
        socket = io(ENDPOINT)
        socket.on('giveRooms', (rooms) => {
            console.log(rooms)
        })
    }, [ENDPOINT]) */



    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer" >
                <div className="heading">
                    <h3 className="m-0">Join</h3>
                </div>

                <div>
                    <input type="text" value={name} className="joinInput" onChange={handleNameChange} placeholder="name" />
                </div>

                <div>
                    <input type="text" value={room} className="joinInput" onChange={handleRoomChange} placeholder="room" />
                </div>
                <Link onClick={handleSubmit} to={`/board?name=${name}&room=${room}`}>
                    <button className="button mt-20" type="submit">sign in</button>
                </Link>
            </div>
        </div>
    );
}

export default Join;