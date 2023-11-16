import React from "react";

export default function NewRoom({handleSubmit, handleChange, name}) {

    //Form render
    return (
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Create New Room"
            onChange={handleChange}
            value={name}
          />
        </form>
      );
}