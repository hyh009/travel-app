import { Autocomplete } from "@react-google-maps/api";
import "../styles/style.css";
import { Search } from "@mui/icons-material";
import React, { useState } from "react";

const Nav = ({ setCoordinates }) => {
  const [autocomplete, setAutocomplete] = useState(null);
  const onLoad = (autoComplete) => setAutocomplete(autoComplete);
  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    setCoordinates({ lat, lng });
  };

  return (
    <div className="navContainer">
      <div className="left">
        <div className="logo">Travel Advisor</div>
      </div>
      <div className="right">
        <label className="searchLabel" htmlFor="search">
          Explore new place
        </label>
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <div className="inputContainer">
            <Search />
            <input
              type="text"
              placeholder="Search..."
              className="search"
              name="search"
            />
          </div>
        </Autocomplete>
      </div>
    </div>
  );
};

export default Nav;
