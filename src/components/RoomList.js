import React, {useState, useEffect} from 'react';

export default function RoomList({rooms, setRooms}) {


    const fetchUserData = () => {

        fetch("https://localhost:7075/api/Rooms")
          .then(response => response.json())
          .then(data => setRooms(data))
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
                    <h2>{name}</h2>
                </li>
            ))}
        </ul>
    </>

    );

}