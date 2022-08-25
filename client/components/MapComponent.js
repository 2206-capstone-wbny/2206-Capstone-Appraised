import React, { useState, Component } from "react";
import { connect } from "react-redux";
import { MapContainer, TileLayer, useMap, GeoJSON, Marker } from 'react-leaflet'
import * as properties from "../data.json";
import * as bound from './usa.geo.json';
import {setSingle, setHomes} from '../store/home'

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
    house: null
}
    // this.mapRef = React.createRef();
    this.handleZoomChanged = this.handleZoomChanged.bind(this)
  }


  handleZoomChanged(event){
    console.log(event.target)
  }
  async componentWillMount()
  {
    await this.props.fetchAll()
  }
  
  
  render() {
    console.log(this)
    return (
  <main className={this.state.house == null ? 'leafLetMap' : 'leafLetMapwithInfo'}>
    <MapContainer center={[40.7,-73.9859]} zoom={13} scrollWheelZoom={false} style={{width: '100%', height: '85vh'}}>
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              {this.props.homeCoord.map((house) => (
              <Marker
                value={house.id}
                key={house.id}
                position={{
                  lat: house.latitude,
                  lng: house.longitude,
                }}
                
                eventHandlers={{
                  click: async (e) => {
                   const {homes} = await this.props.fetchSingle(e.target.options.value)
                    this.setState({house: homes})
    },
  }}
                
              />))}
            </MapContainer>  
    </main>
    )
}
}

const mapState = (state) => {
  return {
   homeCoord: state.home.all,
   house: state.home.single
  };
};
const mapDispatch = (dispatch) => ({
  fetchAll: ()=> dispatch(setHomes()),
  fetchSingle: (id)=> dispatch(setSingle(id))
})

// <GeoJSON key='my-geojson' data={bound.features} />
export default connect(mapState, mapDispatch)(Map);

