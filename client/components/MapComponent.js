import React, { useState, Component, useEffect } from "react";
import { connect } from "react-redux";
import {
  MapContainer,
  TileLayer,
  useMap,
  GeoJSON,
  Marker,
  LayerGroup,
  useMapEvents,
} from "react-leaflet";
import home, { setSingle, setHomes } from "../store/home";
import { setState, setCounty, setZip, updateZip } from "../store/geo";
import L from "leaflet";
import axios from 'axios';
import { Link } from "react-router-dom";
import Filter from "./Filters";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

function LeafletgeoSearch() {
  let map = useMap();
  const prov = new OpenStreetMapProvider({
    params: {
      countrycodes: ["us"],
      country: "united states",
    },
    retainZoomLevel: true,
  });
  useEffect(() => {
    const searchControl = new GeoSearchControl({
      style: "bar",
      provider: prov,
      notFoundMessage: "Sorry, that address could not be found.",
      showPopup: true,
      showMarker: true,
      animateZoom: true,
      searchLabel: "Enter Address, Zip, City, or State",
      zoomLevel: 15,
      keepResult: false,
      autoClose: true,
      keepResult: true,
    });
    map.addControl(searchControl);

    return () => map.removeControl(searchControl);
  }, []);
  return null;
}

function Markers(props) {
  const [zoomLevel, setZoomLevel] = useState(13); // initial zoom level provided for MapContainer
  const mapEvents = useMapEvents({
    zoomend: () => {
      setZoomLevel(mapEvents.getZoom());
    },
  });
  var greenIcon = L.icon({
    iconUrl: "/green.png",
    iconSize: [10, 10],
    className: "leaflet-div-icon",
  });
  var blueIcon = L.icon({
    iconUrl: "/blue.png",
    iconSize: [10, 10],
    className: "leaflet-div-icon",
  });
  var orangeIcon = L.icon({
    iconUrl: "/orange.png",
    iconSize: [10, 10],
    className: "leaflet-div-icon",
  });
  var redIcon = L.icon({
    iconUrl: "/red.png",
    iconSize: [10, 10],
    className: "leaflet-div-icon",
  });
  var yellowIcon = L.icon({
    iconUrl: "/yellow.png",
    iconSize: [10, 10],
    className: "leaflet-div-icon",
  });
  const getIcon = (price) => {
    return price > 800000
      ? redIcon
      : price > 650000
      ? orangeIcon
      : price > 500000
      ? yellowIcon
      : price > 300000
      ? greenIcon
      : blueIcon;
  };
  // console.log(zoomLevel, props);
  if (zoomLevel > 14) {
    return props.homeCoord.map((house) => (
      <Marker
        icon={getIcon(house.priceNum)}
        value={house.id}
        key={house.id}
        position={{
          lat: house.latitude,
          lng: house.longitude,
        }}
        // style ={{borderStyle: 'solid', borderColor: 'white', borderWidth: '10px'}}
        eventHandlers={{
          click: async (e) => {
            e.target._map.setView([house.latitude, house.longitude], 16);
            await props.fetchSingle(e.target.options.value);
            props.houseInformation();
          },
        }}
      />
    ));
  }
  return null;
}
function ZipLayer(props) {
  const [zoomLevel, setZoomLevel] = useState(13); // initial zoom level provided for MapContainer
  const [zipLayerLng, setZipLayerLng] = useState(-50);
  const mapEvents = useMapEvents({
    zoomend: () => {
      setZoomLevel(mapEvents.getZoom());
    },
    moveend: (e) => {
      let latlng = e.target.getCenter();
      setZipLayerLng(latlng.lng);
    },
  });
  const styleState = {
    color: "blue",
    fillColor: "transparent",
    // fillOpacity: -1,
    weight: 0.8,
  };
  const styleCounty = {
    // color: 'blue',
    fillColor: "orange",
    // fillOpacity: -1,
    weight: 0.5,
  };
  const forEachHover = (location, layer) => {
    // console.log('hi', location)
    layer.on({
      mouseover: (e) => {
        // console.log(e)
        e.target.setStyle({ color: "white" });
      },
      mouseout: (e) => {
        e.target.setStyle(styleState);
      },
      click: (e) => {
        e.target._map.fitBounds(e.target.getBounds());
      },
    });
  };
  // let zipBound
  // zipLayerLng < -100 && zipLayerLng > -170? zipBound = bound.features.filter(zip => zip.properties.zip > 80000 && zip.properties.zip < 100000 || zip.properties.zip > 59000 && zip.properties.zip < 60000) :
  //       zipLayerLng > -100 && zipLayerLng < -87? zipBound = bound.features.filter(zip => zip.properties.zip > 30000 && zip.properties.zip < 80000 || zip.properties.zip < 59000 && zip.properties.zip > 60000) :
  //       zipLayerLng > -87 && zipLayerLng < -45? zipBound = bound.features.filter(zip => zip.properties.zip > 0 && zip.properties.zip < 30000) : 'not on map!'
  // console.log(bound.features.filter(zip => zip.properties.zip > 0 && zip.properties.zip < 1000))
  // zipBound = bound.features.filter(zip => zip.properties.zip > 80000 && zip.properties.zip < 100000 || zip.properties.zip > 59000 && zip.properties.zip < 60000)
  // 0 - 30000     30000 - 80000         80000-100000 || 590000-600000
  // console.log(zipLayerLng, zipBound)

  const zipCodeColor = (color) =>{
    return color == 'red' ? 'red' : 
    color == 'orange' ? 'orange' : color == 'yellow' ?
    'yellow' : color == 'green' ? 'green' : 'blue'
  }
  const styleForZip = (zip) =>{
    console.log(zip)
    return {
      fillColor: zipCodeColor(zip.properties.color),
      weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
    }
  }

  let allState = props.state.map((state) => state.features);
  let allZip = props.zip.map((state) => {
      return ({
      geometry: state.features.geometry,
      properties: {
        zip: state.features.properties.zip,
        color: state.color
      },
      type: "Feature"
    })});

  if (zoomLevel < 13 && zoomLevel > 6) {
    return (
      <GeoJSON
        key="County"
        style={styleForZip}
        data={allZip}
        onEachFeature={forEachHover}
      />
    );
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
  return null;
}
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      house: null,
      MarkerZoom: false,
      zoom: 13,
    };
    this.mapRef = React.createRef();
    this.houseInformation = this.houseInformation.bind(this);
  }
  houseInformation() {
    this.setState({
      house: true,
    });
  }
  async componentWillMount() {
    await this.props.fetchAll();
    let {states}= await this.props.setState();
    await this.props.setCounty();
    let {zip} = await this.props.setZip();
    let zipcodes = this.props.homeCoord.map(home => home.zipcode)
    zipcodes.filter((item, pos) => zipcodes.indexOf(item) == pos)
    let currentZips = zipcodes.filter((item, pos) => zipcodes.indexOf(item) == pos)

    currentZips.map(async(idZips) =>{
      let r = 0;
      let o = 0;
      let y = 0;
      let g = 0;
      let b = 0;

      if(this.props.homeCoord.filter(homm => homm.zipcode == idZips))
      {
        this.props.homeCoord.filter(homm => homm.zipcode == idZips).map(homes => {
          let medPrice
          if(zip.filter(priceSearch => priceSearch.zip == homes.zipcode) && zip.filter(priceSearch => priceSearch.zip == homes.zipcode).length > 0){
          medPrice = zip.filter(priceSearch => priceSearch.zip == homes.zipcode)[0]
        }
          else{
          medPrice = states.filter(state => state.state == homes.state)[0]
          }
          if(homes.type == 'SINGLE_FAMILY')
          {
            console.log(medPrice)
            homes.priceNum >= (medPrice.singleHMed * 1.25)? r++ : homes.priceNum >= (medPrice.singleHMed * 1.15)? y++ : 
            homes.priceNum >= (medPrice.singleHMed * 1.05)? y++ : homes.priceNum >= (medPrice.singleHMed * .80)? g++ : b++   
          }else if(homes.type == 'CONDO')
          {
            homes.priceNum >= (medPrice.coopMed * 1.25)? r++ : homes.priceNum >= (medPrice.coopMed * 1.15)? y++ : 
            homes.priceNum >= (medPrice.coopMed * 1.05)? y++ : homes.priceNum >= (medPrice.coopMed * .80)? g++ : b++  
          }else if(homes.beds == 1)
          {
            homes.priceNum >= (medPrice.oneBedMed * 1.25)? r++ : homes.priceNum >= (medPrice.oneBedMed * 1.15)? y++ : 
            homes.priceNum >= (medPrice.oneBedMed * 1.05)? y++ : homes.priceNum >= (medPrice.oneBedMed * .80)? g++ : b++  
          }else if(homes.beds == 2)
          {
            homes.priceNum >= (medPrice.twoBedMed * 1.25)? r++ : homes.priceNum >= (medPrice.twoBedMed * 1.15)? y++ : 
            homes.priceNum >= (medPrice.twoBedMed * 1.05)? y++ : homes.priceNum >= (medPrice.twoBedMed * .80)? g++ : b++  
          }else if(homes.beds == 3)
          {
            homes.priceNum >= (medPrice.threeBedMed * 1.25)? r++ : homes.priceNum >= (medPrice.threeBedMed * 1.15)? y++ : 
            homes.priceNum >= (medPrice.threeBedMed * 1.05)? y++ : homes.priceNum >= (medPrice.threeBedMed * .80)? g++ : b++  
          }else if(homes.beds == 4)
          {
            homes.priceNum >= (medPrice.fourBedMed * 1.25)? r++ : homes.priceNum >= (medPrice.fourBedMed * 1.15)? y++ : 
            homes.priceNum >= (medPrice.fourBedMed * 1.05)? y++ : homes.priceNum >= (medPrice.fourBedMed * .80)? g++ : b++  
          }else if(homes.beds >= 5)
          {
            homes.priceNum >= (medPrice.fiveBedMed * 1.25)? r++ : homes.priceNum >= (medPrice.fiveBedMed * 1.15)? y++ : 
            homes.priceNum >= (medPrice.fiveBedMed * 1.05)? y++ : homes.priceNum >= (medPrice.fiveBedMed * .80)? g++ : b++ 
          }
        }
      )
      }


    //   if(r >= y && r >= o && r >= g && r >= b) 
    //  {
    //   let zipstring5 = idZips.toString()
    //   await this.props.updateZip({color:'red', zipcode: zipstring5})
    //  }
    // else if(y >= r && y >= o && y >= g && y >= b) 
    //  {
    //   let zipstring4 = idZips.toString()
    //    await this.props.updateZip({color: 'orange', zipcode: zipstring4})
    //  }else if(o >= y && o >= r && o >= g && o >= b) 
    //  {
    //   let zipstring3 = idZips.toString()
    //   await this.props.updateZip({color: 'yellow', zipcode: zipstring3})
    //  }else if(g >= y && g >= o && g >= r && g >= b) 
    //  {
    //   let zipstring2 = idZips.toString()
    //   await this.props.updateZip({color: 'green', zipcode: zipstring2})
    //  }else 
    //  {
    //   let zipstring1 = idZips.toString()
    //   console.log(zipstring1)
    //   await this.props.updateZip({color: 'blue', zipcode: zipstring1})
    //  }
    //  console.log(r, o, y, g, b)
    })
   
  }
  render() {
    return (
      <main className="leafletMap">
        <Filter />
        <div id="mainContainer">
          <div id="mapContainer">
            <MapContainer
              ref={this.mapRef}
              center={[40.7, -73.9859]}
              zoom={this.state.zoom}
              scrollWheelZoom={true}
              style={{ width: "100%", height: "100vh" }}
            >
              <LeafletgeoSearch />
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <ZipLayer state={this.props.state} zip={this.props.zip} />
              <Markers
                homeCoord={this.props.homeCoord}
                fetchSingle={this.props.fetchSingle}
                houseInformation={this.houseInformation}
              />
            </MapContainer>
          </div>
          {this.state.house !== null ? (
            <div id="infoContainer">
              <img
                id="housePic"
                src={this.props.house.imageURL}
                width="100vw"
              />
              <div id="infoText">
                <span style={{ fontSize: "25px" }}>
                  {this.props.house.price}{" "}
                </span>{" "}
                <span style={{ fontSize: 14, fontWeight: "bold" }}>
                  {" "}
                  {this.props.house.beds}{" "}
                </span>
                <span style={{ fontSize: 14 }}>bd | </span>
                <span style={{ fontSize: 14, fontWeight: "bold" }}>
                  {this.props.house.bathrooms}{" "}
                </span>{" "}
                <span style={{ fontSize: 14 }}>ba</span>
                <div>
                  <span style={{ fontSize: 14, fontWeight: "bold" }}>
                    Location:{" "}
                  </span>
                  <span style={{ fontSize: 14 }}>
                    {" "}
                    {this.props.house.city}, {this.props.house.state},{" "}
                    {this.props.house.zipcode}
                  </span>
                </div>
                <div>
                  <span style={{ fontSize: 14, fontWeight: "bold" }}>
                    Type:{" "}
                  </span>
                  <span style={{ fontSize: 14 }}> {this.props.house.type}</span>
                </div>
              </div>
              <Link
                to={`/singleHome/${this.props.house.id}`}
                className="MoreInformation"
              >
                <a>More Info</a>
              </Link>
            </div>
          ) : (
            ""
          )}
        </div>
      </main>
    );
  }
}
const mapState = (state) => {
  return {
    homeCoord: state.home.all,
    house: state.home.single,
    state: state.geo.state,
    county: state.geo.county,
    zip: state.geo.zip,
  };
};
const mapDispatch = (dispatch) => ({
  fetchAll: () => dispatch(setHomes()),
  fetchSingle: (id) => dispatch(setSingle(id)),
  setState: () => dispatch(setState()),
  setCounty: () => dispatch(setCounty()),
  setZip: () => dispatch(setZip()),
  updateZip: (data) => dispatch(updateZip(data)),
});

export default connect(mapState, mapDispatch)(Map);
