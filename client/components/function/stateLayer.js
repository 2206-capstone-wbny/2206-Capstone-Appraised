import React, { useState } from "react";
import {
    GeoJSON,
    useMapEvents,
  } from "react-leaflet";

export default function StateLayer(props) {
    const styleState = {
      color: "blue",
      fillColor: "transparent",
      fillOpacity: 0,
      // zIndex: -1,
      weight: 0.8,
    };
    const styleCounty = {
      // color: 'blue',
      fillColor: "red",
      fillOpacity: .6,
      weight: 0.5,
      color: 'white',
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
          props.prevBound(e.target.getBounds())
          e.target._map.fitBounds(e.target.getBounds());
          return props.selectState(e.target.feature.properties.label_en)
        },
      });
    };
  
    const zipCodeColor = (color) =>{
      return color == 'red' ? 'red' : 
      color == 'orange' ? 'orange' : color == 'yellow' ?
      'yellow' : color == 'green' ? 'green' : 'blue'
    }
    const styleForZip = (zip) =>{
      // console.log(zip)
      return {
        fillColor: zipCodeColor(zip.properties.color),
        weight: 2,
          opacity: 1,
          color: 'white',
          fillOpacity: 0.7
      }
    }
  
    let allState = props.state.map((state) => state.features);
    let allCounty = props.county.filter((county) => county.features.length > 0)
    {

      return(
        <div>
         <GeoJSON style={styleCounty} data={allCounty} />
        <GeoJSON style={styleState} key='statesGeo' data={allState}
        onEachFeature={forEachHover}/> 
          </div>
              )
    }

  }