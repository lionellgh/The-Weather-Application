import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });

    console.log("Latitude is:", lat);
    console.log("Longitude is:", long);
  }, [lat, long]);

  async function getWeather() {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
      );
      console.log(resp.data);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="App">
      <input type="text" placeholder="Enter city " />
      <button>Search</button>
    </div>
  );
}

export default App;
