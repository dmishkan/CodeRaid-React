import './App.css';
import Room from './components/Room';
import RoomList from './components/RoomList';
import NewRoom from './components/NewRoom';
import React, {useState} from 'react';


const App = () => {

  const [rooms, setRooms] = useState([]);
  const [newName, setNewName] = useState('');
  const [currentRoom, setCurrentRoom] = useState('');

  const handleChange = (event) => {
    setNewName(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const myData = {
      name: newName
    }
    
    const result = await fetch("https://localhost:7075/api/Rooms", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(myData)
    })

    setNewName('');

    const resultInJson = await result.json();
    setRooms(prev => [...prev, resultInJson]);
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
      <RoomList rooms={rooms} setRooms={setRooms} handleDelete={handleDelete} handleClick={handleClick}/>
      <NewRoom handleChange={handleChange} handleSubmit={handleSubmit} name={newName}/>
      {/* <Room currentRoom={currentRoom}/> */}
    </>
  );
}

export default App;
