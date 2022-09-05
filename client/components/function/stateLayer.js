import React, { useState } from "react";
import {
    GeoJSON,
    useMapEvents,
  } from "react-leaflet";

export default function StateLayer(props) {
    const styleState = {
      fillColor: "transparent",
      weight: 0,
    };  
    
    const countyColor = (color) =>{
      return color == 'blue' ? '#00bfff' : 
      color == 'orange' ? 'orange' : color == 'yellow' ?
      'yellow' : color == 'green' ? 'green' : 'red'
    }

    const styleCounty = (county) => {
   
      return({
      // color: 'blue',
      fillColor: countyColor(county.properties.color),
      fillOpacity: .6,
      weight: 0.5,
      color: 'white',})
    
    };
    const forEachHover = (location, layer) => {
      layer.on({
        mouseover: (e) => {
          layer.bindPopup(e.target.feature.properties.label_en).openPopup()
        e.target.setStyle({ 
        color: 'white',
        weight: 2,
        fillColor: "white",
        fillOpacity: .6,});
        },
        mouseout: (e) => {
          e.target.setStyle(styleState);
          // layer.closePopup()
        },
        click: (e) => {
          props.prevBound(e.target.getBounds())
          e.target._map.fitBounds(e.target.getBounds());
          return props.selectState(e.target.feature.properties.label_en)
        },
      });
    };
  
 
 
  
    let allState = props.state.map((state) => state.features);
    let allCounty = props.county.filter((county) => county.features.length > 0)
    {
      let countdata = allCounty.map(countyColor => {
        return({
          geometry: countyColor.features[0].geometry,
          properties: {
          color: countyColor.color,
          fips: countyColor.features[0].properties.fips,
          label_en: countyColor.features[0].properties.label_en,
          },
          type: "Feature"
        })
      })
      return(
        <div>
         <GeoJSON style={styleCounty} data={countdata} />
        <GeoJSON style={styleState} key='statesGeo' data={allState}
        onEachFeature={forEachHover}/> 
          </div>
              )
    }

  }