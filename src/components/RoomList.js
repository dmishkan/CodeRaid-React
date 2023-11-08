import React, {useState, useEffect} from 'react';

export default function RoomList({rooms, setRooms, handleDelete}) {


    const fetchUserData = () => {

        fetch("https://localhost:7075/api/Rooms")
          .then(response => response.json())
          .then(jsonData => setRooms(jsonData))
      }

    useEffect(() => {
        fetchUserData()
    }, [rooms]);

    return (
    <>
        <h1>Rooms</h1>
        <ul>
            {rooms.map(({ roomID, name }) => (
                <li key={roomID}>
                    <div>
                        <h2 onClick={() => console.log('Clicked!')}>{name}</h2>
                        <button onClick={() => handleDelete(roomID)}>X</button>
                    </div>
                </li>
            ))}
        </ul>
    </>

    );

}