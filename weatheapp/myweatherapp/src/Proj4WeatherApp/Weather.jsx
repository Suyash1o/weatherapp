import { useState } from "react";
import "./Weather.css";
import { useEffect } from "react";
const App = () => {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const[latitude,setLatitude]=useState("")
  const[longitude,setlongitude]=useState("")

  const api = {
    key: "0bb866802c0dc07b2737ebe202af5891",
    base: "https://api.openweathermap.org/data/2.5/weather",
  };

  function handelSearch() {
    fetch(`${api.base}?q=${search}&lat=${latitude}&lon=${longitude}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((d) => setWeather(d));
  }

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((positon)=>{
      setLatitude(positon.coords.latitude)
      setlongitude(positon.coords.longitude)
    })
  },[latitude,longitude])

  return (
    <div className="outer">
      <div className="inner">
        <center className="data">
          <input
            onChange={(e) => setSearch(e.target.value)}
            className="input"
            type="search"
            placeholder="Enter City"
          ></input>
          <button onClick={handelSearch}>Search</button>
          {typeof weather.main !== "undefined" ? (
            <div>
              <h1>{weather.name} </h1>
              <hr />
              <div className="info">
                <div className="temp">
                  <h2>Temp : {weather.main.temp}°c</h2>
                  <img
                    className="tempimg"
                    src="https://cdn.pixabay.com/photo/2018/01/21/23/31/cute-3097794_1280.jpg"
                    alt=""
                    height={"120px"}
                    width={"130px"}
                  />
                </div>
                <hr className="hr2" />
                <div className="temp2">
                  <div className="cloud">
                    <h3>Cloud : {weather.weather[0].main}</h3>
                  </div>
                  <div className="disc">
                    <h3>Description : {weather.weather[0].description}</h3>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            "Not Found"
          )}
        </center>
      </div>
    </div>
  );
};

export default App;

