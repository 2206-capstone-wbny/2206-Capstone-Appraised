import { selectUnstyledClasses } from "@mui/base";
import associations from './associations.json'
import React, { useState } from "react";
import {
    GeoJSON,
    useMapEvents,
  } from "react-leaflet";
import { ZoomOutMap } from "@material-ui/icons";


export default function ZipLayer(props) {
    const styleState = (zip) => {
      return {
      fillColor: zipCodeColor(zip.properties.color),
      fillOpacity: .6,
      color: 'white',
      weight: 2,}
    };

    const styleCounty = {
      fillOpacity: 0,
      weight: 0,
    };
    const forEachHover = (location, layer) => {
      layer.on({
        mouseover: (e) => {
          layer.bindPopup(e.target.feature.properties.zip).openPopup()
          e.target.setStyle({  color: 'white',
          weight: 2,
          fillColor: "white",
          fillOpacity: .6, });
        },
        mouseout: (e) => {
          layer.closePopup()
          e.target.setStyle({
            fillColor: zipCodeColor(e.target.feature.properties.color),
            fillOpacity: .6,
            color: 'white',
            weight: 2
          });
        },
        click: (e) => {
          props.prevBound(e.target.getBounds())
          e.target._map.fitBounds(e.target.getBounds());
          props.selectZip(e.target.feature.properties.zip)
          
        },
      });
    };

    const forNotSelected = (location, layer) => {
      layer.on({
        mouseover: (e) => {
          layer.bindPopup(e.target.feature.properties.label_en).openPopup()
          e.target.setStyle({  color: 'white',
          weight: 2,
          fillColor: "white",
          fillOpacity: .6,});
        },
        mouseout: (e) => {
          e.target.setStyle(styleCounty);
          layer.closePopup()
        },
        click: (e) => {
          props.prevBounds(e.target.getBounds())
          e.target._map.fitBounds(e.target.getBounds());
          props.selectCounty(e.target.feature.properties.label_en)
        },
      });
    };
  
    const zipCodeColor = (color) =>{
      return color == 'red' ? 'red' : 
      color == 'orange' ? 'orange' : color == 'yellow' ?
      'yellow' : color == 'green' ? 'green' : '#00bfff'
    }

    if(Object.keys(props.selected).length != 0)
    {
        let allCounty = props.county.filter((county) => county.county != props.selected.county)
        // console.log(props.county, props.selected)
          let zipCoord = props.zip.map(zips => {
            return({
                    geometry: zips.features.geometry,
                    properties: {
                    zip: zips.features.properties.zip,
                    color: zips.color
                    },
                    type: "Feature"
            })
        })
   
            return (
            <div><GeoJSON style={styleState} key='zip' data={zipCoord}
            onEachFeature={forEachHover}/> 
            <GeoJSON style={styleCounty} key='county' data={allCounty}
            onEachFeature={forNotSelected}/> 
              </div>)
    }
    return 'loading'
    

  }