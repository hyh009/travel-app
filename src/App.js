import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import List from "./components/List";
import Map from "./components/Map";
import { getPlacesData, getWeatherData } from "./apicall";

function App() {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [currentChild, setCurrentChild] = useState(null);
  const [isloading, setIsloading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      },
      (err) => console.log(err)
    );
  }, []);

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsloading(true);
      // getWeatherData(coordinates.lat, coordinates.lng).then((data) => {
      //   setWeatherData(data);
      //   console.log(data);
      // });

      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        setPlaces(data?.filter((place) => place.name));
        setIsloading(false);
      });
    }
  }, [bounds, type]);

  useEffect(() => {
    if (rating) {
      const ratingfiltered = places.filter(
        (place) => Number(place.rating) > Number(rating)
      );
      setFilteredPlaces(ratingfiltered);
    } else {
      setFilteredPlaces(places);
    }
  }, [rating, places]);

  return (
    <div className="App">
      <Nav setCoordinates={setCoordinates} />
      <div className="container">
        <List
          places={filteredPlaces}
          currentChild={currentChild}
          isloading={isloading}
          type={type}
          setType={setType}
          rating={rating}
          setRating={setRating}
        />
        <Map
          setCoordinates={setCoordinates}
          setBounds={setBounds}
          coordinates={coordinates}
          places={filteredPlaces}
          setCurrentChild={setCurrentChild}
          weatherData={weatherData}
        />
      </div>
    </div>
  );
}

export default App;
