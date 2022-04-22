import './App.css';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

function App() {

    const [locations, setLocations] = useState("apple");
    
    const [photos, setPhotos] = useState([]);

    const [dictionary, setDictionary] = useState([{
      shortdef:""
    }]);

    const API_KEYUNSPLASH = "sDlaR75srgLhSg5nCV5XkakktzF9-7cN_2E3jFgTfjA";
    const API_KEYDICTIONARY = "66b4f1dd-f951-4b72-a5b7-8824a9fd1e54";
    
    useEffect(() => {
      submit();
    }, []);

    function submit(){

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

    fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${locations}?key=${API_KEYDICTIONARY}`)
    .then((res) => {
      if (res.ok) {
        return res.json();  
      } else {
        throw new Error("You made a mistake");
      }
    })
    .then((object) => {
      setDictionary(object);
      console.log(dictionary);
    })
    .catch((error) => console.log(error));

    ///////////////////////

    }


    
    return (
      
      <div className="App">
      
        <div className="wrapper">
        <h1>Lil' Dictionary</h1>
          <div className="Search">
            <input type="text" value={locations} onChange={(e) => setLocations(e.target.value)} placeholder="Enter Word" className="location_input"/>
            <br></br>
            <Button variant="contained" onClick={submit}>Search</Button>
          </div>
          
          <div className="app_data">

            <p className="temp"><b>Definition:</b> {dictionary[0].shortdef}</p>
          </div>
          <img className="app_image" src={photos} alt=""/>
        </div>
      </div>
    );
  } 

export default App;

