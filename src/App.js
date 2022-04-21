import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

function App() {

    const [weather, setWeather] = useState({});

    const [ locations, setLocations] = useState("london");
    
    const [photos, setPhotos] = useState([]);
    const API_KEY = "6b3a8fff86086a87f11c0397aca11ea4";
    const API_KEYUNSPLASH = "sDlaR75srgLhSg5nCV5XkakktzF9-7cN_2E3jFgTfjA";
    
    useEffect(() => {
      submit();
    }, []);

    function submit(){
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${locations}&appid=${API_KEY}&units=metric`)
      .then((res) => {
        if (res.ok){
          console.log(res.status);
          return res.json();
        } else {
          if (res.status === 404)
          {
            return alert("Oops there is an error! (wrong location)");
          }
          alert("Oops there seems to be an error!");
          throw new Error("You have an error");
        }
      })
      .then((object) => {
          setWeather(object);
          console.log(weather);
      })
      .catch((error) => console.log(error));

      fetch(`https://api.unsplash.com/search/photos?query=${locations}&client_id=${API_KEYUNSPLASH}`)
      .then((res) => {
        if (res.ok) {
          return res.json();  
        } else {
          throw new Error("You made a mistake");
        }
      })
      .then((data) => {
        console.log(data);
        setPhotos(data?.results[0]?.urls?.raw)
      })
      .catch((error) => console.log(error));
    

    /////////////////////

  ///////////////////////

    }

    return (
      <div className="App">
      
        <div className="wrapper">
          <div className="Search">
            <input type="text" value={locations} onChange={(e) => setLocations(e.target.value)} placeholder="Enter Location" className="location_input"/>
            <Button onClick={submit}>Search</Button>
          </div>

          <div className="app_data">
            <p className="temp">Current Temp: {weather?.main?.temp}</p>
          </div>
          <img className="app_image" src={photos} alt=""/>
        </div>
      </div>
    );
  }

export default App;
