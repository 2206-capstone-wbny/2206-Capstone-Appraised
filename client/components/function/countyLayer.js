import { PresentToAll } from "@material-ui/icons";
import { selectUnstyledClasses } from "@mui/base";
import React, { useState } from "react";
import {
    GeoJSON,
    useMapEvents,
  } from "react-leaflet";

export default function CountyLayer(props) {
    // const [loading, setLoading] = useState(false); // initial zoom level provided for MapContainer

    const styleState = {
      color: "blue",
      fillColor: "transparent",
      fillOpacity: 0,
      // zIndex: -1,
      weight: 0.8,
    };
    const styleCounty = {
      // color: 'blue',
      fillColor: "green",
      fillOpacity: .6,
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
          console.log(e.target.getBounds())
          props.prevBound(e.target.getBounds())
          e.target._map.fitBounds(e.target.getBounds());
          props.selectCounty(e.target.feature.properties.label_en)
        },
      });
    };
    
    const forNotSelected = (location, layer) => {
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
            props.prevBounds(e.target.getBounds())
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


    let allState = props.state.map((state) => state.features).filter(state => state.properties.postal != props.selected.state)
    let allCounty = props.county.filter((county) => county.features.length > 0)
 
    if(Object.keys(props.selected).length != 0)
    {
        return (
        <div>
        <GeoJSON style={styleCounty} key='counties' data={allCounty}
        onEachFeature={forEachHover}/> 
        <GeoJSON style={styleCounty} key='states' data={allState}
        onEachFeature={forNotSelected}/> 
        </div>
        
    )
    }
    return 'loading'
  }