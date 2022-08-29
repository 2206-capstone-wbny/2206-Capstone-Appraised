// import React from 'React'
// import { connect } from "react-redux";
// import * as zipCodes from './Data/usa.geo.json';
// import * as SingleBed from './Data/MedPrice/1BedMed.json';
// import fs from 'fs'

// const addToJson = (arr) => {
//   arr.features.map(zip1 => {
//       let r = 0
//       let y = 0
//       let o = 0
//       let g = 0
//       let b = 0
//     //   Zipcode Meduin price currently
//       let zipMed = med.filter(med => med.zip == zip1.properties.zip)
//     //   all houses with that zip 
//      let markerToZip = marker.filter(marker => zip1.properties.zip == marker.zip)
     
     
//      markerToZip.map(map => map.price > (zipMed.price*1.25)? r++ : map.price > (zipMed.price*1.15)? o++: map.price > (zipMed.price * 1.05)? y++ : map.price > (zipMed.price*.90) ? g++ : b++)
    
//      if(r >= y && r >= o && r >= g && r >= b) 
//      {
         
//      }else if(y >= r && y >= o && y >= g && y >= b) 
//      {
         
//      }else if(o >= y && o >= r && o >= g && o >= b) 
//      {
         
//      }else if(g >= y && g >= o && g >= r && g >= b) 
//      {
         
//      }else 
//      {
         
//      }
//   }) 
  
// }



// const mapState = (state) => {
//     console.log(state)
//   return {
//   homeCoord: state.home.all,
//   };
// };

// export default connect(mapState)(Map);