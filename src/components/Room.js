import React, {useEffect, useState} from "react";
import URL from "./URL";
import combinations from "./FourDigits";

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

        //Don't run if we're on the last code
        if (currentCodeData.codeID >= 10000) { return; }

        //Get the latest code object
        const code = await fetch(`${URL}/api/Codes/${roomID}`, {method: 'GET'});
        const codeResult = await code.json();
        const latestCodeObject = codeResult[codeResult.length-1];

        //get latest index
        const latestCodeId = latestCodeObject.codeID;

        //create object with info, use index to get the next four digit combination
        const nextCodeObject = {
            roomID: roomID,
            codeID: latestCodeId+1,
            value: combinations[latestCodeId],
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

        //Don't run if we're on the first code
        if (currentCodeData.codeID <= 1) { return; }

        //Otherwise, get the current code object and index - 1 to get the previous code object
        const code = await fetch(`${URL}/api/Codes/${roomID}`, {method: 'GET'});
        const codeResult = await code.json();

        //Get previous code object by index-2 because codeID was created with index 1 originally
        const previousCodeData = codeResult[currentCodeData.codeID-2];

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