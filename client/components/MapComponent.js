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


const Map = () => {
  const [zoom1, setZoom] = useState(null);

  function handleZoomChanged() {
    console.log(this.getZoom());
    setZoom(this.getZoom());
  }
  // const [selectedHouse, setSelectedHouse] = useState(null);
  return (
    <div>
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{
          lat: 40.6782,
          lng: -73.9442,
        }}
        onZoomChanged={handleZoomChanged}
      >
        {zoom1 > 10
          ? properties.houseData.map((house) => (
              <Marker
                key={house.zpid}
                position={{
                  lat: house.latLong.latitude,
                  lng: house.latLong.longitude,
                }}
              />
            ))
          : "ekse"}
      </GoogleMap>
    </div>
  );
};

const MapComponent = withScriptjs(withGoogleMap(Map));
export function MapViewPage() {
  return (
    <div style={{ width: "100%", height: "90vh" }}>
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