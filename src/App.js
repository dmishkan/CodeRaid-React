//Daniel Mishkanian

import './css/custom.min.css';
import Room from './components/Room';
import RoomList from './components/RoomList';
import NewRoom from './components/NewRoom';
import React, { useEffect, useState } from 'react';
import URL from './components/URL';

const App = () => {

  const [rooms, setRooms] = useState([]);
  const [newName, setNewName] = useState('');
  const [currentRoom, setCurrentRoom] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {

    //error handling for api connection

    async function getConnected() {

      try {
        const response = await fetch(`${URL}/api/Rooms`);

        if (!response.ok) { setIsConnected(false) }
        else { setIsConnected(true) }

      } catch (error) {
        console.error('Error connecting to API:', error);
        setIsConnected(false);
      }

    }

    getConnected();

  })

  const handleChange = (event) => {

    //Update name on change
    setNewName(event.target.value);

  }

  const handleSubmit = async (event) => {

    //handle POST for creating code as well
    event.preventDefault();

    //Check for duplicate names
    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i].name === newName) {
        alert("Duplicate room name found. Try again with a different name.");
        return;
      }
    }

    //Otherwise, create data with new name
    const myData = {
      name: newName
    }

    //Room POST
    const result = await fetch(`${URL}/api/Rooms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(myData)
    })

    //Clear name from input area
    setNewName('');

    //Get data from API and append it to state variable
    const resultInJson = await result.json();
    setRooms(prev => [...prev, resultInJson]);
    console.log(resultInJson.roomID)

    //Create object for Code API POST
    const codeData = {
      roomID: resultInJson.roomID,
      codeID: 1,
      value: 1234,
      isUsed: true
    }

    //Fetch data, POST, and insert object
    const codeResult = await fetch(`${URL}/api/Codes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(codeData)
    });

    //Debug data
    const codeResultInJson = await codeResult.json();
    console.log("POSTED", codeResultInJson)

  }

  const handleDelete = async (roomID, name) => {

    const isConfirmed = window.confirm('Are you sure you want to delete this room and all of its associated codes?');

    if (!isConfirmed) { return; }

    //Get all codes of room
    const codesToDelete = await fetch(`${URL}/api/Codes/${roomID}`, { method: 'GET' }).then(response => response.json());

    //Go through each and delete one by one
    for (let i = 0; i < codesToDelete.length; i++) {
      await fetch(`${URL}/api/Codes/${roomID}/${i + 1}`, { method: 'DELETE' });
      console.log('Code Deleted: ', roomID, i + 1);
    }

    //Delete room from API and state variables
    await fetch(`${URL}/api/Rooms/${roomID}`, { method: 'DELETE' });
    setRooms(prev => prev.filter((room) => room.roomID !== roomID));
    setCurrentRoom('');
    console.log('Room Deleted: ', roomID);

  }

  const handleClick = (roomID, name) => {

    //Update state variable for RoomList and Room modules
    setCurrentRoom({ roomID, name });
    console.log(`${name} has been clicked!`);

  }

  //Main page render (Bootstrap)- Header, Input Form, Room List, Code Container
  return (
    <>
      {isConnected ?
        <div>
          <nav class="navbar navbar-expand-sm" id="mainNavbar">
            <div class="container justify-content-center">
              <h1>Code<span className="highlight">Raid</span></h1>
            </div>
          </nav>

          <div class="container text-center"><NewRoom handleChange={handleChange} handleSubmit={handleSubmit} name={newName} /></div>
          
          <div class="container-fluid">
            <div class="row">
              <div class="col">
                <RoomList rooms={rooms} setRooms={setRooms} handleDelete={handleDelete} handleClick={handleClick} isConnected={isConnected} />
              </div>
              <div class="col">
                <Room currentRoom={currentRoom} isConnected={isConnected} />
              </div>
            </div>
          </div>

        </div> : <h1>Could not connect to API</h1>}
    </>
  );
}

export default App;
