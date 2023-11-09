import React, {useEffect, useState} from 'react';

export default function RoomList({rooms, setRooms, handleDelete, handleClick}) {

    const [error, setError] = useState(null);

    const fetchUserData = () => {

        //TODO: try callback fcuntion here in setrooms (or not because its jsut meant to display shit)?
        //make this an await function

        fetch("https://localhost:7075/api/Rooms")
          .then(response => {
            
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            return response.json()
          })
          .then(jsonData => {
            console.log("YAHOO", jsonData);
            setRooms(jsonData);
        })
        .catch()
      }

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
    <>
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
    </>

    );

}