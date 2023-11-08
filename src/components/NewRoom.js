import React, {useState, useEffect} from "react";

export default function NewRoom({handleSubmit, handleChange}) {


    return (
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Enter new room"
            onChange={handleChange}
          />
        <button type="submit">Create Room</button>
        </form>
      );
}