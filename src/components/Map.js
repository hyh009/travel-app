import React, { useState } from "react";
import "../styles/style.css";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import { LocationOn } from "@mui/icons-material";
import mapStyles from "./mapStyles";

const Map = ({
  setCoordinates,
  setBounds,
  coordinates,
  places,
  setCurrentChild,
  weatherData,
}) => {
  const createMapOptions = (maps) => {
    return {
      minZoom: 14,
      maxZoom: 20,
      disableDefaultUI: true,
      zoomControl: true,
      styles: mapStyles,
    };
  };
  return (
    <div className="mapContainer">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        center={coordinates}
        defaultZoom={17}
        margin={[50, 50, 50, 50]}
        options={createMapOptions}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setCurrentChild(child)}
      >
        {places?.map(
          (place, index) =>
            place.name && (
              <div
                className="markerContainer"
                lat={Number(place?.latitude)}
                lng={Number(place?.longitude)}
                key={index}
              >
                <LocationOn
                  style={{
                    color: "black",
                    cursor: "pointer",
                  }}
                />
                <Marker place={place} />
              </div>
            )
        )}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
