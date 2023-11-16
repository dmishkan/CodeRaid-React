import React, {useEffect, useState} from 'react';
import URL from "./URL";

export default function RoomList({isHighlighted ,rooms, setRooms, handleDelete, handleClick}) {

    const fetchUserData = async () => {

        //Fetch rooms and set them to state variable
        await fetch(`${URL}/api/Rooms`)
          .then(response => response.json())
          .then(jsonData => setRooms(jsonData))
          
      }

    useEffect(() => {

        //Fetch only once after initial render
        fetchUserData();

    }, []);

    //Render room list from rooms state variable, destructuring for needed keys and values
    return (
        <div className='List'>
            <h1>Rooms</h1>
            <ul>
                {rooms.map(({ roomID, name }) => (
                    <li key={roomID}>
                        <div>
                            <button className = "n" onClick={() => handleClick(roomID, name)}>{name}</button>
                            <button className = "x" onClick={() => handleDelete(roomID, name)}>X</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );

}