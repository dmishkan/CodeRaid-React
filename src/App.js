//Daniel Mishkanian

import './App.css';
import Room from './components/Room';
import RoomList from './components/RoomList';
import NewRoom from './components/NewRoom';
import React, {useState} from 'react';
import URL from './components/URL';

const App = () => {

  const [rooms, setRooms] = useState([]);
  const [newName, setNewName] = useState('');
  const [currentRoom, setCurrentRoom] = useState('');

  const handleChange = (event) => {

    //Update name on change
    setNewName(event.target.value);

  }

  const handleSubmit = async (event) => {

    //handle POST for creating code as well
    event.preventDefault();

    //Check for duplicate names
    for (let i=0; i < rooms.length; i++) {
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
      headers: {'Content-Type': 'application/json'},
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
      value: '0000',
      isUsed: true
    }

    //Fetch data, POST, and insert object
    const codeResult = await fetch(`${URL}/api/Codes`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(codeData)
    });

    //Debug data
    const codeResultInJson = await codeResult.json();
    console.log("POSTED", codeResultInJson)

  }

  const handleDelete = async (roomID, name) => {

    //Get all codes of room
    const codesToDelete = await fetch(`${URL}/api/Codes/${roomID}`, {method: 'GET'}).then(response => response.json());

    //Go through each and delete one by one
    for (let i=0; i < codesToDelete.length; i++) {
      await fetch(`${URL}/api/Codes/${roomID}/${i+1}`, {method: 'DELETE'});
      console.log('Code Deleted: ', roomID, i+1);
    }

    //Delete room from API and state variables
    await fetch(`${URL}/api/Rooms/${roomID}`, {method: 'DELETE'});
    setRooms(prev => prev.filter((room) => room.roomID !== roomID));
    setCurrentRoom('');
    console.log('Room Deleted: ', roomID);

  }

  const handleClick = (roomID, name) => {
    
    //Update state variable for RoomList and Room modules
    setCurrentRoom({roomID, name});
    console.log(`${name} has been clicked!`);

  }

  //Main page render - Header, Input Form, Room List, Code Container
  return (
    <>
      <h1>Code<span className="highlight">Raid</span></h1>
      <NewRoom handleChange={handleChange} handleSubmit={handleSubmit} name={newName}/>
      <div className="containers">
        <RoomList rooms={rooms} setRooms={setRooms} handleDelete={handleDelete} handleClick={handleClick}/>
        <Room currentRoom={currentRoom}/>
      </div>

    </>
  );
}

export default App;
