"use client";
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState();

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const url = "http://localhost:5000/check-dependency-health";

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    axios.post(url, file, config).then((response) => {
      console.log(response.data);
    });
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h1>React File Upload</h1>
        <input type="file" onChange={handleChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default App;
