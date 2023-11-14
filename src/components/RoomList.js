import React, {useEffect, useState} from 'react';
import URL from "./URL";

export default function RoomList({rooms, setRooms, handleDelete, handleClick}) {


    const fetchUserData = () => {

        fetch(`${URL}/api/Rooms`)
          .then(response => response.json())
          .then(jsonData => setRooms(jsonData))
          
      }

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div className='List'>
            <h1>Rooms</h1>
            <ul>
                {rooms.map(({ roomID, name }) => (
                    <li key={roomID}>
                        <div>
                            <h2 onClick={() => handleClick(roomID, name)}>{name}</h2>
                            <button onClick={() => handleDelete(roomID, name)}>X</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );

}