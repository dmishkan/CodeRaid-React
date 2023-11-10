import React, {useState, useEffect} from "react";

export default function NewRoom({handleSubmit, handleChange, name}) {

    return (
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Create New Room"
            onChange={handleChange}
            value={name}
          />
        {/* <button type="submit">Create Room</button> */}
        </form>
      );
}