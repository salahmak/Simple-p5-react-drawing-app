import React, { useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client'
import Canvas from '../Canvas/Canvas.js'


import './Board.css'

const ENDPOINT = process.env.ENDPOINT || 'https://artistic-flaxen-plate.glitch.me/';

let socket;
socket = io(ENDPOINT)


const Board = ({ location }) => {

    useEffect(() => {
        const { name, room } = queryString.parse(location.search)


        socket.emit('join', { name, room }, (err) => {
            if (err) alert(err)
        })
    }, [location.search])


    return (
        <div className="outerContainer">
            <Canvas socket={socket} />
        </div>

    );
}

export default Board;