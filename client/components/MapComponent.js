import React, { useState, Component } from "react";
import { connect } from "react-redux";
import { MapContainer, TileLayer, useMap, GeoJSON, Marker, LayerGroup, useMapEvents} from 'react-leaflet'
import * as properties from "../data.json";
import * as bound from './Data/usa.geo.json';
import * as States from './Data/usaState.geo.json';
import * as Counties from './Data/usaCounty.geo.json';
import {setSingle, setHomes} from '../store/home'
import L from 'leaflet';
import { Link } from "react-router-dom";

function Markers(props){
   const [zoomLevel, setZoomLevel] = useState(13); // initial zoom level provided for MapContainer
    
    const mapEvents = useMapEvents({
        zoomend: () => {
            setZoomLevel(mapEvents.getZoom());
        },
    });
    var greenIcon = L.icon({
      iconUrl: '/green.png',
      iconSize: [10,10],
      className : 'leaflet-div-icon'
    })
    var blueIcon = L.icon({
      iconUrl: '/blue.png',
      iconSize: [10,10],
      className : 'leaflet-div-icon'
    })
    var orangeIcon = L.icon({
      iconUrl: '/orange.png',
      iconSize: [10,10],
      className : 'leaflet-div-icon'
    })
    var redIcon = L.icon({
      iconUrl: '/red.png',
      iconSize: [10,10],
      className : 'leaflet-div-icon'
    })
    var yellowIcon = L.icon({
      iconUrl: '/yellow.png',
      iconSize: [10,10],
      className : 'leaflet-div-icon'
    })
    
    const getIcon = (price) =>{
     return price > 800000 ? redIcon :
     price >  650000 ? orangeIcon :
     price > 500000 ? yellowIcon :
     price > 300000 ? greenIcon :
     blueIcon
    }
    
    
    // console.log(zoomLevel, props);
    if(zoomLevel > 14)
    {
      return(
      props.homeCoord.map((house) => (
              <Marker icon={getIcon(house.priceNum)}
                value={house.id}
                key={house.id}
                position={{
                  lat: house.latitude,
                  lng: house.longitude,
                }}
                // style ={{borderStyle: 'solid', borderColor: 'white', borderWidth: '10px'}}
                eventHandlers={{
                  click: async (e) => {
                   e.target._map.setView([house.latitude, house.longitude], 16)
                   await props.fetchSingle(e.target.options.value)
                   props.houseInformation()
                },
              }}
              />)))
    }
    return null
}

function ZipLayer(){
   const [zoomLevel, setZoomLevel] = useState(13); // initial zoom level provided for MapContainer
   const [zipLayerLng, setZipLayerLng] = useState(-50);
    const mapEvents = useMapEvents({
        zoomend: () => {
            setZoomLevel(mapEvents.getZoom());
        },
        moveend: (e) =>{
          let latlng = e.target.getCenter();
          setZipLayerLng(latlng.lng)
        }
    }); 
    
    const styleState = {
      color: 'blue',
      fillColor: 'transparent',
      // fillOpacity: -1,
      weight: .8,
    }
    
    const styleCounty = {
      // color: 'blue',
      fillColor: 'orange',
      // fillOpacity: -1,
      weight: .5,
    }
    
    
    
    const forEachHover = (location, layer)=>{
      // console.log('hi', location)
       layer.on({
                  mouseover: (e) => {
                    // console.log(e)
                  e.target.setStyle({color:'white'})
                },
                mouseout: (e) => {
                  e.target.setStyle(styleState)
                },
                click: (e) =>{
                  e.target._map.fitBounds(e.target.getBounds())
                }
              })
     
    }
    
    
    let zipBound
    zipLayerLng < -100 && zipLayerLng > -170? zipBound = bound.features.filter(zip => zip.properties.zip > 80000 && zip.properties.zip < 100000 || zip.properties.zip > 59000 && zip.properties.zip < 60000) :
          zipLayerLng > -100 && zipLayerLng < -87? zipBound = bound.features.filter(zip => zip.properties.zip > 30000 && zip.properties.zip < 80000 || zip.properties.zip < 59000 && zip.properties.zip > 60000) :
          zipLayerLng > -87 && zipLayerLng < -45? zipBound = bound.features.filter(zip => zip.properties.zip > 0 && zip.properties.zip < 30000) : 'not on map!'
      // console.log(bound.features.filter(zip => zip.properties.zip > 0 && zip.properties.zip < 1000))
        // zipBound = bound.features.filter(zip => zip.properties.zip > 80000 && zip.properties.zip < 100000 || zip.properties.zip > 59000 && zip.properties.zip < 60000)
      // 0 - 30000     30000 - 80000         80000-100000 || 590000-600000
      // console.log(zipLayerLng, zipBound)
      
      
    
    // console.log(zoomLevel);
    if(zoomLevel < 13 && zoomLevel > 6)
    {
      return  <GeoJSON key='County' style={styleCounty} data={zipBound} onEachFeature={forEachHover} />
    // return  <GeoJSON key='County' style={styleCounty} data={Counties.features} onEachFeature={forEachHover} />
    }
    // else if(zoomLevel < 9)
    // {
    //   return(
    //     <div>
    //     <GeoJSON key='County' style={styleCounty} data={Counties.features} />
    //     <GeoJSON style={styleState} key='statesGeo' data={States.features} 
    //     onEachFeature={forEachHover}/>
    //       </div>
    //           )
              
    // }
    return null
}

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
    house: null,
    MarkerZoom : false,
    zoom: 13
    }
    this.mapRef = React.createRef();
    this.houseInformation = this.houseInformation.bind(this)
  }

  houseInformation(){
    this.setState({
      house : true
    })
  }
  
  async componentWillMount()
  {
    await this.props.fetchAll()
  }
  
  render() {
    return (
  <main className={this.state.house == null ? 'leafLetMap' : 'leafLetMapwithInfo'}>
    <MapContainer ref={this.mapRef} center={[40.7,-73.9859]} zoom={this.state.zoom} scrollWheelZoom={true} style={{width: '100%', height: '85vh'}}>
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              <ZipLayer />
              <Markers homeCoord={this.props.homeCoord} fetchSingle={this.props.fetchSingle} houseInformation={this.houseInformation}/>
                </MapContainer>  
                <Link to='/singleHome' className="MoreInformation"><a>More Info</a></Link>
    </main>
    )
}
}

