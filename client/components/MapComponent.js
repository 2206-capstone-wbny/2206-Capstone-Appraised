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
import SearchBar from "./SearchBar";

const Map = ({ zoom, onZoomChanged }) => {
  function handleZoomChanged(newZoom) {
    onZoomChanged(this.getZoom());
  }
  // function getMarkers() {
  //   properties.houseData.map((house) => {
  //     let marker = new google.maps.Marker({
  //       position: { lat: house.latLong.latitude, lng: house.latLong.longitude },
  //       map: Map,
  //     });
  //   });
  // }

  // MapComponent.addListener(Map, "zoom_changed", function () {
  //   if (currentZoom > 13) {
  //     getMarkers();
  //   }
  // });
  return (
    <div>
      <SearchBar placeholder="Enter Zip, City, or State" data={properties} />
      <GoogleMap
        defaultZoom={zoom}
        defaultCenter={{
          lat: 40.6958,
          lng: -73.9171,
        }}
        onZoomChanged={handleZoomChanged}
      >
        {/* {properties.houseData.map((house) => {
          return (
            <Marker
              key={house.zpid}
              position={{
                lat: house.latLong.latitude,
                lng: house.latLong.longitude,
              }}
            />
          );
        })} */}
      </GoogleMap>
    </div>
  );
};

const MapComponent = withScriptjs(withGoogleMap(Map));

export const MapViewPage = () => {
  const [currentZoom, setCurrentZoom] = useState(14);

  function handleZoomChanged(newZoom) {
    setCurrentZoom(newZoom);
  }
  console.log("potato", currentZoom);
  // function getMarkers() {
  //   properties.houseData.map((house) => {
  //     let marker = new google.maps.Marker({
  //       position: { lat: house.latLong.latitude, lng: house.latLong.longitude },
  //       map: Map,
  //     });
  //   });
  // }

  // this.addListener("zoom_changed", function () {
  //   if (currentZoom > 13) {
  //     getMarkers();
  //   }
  // });

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MapComponent
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${API_KEY}`}
        loadingElement={<div style={{ height: "100%", width: "100%" }} />}
        containerElement={<div style={{ height: "100%", width: "100%" }} />}
        mapElement={<div style={{ height: "100%", width: "99%" }} />}
        zoom={currentZoom}
        onZoomChanged={handleZoomChanged}
      ></MapComponent>
    </div>
  );
};
