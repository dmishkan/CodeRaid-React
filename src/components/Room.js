import React, {useEffect, useState} from "react";

export default function Room({currentRoom}) {

    const {roomID, name} = currentRoom;
    const [currentCodeData, setCurrentCodeData] = useState('');

    const fetchUserData = async () => {

        const codeData = await fetch(`https://localhost:7075/api/Codes/${roomID}`, {method: 'GET'});
        const codeJson = await codeData.json();
        setCurrentCodeData(codeJson[codeJson.length-1]);

    }

    useEffect(() => {
        console.log(roomID, name);
        if (currentRoom !== '') {
            fetchUserData();
        }
    }, [currentRoom]);


    const handleNextCode = async () => {

        //Get the latest code object
        const code = await fetch(`https://localhost:7075/api/Codes/${roomID}`, {method: 'GET'});
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
        const nextCodeResult = await fetch("https://localhost:7075/api/Codes", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(nextCodeObject)
        });
        
        //Get the result and render it
        const codeResultInJson = await nextCodeResult.json();
        console.log("POSTED", codeResultInJson)

        setCurrentCodeData(codeResultInJson)

    }


    return (
        <div className="Room">
            <h1>{name}</h1>
            <h2>{String(currentCodeData.value).padStart(4, '0')}</h2>
            {/* <button onClick={handlePrevious}>Previous</button> */}
            <button onClick={handleNextCode}>Next</button>
        </div>
    );

}