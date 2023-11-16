import React, {useEffect, useState} from "react";
import URL from "./URL";

export default function Room({currentRoom}) {

    const {roomID, name} = currentRoom;
    const [currentCodeData, setCurrentCodeData] = useState('');

    const fetchUserData = async () => {

        //Fetch json array and set state variable to the latest code object
        const codeData = await fetch(`${URL}/api/Codes/${roomID}`, {method: 'GET'});
        const codeJson = await codeData.json();
        setCurrentCodeData(codeJson[codeJson.length-1]);
        document.getElementById('code').style.color = "white";

    }

    useEffect(() => {

        //Fetch data on room selection
        console.log(roomID, name);
        if (currentRoom !== '') {
            fetchUserData();
        }

    }, [currentRoom]);


    const handleNextCode = async () => {

        //Don't run if value is 9999 or above
        if (currentCodeData.value >= 9999) { return; }

        //Get the latest code object
        const code = await fetch(`${URL}/api/Codes/${roomID}`, {method: 'GET'});
        const codeResult = await code.json();
        const latestCodeObject = codeResult[codeResult.length-1];

        //get the two variables we need (codeID and value)
        const latestCodeId = latestCodeObject.codeID;
        const latestCodeValue = latestCodeObject.value;

        //put it into new object to be POSTed 
        const nextCodeObject = {
            roomID: roomID,
            codeID: latestCodeId+1,
            value: latestCodeValue+1,
            isUsed: true
        }

        //POST it
        const nextCodeResult = await fetch(`${URL}/api/Codes`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(nextCodeObject)
        });
        
        //Get the result and render it
        const codeResultInJson = await nextCodeResult.json();
        console.log("POSTED", codeResultInJson);

        //Set state variable and change color
        setCurrentCodeData(codeResultInJson);
        document.getElementById('code').style.color = "#5CEA0A";


    }

    const handlePreviousCode = async () => {

        //Don't run if value is 0 or below
        if (currentCodeData.value <= 0) { return; }

        //Otherwise, get the current code object and index - 1 to get the previous code object
        const code = await fetch(`${URL}/api/Codes/${roomID}`, {method: 'GET'});
        const codeResult = await code.json();
        const previousCodeData = codeResult[currentCodeData.value-1];

        //Set state variable and change color
        setCurrentCodeData(previousCodeData);
        document.getElementById('code').style.color = "red";
        console.log('Went back one to', previousCodeData);

    }

    //Only render room if a room is selected
    return (
        <>
            {currentRoom ? 
                <div className="Room">
                    <h1>{name}</h1>
                    <h2 id="code">{String(currentCodeData.value).padStart(4, '0')}</h2>
                    <button onClick={handlePreviousCode}>Back</button>
                    <button onClick={handleNextCode}>Next</button>
                </div> : ''}
        </>
  
    );

}