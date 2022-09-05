import React, { useState, Component, useEffect } from "react";
import associations from './function/associations.json'
import { connect } from "react-redux";
import {
  MapContainer,
  TileLayer,
  useMap,
} from "react-leaflet";
import home, { setSingle, setHomes, setForZip } from "../store/home";
import { getData, unselectCounty, unselectState, setState, setCounty, setZip, updateZip, setSingleState, setSingleCounty } from "../store/geo";
import L from "leaflet";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Filter from "./Filters";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import Markers from './function/Markers'
import StateLayer from './function/stateLayer'
import CountyLayer from './function/countyLayer'
import ZipLayer from './function/zipLayer'
import SideInfoView from './SideInfoView'
import StateInfo from './function/StateInfo'
import CountyInfo from './function/CountyInfo'
import HouseInfo from './function/HouseInfo'
import Fab from '@mui/material/Fab';

let buttonStyle = {width: "80px", height: '40px', backgroundColor:'white', margin: '20px', right: '0'}
let circleStyle = {backgroundColor:'lightBlue', margin: '20px'}
let circleStylet = {backgroundColor:'lightBlue', margin: '20px', position: 'absolute', right: '0'}

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

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      house: null,
      selectedState: null,
      stateInfo: null,
      selectedCounty: null,
      countyInfo: null,
      selectedZip: null,
      zipInfo:null,
      countyToZip: null,
      mapCenter: [36.116386, -95.299591],
      prevBound: null,
      prevBoundInner: null,
      prevBoundInnertwo: null,
    };
    this.mapRef = React.createRef();
    this.houseInformation = this.houseInformation.bind(this);
    this.stateClick = this.stateClick.bind(this);
    this.stateBack = this.stateBack.bind(this);
    this.countyClick = this.countyClick.bind(this);
    this.countyBack = this.countyBack.bind(this);
    this.prevBound = this.prevBound.bind(this);
    this.prevBoundIn = this.prevBoundIn.bind(this);
    this.prevBoundInner = this.prevBoundInner.bind(this);
    this.zipClick = this.zipClick.bind(this);
    this.zipBack = this.zipBack.bind(this);
    this.closeInfo = this.closeInfo.bind(this);
    this.openStateInfo = this.openStateInfo.bind(this);
    this.openCountyInfo = this.openCountyInfo.bind(this);
    this.openZipInfo = this.openZipInfo.bind(this);
    this.closeHouseInfo = this.closeHouseInfo.bind(this);
    this.getHouseFromInfo = this.getHouseFromInfo.bind(this);
  }

  async getHouseFromInfo(event)
    {
      
      await this.props.fetchSingle(event.target.id)
      let {latitude, longitude} = this.props.house
      console.log(latitude)
      this.setState({house: true})
      this.mapRef.current.setView([latitude, longitude] ,16)
    }

  openStateInfo(){
    this.setState({
      stateInfo: true
    })
  }

  openCountyInfo(){
    this.setState({
      countyInfo: true
    })
  }

  openZipInfo(){
    this.setState({
      zipInfo: true
    })
  }

  openHouseInfo(){
    this.setState({
      stateInfo: true
    })
  }

  closeInfo(){
    this.setState({
      stateInfo: null,
      countyInfo: null,
      zipInfo: null
    })
  }

  closeHouseInfo(){
    this.setState({
      house: null
    })
    this.mapRef.current.fitBounds(this.state.prevBoundInnertwo)
  }

  houseInformation() {
    this.setState({
      house: true,
    });
  }

  prevBound(bound){
    this.setState({
      prevBound: bound
    })
  }

  prevBoundIn(bound){
    this.setState({
      prevBoundInner: bound
    })
  }

  prevBoundInner(bound){
    this.setState({
      prevBoundInnertwo: bound
    })
  }

  async stateClick(id){
    await this.props.setSingleState(id)
    await this.props.getData(id)
    this.setState({
      selectedState: true,
      stateInfo: true,
    })
    
  }

  stateBack(){
    this.setState({
      selectedState: null,
      stateInfo:null,
    }
    )
   this.mapRef.current.setView(this.state.mapCenter, 5)
   this.props.unselectState();
  }

  async countyClick(id){
    await this.props.setSingleCounty(id)
    await this.props.getData(id)
    let zipArr = associations.filter(county => county.county == this.props.selectedCounty.county && county.state_abbr == this.props.selectedState.state).map(zip => zip.zipcode)
    let zipCoord = this.props.zip.filter(zipod => zipArr.includes(Number(zipod.zip)))
    this.setState({
      selectedCounty: true,
      countyInfo: true,
      countyToZip: zipCoord
    })
  }

  countyBack(){
    this.setState({
      selectedCounty: null,
      countyInfo: null,
      countyToZip: null,
    })
      this.mapRef.current.fitBounds(this.state.prevBound)
      this.props.unselectCounty();
  }

  async zipClick(zip){
    await this.props.getData(zip)
    await this.props.setForZip(zip)
    this.setState({
      selectedZip: zip,
      zipInfo: true,
    })
  }

    zipBack(){
    this.setState({
      selectedZip: null,
      house: null,
      zipInfo: null,
      // countyToZip: null,
    })
      this.mapRef.current.fitBounds(this.state.prevBoundInner)
      // this.props.unselectCounty();
  }

  async componentWillMount() {
    await this.props.fetchAll();
    let {states}= await this.props.setState()
    await this.props.setCounty()
    let {zip} = await this.props.setZip()
    this.setState({loading: false})
    // console.log(this.props)
  }
  render() {
    const {loading} = this.state
    return (
      <div> {!loading ?
      <main className="leafletMap">
        <div id="mainContainer">
          <div id="mapContainer">
            <MapContainer
              ref={this.mapRef}
              center={this.state.mapCenter}
              zoom={5}
              zoomControl={false}
              // scrollWheelZoom={false}
              // dragging={false}
              style={{ width: "100%", height: "100vh" }}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {!this.state.selectedState?
              <StateLayer prevBound={this.prevBound} selectState={this.stateClick} state={this.props.state} county={this.props.county}/>
              :
              !this.state.selectedCounty? 
              <CountyLayer prevBound={this.prevBoundIn} prevBounds={this.prevBound} selectCounty={this.countyClick} state={this.props.state} selectState={this.stateClick} county={this.props.county} selected={this.props.selectedState} />
              :
              !this.state.selectedZip?
              <ZipLayer prevBounds={this.prevBoundIn} prevBound={this.prevBoundInner}  selectZip={this.zipClick} state={this.props.selectedState.state} zip={this.state.countyToZip} county={this.props.county} selected={this.props.selectedCounty} />
              :
              <Markers
                currentZip={this.state.selectedZip}
                homeCoord={this.props.forZipcode}
                fetchSingle={this.props.fetchSingle}
                houseInformation={this.houseInformation}
              />
              }
              
            </MapContainer>
          </div>
          {this.state.house != null?  <SideInfoView/> : this.state.zipInfo != null? <HouseInfo getSingle={this.getHouseFromInfo} map={this.mapRef} /> : this.state.countyInfo != null? <CountyInfo zip={this.state.countyToZip}/> : this.state.stateInfo !== null ? 
            <StateInfo/> : ''
          }
          {this.state.house? <Fab size="medium" style={circleStylet} onClick={this.closeHouseInfo}></Fab>:this.state.selectedZip? <div className='buttonDiv'><Button style={buttonStyle} onClick={this.zipBack}>Back</Button><Filter /><Fab size="medium" style={circleStyle} onClick={this.state.zipInfo?this.closeInfo:this.openZipInfo}></Fab></div>:this.state.selectedCounty? <div className='buttonDiv'><Button style={buttonStyle} onClick={this.countyBack}>Back</Button><Fab size="medium" style={circleStyle} onClick={this.state.countyInfo?this.closeInfo:this.openCountyInfo}></Fab></div>: this.state.selectedState?  
          <div className='buttonDiv'><Button style={buttonStyle} onClick={this.stateBack}>Back</Button><Fab size="medium" style={circleStyle} onClick={this.state.stateInfo?this.closeInfo:this.openStateInfo}></Fab></div>: ''}

        </div>
      </main>
      :
      <div className="loader-container">
      <div className="spinner"></div>
    </div>} </div>
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
    selectedState: state.geo.singletState,
    selectedCounty: state.geo.singleCounty,
    forZipcode: state.home.forZipcode,
  };
};
const mapDispatch = (dispatch) => ({
  fetchAll: () => dispatch(setHomes()),
  fetchSingle: (id) => dispatch(setSingle(id)),
  setState: () => dispatch(setState()),
  setCounty: () => dispatch(setCounty()),
  setZip: () => dispatch(setZip()),
  updateZip: (data) => dispatch(updateZip(data)),
  setSingleState: (id) => dispatch(setSingleState(id)),
  setSingleCounty: (id) => dispatch(setSingleCounty(id)),
  unselectCounty: () => dispatch(unselectCounty()), 
  unselectState: () => dispatch(unselectState()),
  getData: (id) => dispatch(getData(id)),
  setForZip: (info) => dispatch(setForZip(info))
});

export default connect(mapState, mapDispatch)(Map);
