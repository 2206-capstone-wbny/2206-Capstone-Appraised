import { PresentToAll } from "@material-ui/icons";
import { selectUnstyledClasses } from "@mui/base";
import React, { useState } from "react";
import {
    GeoJSON,
    useMapEvents,
  } from "react-leaflet";

export default function CountyLayer(props) {
    // const [loading, setLoading] = useState(false); // initial zoom level provided for MapContainer

    const countyColor = (color) =>{
      return color == 'blue' ? '#00bfff' : 
      color == 'orange' ? 'orange' : color == 'yellow' ?
      'yellow' : color == 'green' ? 'green' : 'red'
    }

    const styleState = {
      fillColor: "white",
      fillOpacity: .2,
      weight: 0,
    };
    const styleCounty = (county) => {
      return({
      color: 'white',
      fillColor: countyColor(county.properties.color),
      fillOpacity: .6,
      weight: 3,})
    };
    const forEachHover = (location, layer) => {
      layer.on({
        mouseover: (e) => {
          layer.bindPopup(e.target.feature.properties.label_en).openPopup()
          e.target.setStyle({ color: 'white',
          weight: 2,
          fillColor: "white",
          fillOpacity: .6});
        },
        mouseout: (e) => {
          e.target.setStyle({
            color: 'white',
            fillColor: countyColor(e.target.feature.properties.color),
            fillOpacity: .6,
            weight: 3,})
          layer.closePopup()
        },
        click: (e) => {
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
            layer.bindPopup(e.target.feature.properties.label_en).openPopup()
            e.target.setStyle({ color: 'white',
            weight: 2,
            fillColor: "white",
            fillOpacity: .6});
          },
          mouseout: (e) => {
            layer.closePopup()
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
      allCounty = allCounty.map(countyColor => {
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

      // console.log(allCounty)
        return (
        <div>
        <GeoJSON style={styleCounty} key='counties' data={allCounty}
        onEachFeature={forEachHover}/> 
        <GeoJSON style={styleState} key='states' data={allState}
        onEachFeature={forNotSelected}/> 
        </div>
        
    )
    }
    return 'loading'
  }