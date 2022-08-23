import React, { useState } from "react";
import { connect } from "react-redux";
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  Marker,
  InfoWindow,
} from "react-google-maps";
import * as properties from "../data.json";
import { API_KEY } from "../../key";
import SearchBar from "./SearchBar";



const Map = (props) => {
  // console.log(props)
  const [selectedHouse, setSelectedHouse] = useState(null);
  return (
    <div>
      <SearchBar placeholder="Enter Zip, City, or State" data={properties} />
      <GoogleMap
        defaultZoom={13}
        defaultCenter={{
          lat: 40.6782,
          lng: -73.9442,
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
    </div>
  );
};

const MapComponent = withScriptjs(withGoogleMap(Map));
console.log()
export function MapViewPage() {
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

const mapState = (state) => {
  return {
   homeCoord: state.home.all
  };
};

export default connect(mapState)(Map);