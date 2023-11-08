import './App.css';
import Room from './components/Room';
import RoomList from './components/RoomList';
import NewRoom from './components/NewRoom';
import React, {useState} from 'react';


const App = () => {

  const [rooms, setRooms] = useState([]);
  const [newName, setNewName] = useState('');

  const handleChange = (event) => {
    setNewName(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const myData = {
      name: newName
    }
    
    fetch("https://localhost:7075/api/Rooms", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(myData)
    }).then(() => {
      console.log(`${newName} added!`);
    });

    setNewName('');
  }

  const handleDelete = (roomID) => {

    fetch(`https://localhost:7075/api/Rooms/${roomID}`, {method: 'DELETE'});

  }
  
  return (
    <>
      <RoomList rooms={rooms} setRooms={setRooms} handleDelete={handleDelete}/>
      <NewRoom handleChange={handleChange} handleSubmit={handleSubmit} name={newName}/>
    </>
  );
}

export default App;
