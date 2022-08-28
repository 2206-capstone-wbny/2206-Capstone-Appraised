import React, { useState, Component } from "react";
import { connect } from "react-redux";
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  Marker,
  InfoWindow,
  Polygon,
  DataLayer,
  GoogleMapReact
} from "react-google-maps";
import * as properties from "../data.json";
import { API_KEY } from "../../key";
import SearchBar from "./SearchBar";



// const Map = (props) => {
//   const [zoom1, setZoom] = useState(null);

//   function handleZoomChanged() {
//     console.log(this.getZoom());
//     setZoom(this.getZoom());
//   console.log(this.data.loadGeoJson)
//   }
//   // const [selectedHouse, setSelectedHouse] = useState(null);
//   return (
//     <div>
//       <GoogleMap
//         defaultZoom={10}
//         defaultCenter={{
//           lat: 40.6782,
//           lng: -73.9442,
//         }}
//         onZoomChanged={handleZoomChanged}
//         loadGeoJson={'https://storage.googleapis.com/mapsdevsite/json/google.json"'}
//       >
      
//         {zoom1 > 13
//           ? properties.houseData.map((house) => (
//               <Marker
//                 key={house.zpid}
//                 position={{
//                   lat: house.latLong.latitude,
//                   lng: house.latLong.longitude,
//                 }}
//               />
//             ))
//           : "ekse"}
     
//       </GoogleMap>
//     </div>
//   );
// };

// const MapComponent = withScriptjs(withGoogleMap(Map));
// export function MapViewPage() {
//   return (
//     <div style={{ width: "100%", height: "90vh" }}>
//       <MapComponent
//         googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${API_KEY}`}
//         loadingElement={<div style={{ height: "100%", width: "100%" }} />}
//         containerElement={<div style={{ height: "100%", width: "100%" }} />}
//         mapElement={<div style={{ height: "100%", width: "99%" }} />}
//       />
//     </div>
//   );
// }



class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MarkerZoom: false,
      zoom: 13
    }
    this.mapRef = React.createRef();
    this.handleZoomChanged = this.handleZoomChanged.bind(this)
    this.autoCenterMap = this.autoCenterMap.bind(this)
    this.loadGeoJson = this.loadGeoJson.bind(this)
  }

  handleZoomChanged(event){
    let zoomLevl = this.mapRef.current.getZoom()
    if(zoomLevl > 13 && this.state.MarkerZoom != true)
    this.setState({
      MarkerZoom : true,
      zoom: 14
    })
    else if(zoomLevl < 14 && this.state.MarkerZoom != false)
    {
      this.setState({
      MarkerZoom : false,
      zoom: 13
    })
    }
  }
  
  autoCenterMap = ({ google }, map) => {
    this.loadGeoJson(map);
  }

    loadGeoJson = async (map) => {
    this.mapRef.current.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.data.loadGeoJson("https://storage.googleapis.com/mapsdevsite/json/google.json");
    // this.mapRef.current.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.data.addGeoJson(geojsonRoutes); // # load geojson layer
}

  
  markerPoints(){
    if(this.mapRef.current.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.data.zoom > 13){
      properties.houseData.map((house) => (
              <Marker
                key={house.zpid}
                position={{
                  lat: house.latLong.latitude,
                  lng: house.latLong.longitude,
                }}
              />
            ))
    }
  }
  
  async componentWillMount()
  {
    // await this.mapRef.current.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.data
    await setTimeout(
     () => console.log(this.mapRef.current.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.data),
     50
   );
   await setTimeout(
   (this.mapRef.current.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.data.addGeoJson("https://storage.googleapis.com/mapsdevsite/json/google.json"),
    this.mapRef.current.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.data.setStyle({fillColor: 'green', strokeWeight: 1})), 100)
  }
  render() {
  const MapCoponent = withGoogleMap(props => (
      <GoogleMap
        ref={this.mapRef}
        defaultCenter = { { lat: 40.756795, lng: -73.954298 } }
        defaultZoom = {this.state.zoom}
        onZoomChanged={this.handleZoomChanged}
        onReady={this.auto}
      >
      {this.state.MarkerZoom == true 
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
  ));
  return(
      <div>
        <MapCoponent
          containerElement={ <div style={{ height: "90vh", width: '100%' }} /> }
          mapElement={ <div style={{ height: "100%" }} /> }
        />
      </div>
  );
  }
}

const mapState = (state) => {
  console.log(state)
  return {
   homeCoord: state.home.all
  };
};



export default connect(mapState)(Map);
// <Polygon
//                   paths={ [[[-73.973397, 40.689664], [-73.972376, 40.68731], [-73.957064, 40.688095], [-73.95196, 40.691234], [-73.957064, 40.699082], [-73.975438, 40.702221], [-73.979521, 40.706144], [-73.973397, 40.689664]]]}
//                   options={{
//                     strokeWeight: 1,
//                     fillColor: 'red',
//                     fillOpacity: 1,
//                     strokeColor: 'black',
//                   }}
//                 />


const getIcon = (price) =>{
     if(price > 800000)
     {return redIcon 
     }else if(price >  650000)
     {return orangeIcon
     }else if(price > 500000)
     {return yellowIcon
     }else if(price > 300000)
     {return greenIcon
     }else{
     blueIcon}
    }