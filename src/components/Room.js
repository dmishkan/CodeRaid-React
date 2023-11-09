import React, {useEffect} from "react";

export default function Room({currentRoom}) {

    const {roomID, name} = currentRoom;

    const fetchUserData = () => {

        fetch(`https://localhost:7075/api/Codes`, {method: 'GET'})
            .then(response => console.log(response));

    }

    useEffect(() => {
        console.log(roomID, name);
        fetchUserData();
    }, [currentRoom]);


    return (
        <>
            <h1>{name}</h1>
        </>
    );

}