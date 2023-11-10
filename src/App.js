import './App.css';
import Room from './components/Room';
import RoomList from './components/RoomList';
import NewRoom from './components/NewRoom';
import React, {useEffect, useState} from 'react';

const App = () => {

  const [rooms, setRooms] = useState([]);
  const [newName, setNewName] = useState('');
  const [currentRoom, setCurrentRoom] = useState('');
  const [error, setError] = useState(null);


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

  useEffect(() => {
    (async () => {

      await fetch("https://localhost:7075/api/Rooms")
      .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok')
          }
      })
      .catch(err => {
          setError(err);
      });
    })();

  }, []);


  if (error) {
      return <div>Error loading rooms: {error.message}</div>;
  }  
  
  return (
    <>
      <h1>Code<span className="highlight">Raid</span></h1>
      <NewRoom handleChange={handleChange} handleSubmit={handleSubmit} name={newName}/>
      <RoomList rooms={rooms} setRooms={setRooms} handleDelete={handleDelete} handleClick={handleClick}/>
      
      {/* <Room currentRoom={currentRoom}/> */}
    </>
  );
}

export default App;
