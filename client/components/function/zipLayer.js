import { selectUnstyledClasses } from "@mui/base";
import associations from './associations.json'
import React, { useState } from "react";
import {
    GeoJSON,
    useMapEvents,
  } from "react-leaflet";
import { ZoomOutMap } from "@material-ui/icons";

export default function ZipLayer(props) {
    // const [zoomLevel, setZoomLevel] = useState(13); // initial zoom level provided for MapContainer
    // const [zipLayerLng, setZipLayerLng] = useState(-50);
    // const mapEvents = useMapEvents({
    //   zoomend: () => {
    //     setZoomLevel(mapEvents.getZoom());
    //   },
    //   moveend: (e) => {
    //     let latlng = e.target.getCenter();
    //     setZipLayerLng(latlng.lng);
    //   },
    // });
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
          props.prevBound(e.target.getBounds())
          e.target._map.fitBounds(e.target.getBounds());
        //   console.log(e.target.feature.properties.zip)
          props.selectZip(e.target.feature.properties.zip)
          
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
          props.selectCounty(e.target.feature.properties.label_en)
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
            <div><GeoJSON style={styleCounty} key='zip' data={zipCoord}
            onEachFeature={forEachHover}/> 
            <GeoJSON style={styleCounty} key='county' data={allCounty}
            onEachFeature={forNotSelected}/> 
              </div>)
    }
    return 'loading'
    

  }