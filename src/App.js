import './App.css';
import Room from './components/Room';
import RoomList from './components/RoomList';
import NewRoom from './components/NewRoom';
import React, {useEffect, useState} from 'react';

const App = () => {

  const [rooms, setRooms] = useState([]);
  const [newName, setNewName] = useState('');
  const [currentRoom, setCurrentRoom] = useState('');


  const handleChange = (event) => {
    setNewName(event.target.value);
  }

  const handleSubmit = async (event) => {

    //handle POST for creating code as well
    event.preventDefault();

    const myData = {
      name: newName
    }
    //Room POST
    const result = await fetch("https://localhost:7075/api/Rooms", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(myData)
    })

    setNewName('');

    const resultInJson = await result.json();
    setRooms(prev => [...prev, resultInJson]);

    //code POST, maybe create 10 codes

    console.log(resultInJson.roomID)

    const codeData = {
      roomID: resultInJson.roomID,
      codeID: 1,
      value: '0000',
      isUsed: true
    }

    const codeResult = await fetch("https://localhost:7075/api/Codes", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(codeData)
    });

    const codeResultInJson = await codeResult.json();
    console.log("POSTED", codeResultInJson)

  }

  const handleDelete = async (roomID, name) => {

    await fetch(`https://localhost:7075/api/Rooms/${roomID}`, {method: 'DELETE'});
    setRooms(prev => prev.filter((room) => room.roomID !== roomID));

  }

  const handleClick = (roomID, name) => {
    
    console.log(`${name} has been clicked!`);
    setCurrentRoom({roomID, name});

  }
  
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
