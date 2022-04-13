import "./App.css";
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  // const [photo, setPhoto] = useState({});

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=878c20b66d9ca5286439af1bea6ec548&units=metric`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>

      <div className="container">
        <div className="top">
          <div className="location">
            {data.city ? <p>{data.city.name}</p> : null}
          </div>
          <div className="temp">
            {data.list ? <h1>{data.list[3].main.temp.toFixed()}°C</h1> : null}
          </div>

          <div className="description">
            {data.list ? <p>{data.list[3].weather[0].main}</p> : null}
          </div>
        </div>

        {data.city !== undefined && (
          <div className="bottom">
            <div className="feels">
              <p>Feels Like : </p>
              {data.list ? (
                <p className="bold">
                  {data.list[3].main.feels_like.toFixed()}°C
                </p>
              ) : null}
            </div>
            <div className="humidity">
              <p>Humidity :</p>
              {data.list ? (
                <p className="bold">{data.list[3].main.humidity}%</p>
              ) : null}
            </div>
            <div className="wind">
              <p>Wind Speed : </p>
              {data.list ? (
                <p className="bold">{data.list[3].wind.speed.toFixed()} MPH</p>
              ) : null}
            </div>
          </div>
        )}
      </div>
      {/* 
      <ul>
        {data.map((datas) => (
          <li>{datas.list[3].wind.speed}</li>
        ))}
      </ul> */}
    </div>
  );
}

export default App;
