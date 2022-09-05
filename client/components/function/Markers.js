import React, { useState } from "react";
import {
    Marker,
    useMapEvents,
  } from "react-leaflet";
  
export default function Markers(props) {
    const [zoomLevel, setZoomLevel] = useState(12); // initial zoom level provided for MapContainer
    const mapEvents = useMapEvents({
      zoomend: () => {
        setZoomLevel(mapEvents.getZoom());
    
      }
    });
    var greenIcon = L.icon({
      iconUrl: "/green.png",
      iconSize: [12, 12],
      className: "leaflet-div-icon",
    });
    var blueIcon = L.icon({
      iconUrl: "/blue.png",
      iconSize: [12, 12],
      className: "leaflet-div-icon",
    });
    var orangeIcon = L.icon({
      iconUrl: "/orange.png",
      iconSize: [12, 12],
      className: "leaflet-div-icon",
    });
    var redIcon = L.icon({
      iconUrl: "/red.png",
      iconSize: [12, 12],
      className: "leaflet-div-icon",
    });
    var yellowIcon = L.icon({
      iconUrl: "/yellow.png",
      iconSize: [12, 12],
      className: "leaflet-div-icon",
    });
    var yellowIcon2 = L.icon({
        iconUrl: "/yellow.png",
        iconSize: [15, 15],
        className: "leaflet-div-icon",
      });
    const getIcon = (price) => {
      // console.log(price)
      return price == 'red'
        ? redIcon
        : price == 'orange'
        ? orangeIcon
        : price == 'yellow'
        ? yellowIcon
        : price == 'green'
        ? greenIcon
        : blueIcon;
    };
  
      return props.homeCoord.map((house) => (
        <Marker
          icon={getIcon(house.color)}
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
              props.houseInformation()
            },
            // mouseover: (e) => {
            //     console.log(e)
            //     layer.bindPopup(house.priceNum).openPopup()
            //     // e.target.setIcon(yellowIcon2);
            //   }
          }}
        />
      ));
    
    return null;
  }