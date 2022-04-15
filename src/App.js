import "./App.css";
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=878c20b66d9ca5286439af1bea6ec548&cnt=5&units=metric`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  // Object.entries(data).map((x) => console.log(x));

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

      {/* {data.map((x, i=0) => (
        <div>
          <h1>{x.main.temp}</h1>
          <h2>{x.weather[i].main}</h2>
        </div>
         return i + 8
      ))} */}

      <div className="container">
        <div className="top">
          <div className="location">
            {data.city ? <p>{data.city.name}</p> : null}
          </div>
          <div className="temp">
            {data.list ? <h1>{data.list[0].main.temp.toFixed()}°C</h1> : null}
          </div>

          <div className="description">
            {data.list ? <p>{data.list[0].weather[0].main}</p> : null}
          </div>
        </div>

        {data.city !== undefined && (
          <div className="bottom">
            <div className="feels">
              <p>Feels Like : </p>
              {data.list ? (
                <p className="bold">
                  {data.list[0].main.feels_like.toFixed()}°C
                </p>
              ) : null}
            </div>
            <div className="humidity">
              <p>Humidity :</p>
              {data.list ? (
                <p className="bold">{data.list[0].main.humidity}%</p>
              ) : null}
            </div>
            <div className="wind">
              <p>Wind Speed : </p>
              {data.list ? (
                <p className="bold">{data.list[0].wind.speed.toFixed()} MPH</p>
              ) : null}
            </div>
          </div>
        )}
      </div>

      {/* <ul>
        {Object.keys(data).map((datas) => (
          <li key={datas}>{data[datas].name}</li>
        ))}
      </ul> */}
    </div>
  );
}

export default App;
