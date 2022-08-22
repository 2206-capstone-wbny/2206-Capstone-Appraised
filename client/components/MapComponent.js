import React, { useState } from "react";
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  Marker,
  InfoWindow,
} from "react-google-maps";
import * as properties from "../data.json";
import { API_KEY } from "../../key";

const Map = () => {
  const [selectedHouse, setSelectedHouse] = useState(null);
  return (
    <GoogleMap
      defaultZoom={7}
      defaultCenter={{
        lat: 43.0481,
        lng: -76.1474,
      }}
    >
      {properties.houseData.map((house) => (
        <Marker
          key={house.zpid}
          position={{
            lat: house.latLong.latitude,
            lng: house.latLong.longitude,
          }}
        />
      ))}
    </GoogleMap>
  );
};

const MapComponent = withScriptjs(withGoogleMap(Map));

export default function MapViewPage() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MapComponent
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${API_KEY}`}
        loadingElement={<div style={{ height: "100%", width: "100%" }} />}
        containerElement={<div style={{ height: "100%", width: "100%" }} />}
        mapElement={<div style={{ height: "100%", width: "99%" }} />}
      />
    </div>
  );
}
