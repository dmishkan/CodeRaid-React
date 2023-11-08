// import './App.css';
// import React, {useState, useEffect} from 'react';

// const App = () => {
//   const [rooms, setRooms] = useState([])

//   const fetchUserData = () => {
//     fetch("https://localhost:7075/api/Rooms")
//       .then(response => response.json())
//       .then(data => setRooms(data))
//   }

//   useEffect(() => {
//     fetchUserData()
//   }, [])

//   return (
//     <div>
//       {rooms.length > 0 && (
//         <ul>
//           {rooms.map(room => (
//             <li key={room.roomID}>{room.name}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default App;
