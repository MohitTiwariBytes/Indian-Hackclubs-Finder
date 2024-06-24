import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HomePage.css";
import Input from "../Components/Input";

const HomePage = () => {
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });
  const [locations, setLocations] = useState([]);
  const [sliderValue, setSliderValue] = useState(20); // Default value set to 50

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value); // Update state with the new slider value
  };

  function getCoordinates() {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      location
    )}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const latitude = data[0].lat;
          const longitude = data[0].lon;
          setCoordinates({ latitude, longitude });
        } else {
          alert("No results found");
        }
      })
      .catch((error) => {
        console.error("Error fetching data from Nominatim:", error);
      });
  }

  // Haversine formula to calculate the great-circle distance between two points
  function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dlat = degreesToRadians(lat2 - lat1);
    const dlon = degreesToRadians(lon2 - lon1);
    const a =
      Math.sin(dlat / 2) ** 2 +
      Math.cos(degreesToRadians(lat1)) *
        Math.cos(degreesToRadians(lat2)) *
        Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }

  function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  // Fetch the data from the URL
  const url =
    'https://api2.hackclub.com/v0.1/Operations/Clubs?select={"fields":["Address Country","Name","Latitude","Longitude","Slack Channel ID"]}';

  useEffect(() => {
    async function main(longitudeInput, latitudeInput, maxDistanceInput) {
      try {
        const response = await axios.get(url);
        // Rest of your main function logic...
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    if (coordinates.latitude && coordinates.longitude) {
      main(coordinates.longitude, coordinates.latitude, sliderValue);
    }
  }, [coordinates, sliderValue]);

  async function main(longitudeInput, latitudeInput, maxDistanceInput) {
    try {
      const response = await axios.get(url);
      const obj = response.data;
      let gps = [];
      let names = [];

      // Extract latitude, longitude, and names from the fetched data
      obj.forEach((x) => {
        const latitude = x.fields["Latitude"] ? x.fields["Latitude"][0] : null;
        const longitude = x.fields["Longitude"]
          ? x.fields["Longitude"][0]
          : null;
        const name = x.fields["Name"] || null;
        if (latitude !== null && longitude !== null) {
          gps.push([parseFloat(latitude), parseFloat(longitude)]);
          names.push(name);
        }
      });

      const lat = latitudeInput;
      const long = longitudeInput;
      const maxDistance = maxDistanceInput;

      const user = [lat, long];

      // Calculate distances
      let distList = [];
      names.forEach((name, index) => {
        const coords = gps[index];
        if (coords[0] !== null && coords[1] !== null) {
          const distance = haversine(user[0], user[1], coords[0], coords[1]);
          distList.push({ distance, name, coords });
        }
      });

      // Filter locations within the maximum distance
      const filteredLocations = distList.filter(
        (item) => item.distance <= maxDistance
      );

      // Sort the filtered locations by distance
      filteredLocations.sort((a, b) => a.distance - b.distance);

      // Store all locations in state
      setLocations(filteredLocations);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div className="main-home-page">
      <div className="contribute">
        <h3>
          <a href="https://github.com/MohitTiwariBytes/Indian-Hackclubs-Finder">
            Contribute on Github
          </a>
        </h3>
      </div>
      <div className="top">
        <div className="header">
          <h1 className="title">Indian Hack-Clubs Finder</h1>
        </div>

        <div className="search-bar">
          <Input
            placeholder={"Where are you?"}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            id="location-input"
          />
          <button id="search-btn" className="lg" onClick={getCoordinates}>
            Search
          </button>
        </div>

        <div className="action-btns">
          <div className="slider-main">
            <h3>
              List of available Hack Clubs between the range of {sliderValue}{" "}
              kilometers
            </h3>
            <input
              type="range"
              id="slider"
              min={1}
              max={100}
              value={sliderValue}
              className="slider"
              onChange={handleSliderChange} // Attach the event handler
            />
          </div>
        </div>
      </div>
      <div id="results1">
        {locations.length > 0 && (
          <div id="results">
            {locations.map((location, index) => (
              <div className="results-item" key={index}>
                <h3 className="results-item-title">Location {index + 1}</h3>
                <p className="results-item-info">Name: {location.name}</p>
                <p className="results-item-info">
                  Distance: {location.distance.toFixed(1)} km
                </p>
                <a
                  href={`https://www.google.com/maps?q=${location.coords[0]},${location.coords[1]}`}
                  className="results-item-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Maps Link
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="footer">
        <h1>
          Created with{" "}
          <svg
            height={"16px"}
            aria-hidden="true"
            data-prefix="fas"
            data-icon="code"
            class="svg-inline--fa fa-code fa-w-20 "
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
            color="#2d9ee4"
          >
            <path
              fill="currentColor"
              d="M278.9 511.5l-61-17.7c-6.4-1.8-10-8.5-8.2-14.9L346.2 8.7c1.8-6.4 8.5-10 14.9-8.2l61 17.7c6.4 1.8 10 8.5 8.2 14.9L293.8 503.3c-1.9 6.4-8.5 10.1-14.9 8.2zm-114-112.2l43.5-46.4c4.6-4.9 4.3-12.7-.8-17.2L117 256l90.6-79.7c5.1-4.5 5.5-12.3.8-17.2l-43.5-46.4c-4.5-4.8-12.1-5.1-17-.5L3.8 247.2c-5.1 4.7-5.1 12.8 0 17.5l144.1 135.1c4.9 4.6 12.5 4.4 17-.5zm327.2.6l144.1-135.1c5.1-4.7 5.1-12.8 0-17.5L492.1 112.1c-4.8-4.5-12.4-4.3-17 .5L431.6 159c-4.6 4.9-4.3 12.7.8 17.2L523 256l-90.6 79.7c-5.1 4.5-5.5 12.3-.8 17.2l43.5 46.4c4.5 4.9 12.1 5.1 17 .6z"
            ></path>
          </svg>{" "}
          and{" "}
          <svg
            height={"16px"}
            aria-hidden="true"
            data-prefix="fas"
            data-icon="heart"
            class="svg-inline--fa fa-heart fa-w-16 "
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            color="#e42d42"
          >
            <path
              fill="currentColor"
              d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
            ></path>
          </svg>{" "}
          {""}
          by <a href="https://mohittiwaridev.xyz">Mohit Tiwari</a> and{" "}
          <a href="https://nimit.dino.icu">Nimit Vijayvargee</a>
        </h1>
      </div>
    </div>
  );
};

export default HomePage;
