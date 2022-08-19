import React from "react";
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";

const Map = () => {
  return (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{
        lat: 40.7256,
        lng: -73.8625,
      }}
    />
  );
};

const MapComponent = withScriptjs(withGoogleMap(Map));

export default function MapViewPage() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MapComponent
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDAwPAdw6c0-dHAC5NLGP0AL4KVgu848Yw`}
        loadingElement={<div style={{ height: "100%", width: "80%" }} />}
        containerElement={<div style={{ height: "100%", width: "80%" }} />}
        mapElement={<div style={{ height: "100%", width: "80%" }} />}
      />
    </div>
  );
}
