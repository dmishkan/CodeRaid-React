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


    //TODO: POST HTTP REQUEST HERE
    //CLEAR FORM AFTERWARDS
    //ERROR HANDLING
}
  
  return (
    <>
      <RoomList rooms={rooms} setRooms={setRooms}/>
      <NewRoom handleChange={handleChange} handleSubmit={handleSubmit}/>
    </>
  );
}

export default App;