const mapState = (state) => {
  return {
    homeCoord: state.home.all,
    house: state.home.single,
  };
};
const mapDispatch = (dispatch) => ({
  fetchAll: () => dispatch(setHomes()),
  fetchSingle: (id) => dispatch(setSingle(id)),
});










// import * as SingleBed from './Data/MedPrice/1BedMed.json';
// import fs from 'fs'
// import axios from 'axios'

// const addToJson = async(arr) => {
//   const {data} = await axios.get('/api/homes')
//   console.log(arr.features)
//   let markerToZip = data
//   for(let i = 0; i < arr.features.length; i++){
//       let zip1 = arr.features[i]
//       let r = 0
//       let y = 0
//       let o = 0
//       let g = 0
//       let b = 0
//       let zipMed = SingleBed.filter(med => med.RegionName == zip1.properties.zip)
//     //   Zipcode Meduin price currently
//     console.log(zipMed)
//     //   all houses with that zip zipMed.CurrentMed
   
//     let Markers = markerToZip.filter(marker => zip1.properties.zip == marker.zip)
//     Markers.map(map => map.price > (zipMed.price*1.25)? r++ : map.price > (zipMed.price*1.15)? o++: map.price > (zipMed.price * 1.05)? y++ : map.price > (zipMed.price*.90) ? g++ : b++)
//     // console.log(Markers)
//     if(r >= y && r >= o && r >= g && r >= b) 
//     {
//       fs.readFile('results.json', function (err, data) {
//       var json = JSON.parse(data)
//       json.push('search result: ' + 'test')

//     fs.writeFile("results.json", JSON.stringify(json))
//           })
         
//     }else if(y >= r && y >= o && y >= g && y >= b) 
//     {
//       fs.readFile('results.json', function (err, data) {
//       var json = JSON.parse(data)
//       json.push('search result: ' + 'red')

//     fs.writeFile("results.json", JSON.stringify(json))
//           })   
//     }else if(o >= y && o >= r && o >= g && o >= b) 
//     {
//           fs.readFile('results.json', function (err, data) {
//       var json = JSON.parse(data)
//       json.push('search result: ' + 'yellow')

//     fs.writeFile("results.json", JSON.stringify(json))
//           })
//     }else if(g >= y && g >= o && g >= r && g >= b) 
//     {
//           fs.readFile('results.json', function (err, data) {
//       var json = JSON.parse(data)
//       json.push('search result: ' + 'green')

//     fs.writeFile("results.json", JSON.stringify(json))
//           })
//     }else 
//     {
//           fs.readFile('results.json', function (err, data) {
//       var json = JSON.parse(data)
//       json.push('search result: ' + 'blue')

//     fs.writeFile("results.json", JSON.stringify(json))
//           })
//     }
//   }
  
// }

// addToJson(bound)













// <GeoJSON key='my-geojson' data={bound.features} />
export default connect(mapState, mapDispatch)(Map);
