"use strict";
const homeData = require("./dummydata");
const statesData = require("./usaState.geo.json");
const statesData1 = require("./usaState1.geo.json");
const statesData2 = require("./usaState1v2.geo.json");
const statesData3 = require("./usaState1v3.geo.json");
const statesData4 = require("./usaState2.geo.json");
const statesData5 = require("./usaState2v2.geo.json");
const statesData6 = require("./usaState2v3.geo.json");
const statesData7 = require("./usaState2v4.geo.json");
const statesData8 = require("./usaState2v5.geo.json");
const statesData9 = require("./usaStatev2.geo.json");
const statesData10 = require("./usaStatev3.geo.json");
const statesData11 = require("./usaStatev3v2.geo.json");
const countyData = require("./usaCounty.geo.json");
const zipData = require("./usa.geo.json");
const stateSinglePriceMed = require("./HouseData/stateSingle.json");
const state1B = require("./HouseData/state1B.json");
const state2B = require("./HouseData/state2B.json");
const state3B = require("./HouseData/state3B.json");
const state4B = require("./HouseData/state4B.json");
const state5B = require("./HouseData/state5B.json");
const stateAH = require("./HouseData/stateAH.json");
const stateCo = require("./HouseData/stateCo.json");
const countySF = require("./HouseData/county/countySF.json");
const county1B = require("./HouseData/county/county1B.json");
const county2B = require("./HouseData/county/county2B.json");
const county3B = require("./HouseData/county/county3B.json");
const county4B = require("./HouseData/county/county4B.json");
const county5B = require("./HouseData/county/county5B.json");
const countyAH = require("./HouseData/county/countyAH.json");
const countyCo = require("./HouseData/county/countyCO.json");
const zipSF = require("./HouseData/zip/zipSF.json");
const zip1B = require("./HouseData/zip/zip1B.json");
const zip2B = require("./HouseData/zip/zip2B.json");
const zip3B = require("./HouseData/zip/zip3B.json");
const zip4B = require("./HouseData/zip/zip4B.json");
const zip5B = require("./HouseData/zip/zip5B.json");
const zipAH = require("./HouseData/zip/zipAH.json");
const zipCo = require("./HouseData/zip/zipCO.json");
const associations = require("./associations");
const countyAss = require("./countyAssociation");

const {
  db,
  manyCounty,
  manyZip,
  models: { User, Home, State, County, Zip, HistoricData },
} = require("../server/db");
const { contextType } = require("google-map-react");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody", password: "123" }),
    User.create({ username: "murphy", password: "123" }),
  ]);

  const houses = await Promise.all([
    Home.create({
      imageURL:
        "https://photos.zillowstatic.com/fp/ecc7db87ada9c99bbd4faff641f8d183-p_e.jpg",
      city: "Brooklyn",
      zipcode: 11211,
      type: "CONDO",
      price: "$399,000",
      bathrooms: 1,
      beds: 2,
      landsize: 1322,
    }),
    Home.create({
      imageURL:
        "https://photos.zillowstatic.com/fp/3e13194c641fd40b3ffd262b42de4653-p_e.jpg",
      city: "Brooklyn",
      zipcode: 11203,
      type: "SINGLE_FAMILY",
      price: "$495,000",
      bathrooms: 2,
      beds: 3,
      landsize: 1322,
    }),
    Home.create({
      imageURL:
        "https://photos.zillowstatic.com/fp/8879dfb0b1b76b7059c237ae21b761f3-p_e.jpg",
      city: "Brooklyn",
      zipcode: 11229,
      type: "SINGLE_FAMILY",
      price: "$958,000",
      bathrooms: 3,
      beds: 3,
      landsize: 1458,
    }),
  ]);

  const [house1, house2, house3] = houses;
  const [cody, murphy] = users;

  await cody.addHomes([house1, house2, house3]);
  await murphy.addHomes([house1, house2, house3]);

  // await Promise.all(
  //   statesData.features.map((home, index) => {
  //     var filtered = stateSinglePriceMed.filter(
  //       (state) => state.StateName == home.properties.postal
  //     )[0];
  //     if (filtered != null) {
  //       var stateSingleMed = Object.values(filtered).pop();
  //       var stateSingleMed1 = Object.values(
  //         state1B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed2 = Object.values(
  //         state2B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed3 = Object.values(
  //         state3B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed4 = Object.values(
  //         state4B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed5 = Object.values(
  //         state5B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed6 = Object.values(
  //         stateAH.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed7 = Object.values(
  //         stateCo.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //     } else {
  //       stateSingleMed = 0;
  //       stateSingleMed1 = 0;
  //       stateSingleMed2 = 0;
  //       stateSingleMed3 = 0;
  //       stateSingleMed4 = 0;
  //       stateSingleMed5 = 0;
  //       stateSingleMed6 = 0;
  //       stateSingleMed7 = 0;
  //     }

  //     let filiteredCounty = countyAss.filter(
  //       (county, index) => home.properties.postal == county.state
  //     );
  //     // console.log(filiteredCounty)

  //     let filiteredStuff = filiteredCounty.map((county, countyIndex) => {
  //       let sorted = countyData.features.filter(
  //         (cnty) => cnty.properties.fips == county.fips
  //       );

  //       //  console.log(filtered)
  //       var filtered = countySF.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered != null && filtered != "" && filtered != undefined) {
  //         var countySingleMed = Object.values(filtered).pop();
  //         if (countySingleMed == "") {
  //           countySingleMed = 0;
  //         }
  //       } else {
  //         countySingleMed = 0;
  //       }

  //       var filtered1 = county1B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered1 != null && filtered1 != "" && filtered1 != undefined) {
  //         var countySingleMed1 = Object.values(filtered1).pop();
  //         if (countySingleMed1 == "") {
  //           countySingleMed1 = 0;
  //         }
  //       } else {
  //         countySingleMed1 = 0;
  //       }

  //       var filtered2 = county2B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered2 != null && filtered2 != "" && filtered2 != undefined) {
  //         var countySingleMed2 = Object.values(filtered2).pop();
  //         if (countySingleMed2 == "") {
  //           countySingleMed2 = 0;
  //         }
  //       } else {
  //         countySingleMed2 = 0;
  //       }

  //       var filtered3 = county3B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered3 != null && filtered3 != "" && filtered3 != undefined) {
  //         var countySingleMed3 = Object.values(filtered3).pop();
  //         if (countySingleMed3 == "") {
  //           countySingleMed3 = 0;
  //         }
  //       } else {
  //         countySingleMed3 = 0;
  //       }

  //       var filtered4 = county4B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered4 != null && filtered4 != "" && filtered4 != undefined) {
  //         var countySingleMed4 = Object.values(filtered4).pop();
  //         if (countySingleMed4 == "") {
  //           countySingleMed4 = 0;
  //         }
  //       } else {
  //         countySingleMed4 = 0;
  //       }

  //       var filtered5 = county5B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered5 != null && filtered5 != "" && filtered5 != undefined) {
  //         var countySingleMed5 = Object.values(filtered5).pop();
  //         if (countySingleMed5 == "") {
  //           countySingleMed5 = 0;
  //         }
  //       } else {
  //         countySingleMed5 = 0;
  //       }

  //       var filtered6 = countyAH.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered6 != null && filtered6 != "" && filtered6 != undefined) {
  //         var countySingleMed6 = Object.values(filtered6).pop();
  //         if (countySingleMed6 == "") {
  //           countySingleMed6 = 0;
  //         }
  //       } else {
  //         countySingleMed6 = 0;
  //       }
  //       var filtered7 = countyCo.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered7 != null && filtered7 != "" && filtered7 != undefined) {
  //         var countySingleMed7 = Object.values(filtered7).pop();
  //         if (countySingleMed7 == "") {
  //           countySingleMed7 = 0;
  //         }
  //       } else {
  //         countySingleMed7 = 0;
  //       }

  //       let filiteredZip = associations.filter(
  //         (zip) => county.name == zip.county
  //       );

  //       let zipFilter = filiteredZip.map((zip, zipIndex) => {
  //         let zipSort = zipData.features.filter(
  //           (zp) => zp.properties.zip == zip.zipcode
  //         );
  //         // console.log(zipSort)

  //         var filteredzip = zipSF.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         // console.log(zipSF.filter(zip1 => zip1.RegionName== zip.zipcode)[0], 'this is filtedezip')
  //         if (filteredzip) {
  //           var zipSingleMed = Object.values(filteredzip).pop();
  //           if (zipSingleMed == "") {
  //             zipSingleMed = 0;
  //           }
  //         } else {
  //           zipSingleMed = 0;
  //         }

  //         var filteredzip1 = zip1B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip1) {
  //           var zipSingleMed1 = Object.values(filteredzip1).pop();
  //           if (zipSingleMed1 == "") {
  //             zipSingleMed1 = 0;
  //           }
  //         } else {
  //           zipSingleMed1 = 0;
  //         }

  //         var filteredzip2 = zip2B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip2) {
  //           var zipSingleMed2 = Object.values(filteredzip2).pop();
  //           if (zipSingleMed2 == "") {
  //             zipSingleMed2 = 0;
  //           }
  //         } else {
  //           zipSingleMed2 = 0;
  //         }

  //         var filteredzip3 = zip3B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip3) {
  //           var zipSingleMed3 = Object.values(filteredzip3).pop();
  //           if (zipSingleMed3 == "") {
  //             zipSingleMed3 = 0;
  //           }
  //         } else {
  //           zipSingleMed3 = 0;
  //         }

  //         var filteredzip4 = zip4B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip4) {
  //           var zipSingleMed4 = Object.values(filteredzip4).pop();
  //           if (zipSingleMed4 == "") {
  //             zipSingleMed4 = 0;
  //           }
  //         } else {
  //           zipSingleMed4 = 0;
  //         }

  //         var filteredzip5 = zip5B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip5) {
  //           var zipSingleMed5 = Object.values(filteredzip5).pop();
  //           if (zipSingleMed5 == "") {
  //             zipSingleMed5 = 0;
  //           }
  //         } else {
  //           zipSingleMed5 = 0;
  //         }

  //         var filteredzip6 = zipAH.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip6) {
  //           var zipSingleMed6 = Object.values(filteredzip6).pop();
  //           if (zipSingleMed6 == "") {
  //             zipSingleMed6 = 0;
  //           }
  //         } else {
  //           zipSingleMed6 = 0;
  //         }
  //         var filteredzip7 = zipCo.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip7) {
  //           var zipSingleMed7 = Object.values(filteredzip7).pop();
  //           if (zipSingleMed7 == "") {
  //             zipSingleMed7 = 0;
  //           }
  //         } else {
  //           zipSingleMed7 = 0;
  //         }

  //         //  console.log(zipSingleMed)
  //         return {
  //           zip: zip.zipcode,
  //           singleHMed: zipSingleMed,
  //           oneBedMed: zipSingleMed1,
  //           twoBedMed: zipSingleMed2,
  //           threeBedMed: zipSingleMed3,
  //           fourBedMed: zipSingleMed4,
  //           fiveBedMed: zipSingleMed5,
  //           aHBedMed: zipSingleMed6,
  //           coopMed: zipSingleMed7,
  //           features: zipSort,
  //         };
  //       });

  //       return {
  //         county: county.name,
  //         singleHMed: countySingleMed,
  //         oneBedMed: countySingleMed1,
  //         twoBedMed: countySingleMed2,
  //         threeBedMed: countySingleMed3,
  //         fourBedMed: countySingleMed4,
  //         fiveBedMed: countySingleMed5,
  //         aHBedMed: countySingleMed6,
  //         coopMed: countySingleMed7,
  //         features: sorted,
  //         zips: zipFilter,
  //       };
  //     });

  //     console.log(home.properties.postal, home.properties.label_en);

  //     return State.create(
  //       {
  //         stateName: home.properties.label_en,
  //         state: home.properties.postal,
  //         singleHMed: stateSingleMed,
  //         oneBedMed: stateSingleMed1,
  //         twoBedMed: stateSingleMed2,
  //         threeBedMed: stateSingleMed3,
  //         fourBedMed: stateSingleMed4,
  //         fiveBedMed: stateSingleMed5,
  //         aHBedMed: stateSingleMed6,
  //         coopMed: stateSingleMed7,
  //         features: home,
  //         counties: filiteredStuff,
  //       },
  //       {
  //         include: [
  //           {
  //             association: manyCounty,
  //             include: [Zip],
  //           },
  //         ],
  //       }
  //     );
  //   })
  // );

  // await Promise.all(
  //   statesData1.features.map((home, index) => {
  //     var filtered = stateSinglePriceMed.filter(
  //       (state) => state.StateName == home.properties.postal
  //     )[0];
  //     if (filtered != null) {
  //       var stateSingleMed = Object.values(filtered).pop();
  //       var stateSingleMed1 = Object.values(
  //         state1B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed2 = Object.values(
  //         state2B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed3 = Object.values(
  //         state3B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed4 = Object.values(
  //         state4B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed5 = Object.values(
  //         state5B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed6 = Object.values(
  //         stateAH.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed7 = Object.values(
  //         stateCo.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //     } else {
  //       stateSingleMed = 0;
  //       stateSingleMed1 = 0;
  //       stateSingleMed2 = 0;
  //       stateSingleMed3 = 0;
  //       stateSingleMed4 = 0;
  //       stateSingleMed5 = 0;
  //       stateSingleMed6 = 0;
  //       stateSingleMed7 = 0;
  //     }

  //     let filiteredCounty = countyAss.filter(
  //       (county, index) => home.properties.postal == county.state
  //     );
  //     // console.log(filiteredCounty)

  //     let filiteredStuff = filiteredCounty.map((county, countyIndex) => {
  //       let sorted = countyData.features.filter(
  //         (cnty) => cnty.properties.fips == county.fips
  //       );

  //       //  console.log(filtered)
  //       var filtered = countySF.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered != null && filtered != "" && filtered != undefined) {
  //         var countySingleMed = Object.values(filtered).pop();
  //         if (countySingleMed == "") {
  //           countySingleMed = 0;
  //         }
  //       } else {
  //         countySingleMed = 0;
  //       }

  //       var filtered1 = county1B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered1 != null && filtered1 != "" && filtered1 != undefined) {
  //         var countySingleMed1 = Object.values(filtered1).pop();
  //         if (countySingleMed1 == "") {
  //           countySingleMed1 = 0;
  //         }
  //       } else {
  //         countySingleMed1 = 0;
  //       }

  //       var filtered2 = county2B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered2 != null && filtered2 != "" && filtered2 != undefined) {
  //         var countySingleMed2 = Object.values(filtered2).pop();
  //         if (countySingleMed2 == "") {
  //           countySingleMed2 = 0;
  //         }
  //       } else {
  //         countySingleMed2 = 0;
  //       }

  //       var filtered3 = county3B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered3 != null && filtered3 != "" && filtered3 != undefined) {
  //         var countySingleMed3 = Object.values(filtered3).pop();
  //         if (countySingleMed3 == "") {
  //           countySingleMed3 = 0;
  //         }
  //       } else {
  //         countySingleMed3 = 0;
  //       }

  //       var filtered4 = county4B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered4 != null && filtered4 != "" && filtered4 != undefined) {
  //         var countySingleMed4 = Object.values(filtered4).pop();
  //         if (countySingleMed4 == "") {
  //           countySingleMed4 = 0;
  //         }
  //       } else {
  //         countySingleMed4 = 0;
  //       }

  //       var filtered5 = county5B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered5 != null && filtered5 != "" && filtered5 != undefined) {
  //         var countySingleMed5 = Object.values(filtered5).pop();
  //         if (countySingleMed5 == "") {
  //           countySingleMed5 = 0;
  //         }
  //       } else {
  //         countySingleMed5 = 0;
  //       }

  //       var filtered6 = countyAH.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered6 != null && filtered6 != "" && filtered6 != undefined) {
  //         var countySingleMed6 = Object.values(filtered6).pop();
  //         if (countySingleMed6 == "") {
  //           countySingleMed6 = 0;
  //         }
  //       } else {
  //         countySingleMed6 = 0;
  //       }
  //       var filtered7 = countyCo.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered7 != null && filtered7 != "" && filtered7 != undefined) {
  //         var countySingleMed7 = Object.values(filtered7).pop();
  //         if (countySingleMed7 == "") {
  //           countySingleMed7 = 0;
  //         }
  //       } else {
  //         countySingleMed7 = 0;
  //       }

  //       let filiteredZip = associations.filter(
  //         (zip) => county.name == zip.county
  //       );

  //       let zipFilter = filiteredZip.map((zip, zipIndex) => {
  //         let zipSort = zipData.features.filter(
  //           (zp) => zp.properties.zip == zip.zipcode
  //         );
  //         // console.log(zipSort)

  //         var filteredzip = zipSF.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         // console.log(zipSF.filter(zip1 => zip1.RegionName== zip.zipcode)[0], 'this is filtedezip')
  //         if (filteredzip) {
  //           var zipSingleMed = Object.values(filteredzip).pop();
  //           if (zipSingleMed == "") {
  //             zipSingleMed = 0;
  //           }
  //         } else {
  //           zipSingleMed = 0;
  //         }

  //         var filteredzip1 = zip1B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip1) {
  //           var zipSingleMed1 = Object.values(filteredzip1).pop();
  //           if (zipSingleMed1 == "") {
  //             zipSingleMed1 = 0;
  //           }
  //         } else {
  //           zipSingleMed1 = 0;
  //         }

  //         var filteredzip2 = zip2B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip2) {
  //           var zipSingleMed2 = Object.values(filteredzip2).pop();
  //           if (zipSingleMed2 == "") {
  //             zipSingleMed2 = 0;
  //           }
  //         } else {
  //           zipSingleMed2 = 0;
  //         }

  //         var filteredzip3 = zip3B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip3) {
  //           var zipSingleMed3 = Object.values(filteredzip3).pop();
  //           if (zipSingleMed3 == "") {
  //             zipSingleMed3 = 0;
  //           }
  //         } else {
  //           zipSingleMed3 = 0;
  //         }

  //         var filteredzip4 = zip4B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip4) {
  //           var zipSingleMed4 = Object.values(filteredzip4).pop();
  //           if (zipSingleMed4 == "") {
  //             zipSingleMed4 = 0;
  //           }
  //         } else {
  //           zipSingleMed4 = 0;
  //         }

  //         var filteredzip5 = zip5B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip5) {
  //           var zipSingleMed5 = Object.values(filteredzip5).pop();
  //           if (zipSingleMed5 == "") {
  //             zipSingleMed5 = 0;
  //           }
  //         } else {
  //           zipSingleMed5 = 0;
  //         }

  //         var filteredzip6 = zipAH.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip6) {
  //           var zipSingleMed6 = Object.values(filteredzip6).pop();
  //           if (zipSingleMed6 == "") {
  //             zipSingleMed6 = 0;
  //           }
  //         } else {
  //           zipSingleMed6 = 0;
  //         }
  //         var filteredzip7 = zipCo.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip7) {
  //           var zipSingleMed7 = Object.values(filteredzip7).pop();
  //           if (zipSingleMed7 == "") {
  //             zipSingleMed7 = 0;
  //           }
  //         } else {
  //           zipSingleMed7 = 0;
  //         }

  //         //  console.log(zipSingleMed)
  //         return {
  //           zip: zip.zipcode,
  //           singleHMed: zipSingleMed,
  //           oneBedMed: zipSingleMed1,
  //           twoBedMed: zipSingleMed2,
  //           threeBedMed: zipSingleMed3,
  //           fourBedMed: zipSingleMed4,
  //           fiveBedMed: zipSingleMed5,
  //           aHBedMed: zipSingleMed6,
  //           coopMed: zipSingleMed7,
  //           features: zipSort,
  //         };
  //       });

  //       return {
  //         county: county.name,
  //         singleHMed: countySingleMed,
  //         oneBedMed: countySingleMed1,
  //         twoBedMed: countySingleMed2,
  //         threeBedMed: countySingleMed3,
  //         fourBedMed: countySingleMed4,
  //         fiveBedMed: countySingleMed5,
  //         aHBedMed: countySingleMed6,
  //         coopMed: countySingleMed7,
  //         features: sorted,
  //         zips: zipFilter,
  //       };
  //     });

  //     console.log(home.properties.postal, home.properties.label_en);

  //     return State.create(
  //       {
  //         stateName: home.properties.label_en,
  //         state: home.properties.postal,
  //         singleHMed: stateSingleMed,
  //         oneBedMed: stateSingleMed1,
  //         twoBedMed: stateSingleMed2,
  //         threeBedMed: stateSingleMed3,
  //         fourBedMed: stateSingleMed4,
  //         fiveBedMed: stateSingleMed5,
  //         aHBedMed: stateSingleMed6,
  //         coopMed: stateSingleMed7,
  //         features: home,
  //         counties: filiteredStuff,
  //       },
  //       {
  //         include: [
  //           {
  //             association: manyCounty,
  //             include: [Zip],
  //           },
  //         ],
  //       }
  //     );
  //   })
  // );

  // await Promise.all(
  //   statesData2.features.map((home, index) => {
  //     var filtered = stateSinglePriceMed.filter(
  //       (state) => state.StateName == home.properties.postal
  //     )[0];
  //     if (filtered != null) {
  //       var stateSingleMed = Object.values(filtered).pop();
  //       var stateSingleMed1 = Object.values(
  //         state1B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed2 = Object.values(
  //         state2B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed3 = Object.values(
  //         state3B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed4 = Object.values(
  //         state4B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed5 = Object.values(
  //         state5B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed6 = Object.values(
  //         stateAH.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed7 = Object.values(
  //         stateCo.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //     } else {
  //       stateSingleMed = 0;
  //       stateSingleMed1 = 0;
  //       stateSingleMed2 = 0;
  //       stateSingleMed3 = 0;
  //       stateSingleMed4 = 0;
  //       stateSingleMed5 = 0;
  //       stateSingleMed6 = 0;
  //       stateSingleMed7 = 0;
  //     }

  //     let filiteredCounty = countyAss.filter(
  //       (county, index) => home.properties.postal == county.state
  //     );
  //     // console.log(filiteredCounty)

  //     let filiteredStuff = filiteredCounty.map((county, countyIndex) => {
  //       let sorted = countyData.features.filter(
  //         (cnty) => cnty.properties.fips == county.fips
  //       );

  //       //  console.log(filtered)
  //       var filtered = countySF.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered != null && filtered != "" && filtered != undefined) {
  //         var countySingleMed = Object.values(filtered).pop();
  //         if (countySingleMed == "") {
  //           countySingleMed = 0;
  //         }
  //       } else {
  //         countySingleMed = 0;
  //       }

  //       var filtered1 = county1B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered1 != null && filtered1 != "" && filtered1 != undefined) {
  //         var countySingleMed1 = Object.values(filtered1).pop();
  //         if (countySingleMed1 == "") {
  //           countySingleMed1 = 0;
  //         }
  //       } else {
  //         countySingleMed1 = 0;
  //       }

  //       var filtered2 = county2B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered2 != null && filtered2 != "" && filtered2 != undefined) {
  //         var countySingleMed2 = Object.values(filtered2).pop();
  //         if (countySingleMed2 == "") {
  //           countySingleMed2 = 0;
  //         }
  //       } else {
  //         countySingleMed2 = 0;
  //       }

  //       var filtered3 = county3B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered3 != null && filtered3 != "" && filtered3 != undefined) {
  //         var countySingleMed3 = Object.values(filtered3).pop();
  //         if (countySingleMed3 == "") {
  //           countySingleMed3 = 0;
  //         }
  //       } else {
  //         countySingleMed3 = 0;
  //       }

  //       var filtered4 = county4B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered4 != null && filtered4 != "" && filtered4 != undefined) {
  //         var countySingleMed4 = Object.values(filtered4).pop();
  //         if (countySingleMed4 == "") {
  //           countySingleMed4 = 0;
  //         }
  //       } else {
  //         countySingleMed4 = 0;
  //       }

  //       var filtered5 = county5B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered5 != null && filtered5 != "" && filtered5 != undefined) {
  //         var countySingleMed5 = Object.values(filtered5).pop();
  //         if (countySingleMed5 == "") {
  //           countySingleMed5 = 0;
  //         }
  //       } else {
  //         countySingleMed5 = 0;
  //       }

  //       var filtered6 = countyAH.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered6 != null && filtered6 != "" && filtered6 != undefined) {
  //         var countySingleMed6 = Object.values(filtered6).pop();
  //         if (countySingleMed6 == "") {
  //           countySingleMed6 = 0;
  //         }
  //       } else {
  //         countySingleMed6 = 0;
  //       }
  //       var filtered7 = countyCo.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered7 != null && filtered7 != "" && filtered7 != undefined) {
  //         var countySingleMed7 = Object.values(filtered7).pop();
  //         if (countySingleMed7 == "") {
  //           countySingleMed7 = 0;
  //         }
  //       } else {
  //         countySingleMed7 = 0;
  //       }

  //       let filiteredZip = associations.filter(
  //         (zip) => county.name == zip.county
  //       );

  //       let zipFilter = filiteredZip.map((zip, zipIndex) => {
  //         let zipSort = zipData.features.filter(
  //           (zp) => zp.properties.zip == zip.zipcode
  //         );
  //         // console.log(zipSort)

  //         var filteredzip = zipSF.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         // console.log(zipSF.filter(zip1 => zip1.RegionName== zip.zipcode)[0], 'this is filtedezip')
  //         if (filteredzip) {
  //           var zipSingleMed = Object.values(filteredzip).pop();
  //           if (zipSingleMed == "") {
  //             zipSingleMed = 0;
  //           }
  //         } else {
  //           zipSingleMed = 0;
  //         }

  //         var filteredzip1 = zip1B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip1) {
  //           var zipSingleMed1 = Object.values(filteredzip1).pop();
  //           if (zipSingleMed1 == "") {
  //             zipSingleMed1 = 0;
  //           }
  //         } else {
  //           zipSingleMed1 = 0;
  //         }

  //         var filteredzip2 = zip2B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip2) {
  //           var zipSingleMed2 = Object.values(filteredzip2).pop();
  //           if (zipSingleMed2 == "") {
  //             zipSingleMed2 = 0;
  //           }
  //         } else {
  //           zipSingleMed2 = 0;
  //         }

  //         var filteredzip3 = zip3B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip3) {
  //           var zipSingleMed3 = Object.values(filteredzip3).pop();
  //           if (zipSingleMed3 == "") {
  //             zipSingleMed3 = 0;
  //           }
  //         } else {
  //           zipSingleMed3 = 0;
  //         }

  //         var filteredzip4 = zip4B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip4) {
  //           var zipSingleMed4 = Object.values(filteredzip4).pop();
  //           if (zipSingleMed4 == "") {
  //             zipSingleMed4 = 0;
  //           }
  //         } else {
  //           zipSingleMed4 = 0;
  //         }

  //         var filteredzip5 = zip5B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip5) {
  //           var zipSingleMed5 = Object.values(filteredzip5).pop();
  //           if (zipSingleMed5 == "") {
  //             zipSingleMed5 = 0;
  //           }
  //         } else {
  //           zipSingleMed5 = 0;
  //         }

  //         var filteredzip6 = zipAH.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip6) {
  //           var zipSingleMed6 = Object.values(filteredzip6).pop();
  //           if (zipSingleMed6 == "") {
  //             zipSingleMed6 = 0;
  //           }
  //         } else {
  //           zipSingleMed6 = 0;
  //         }
  //         var filteredzip7 = zipCo.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip7) {
  //           var zipSingleMed7 = Object.values(filteredzip7).pop();
  //           if (zipSingleMed7 == "") {
  //             zipSingleMed7 = 0;
  //           }
  //         } else {
  //           zipSingleMed7 = 0;
  //         }

  //         //  console.log(zipSingleMed)
  //         return {
  //           zip: zip.zipcode,
  //           singleHMed: zipSingleMed,
  //           oneBedMed: zipSingleMed1,
  //           twoBedMed: zipSingleMed2,
  //           threeBedMed: zipSingleMed3,
  //           fourBedMed: zipSingleMed4,
  //           fiveBedMed: zipSingleMed5,
  //           aHBedMed: zipSingleMed6,
  //           coopMed: zipSingleMed7,
  //           features: zipSort,
  //         };
  //       });

  //       return {
  //         county: county.name,
  //         singleHMed: countySingleMed,
  //         oneBedMed: countySingleMed1,
  //         twoBedMed: countySingleMed2,
  //         threeBedMed: countySingleMed3,
  //         fourBedMed: countySingleMed4,
  //         fiveBedMed: countySingleMed5,
  //         aHBedMed: countySingleMed6,
  //         coopMed: countySingleMed7,
  //         features: sorted,
  //         zips: zipFilter,
  //       };
  //     });

  //     console.log(home.properties.postal, home.properties.label_en);

  //     return State.create(
  //       {
  //         stateName: home.properties.label_en,
  //         state: home.properties.postal,
  //         singleHMed: stateSingleMed,
  //         oneBedMed: stateSingleMed1,
  //         twoBedMed: stateSingleMed2,
  //         threeBedMed: stateSingleMed3,
  //         fourBedMed: stateSingleMed4,
  //         fiveBedMed: stateSingleMed5,
  //         aHBedMed: stateSingleMed6,
  //         coopMed: stateSingleMed7,
  //         features: home,
  //         counties: filiteredStuff,
  //       },
  //       {
  //         include: [
  //           {
  //             association: manyCounty,
  //             include: [Zip],
  //           },
  //         ],
  //       }
  //     );
  //   })
  // );

  // await Promise.all(
  //   statesData3.features.map((home, index) => {
  //     var filtered = stateSinglePriceMed.filter(
  //       (state) => state.StateName == home.properties.postal
  //     )[0];
  //     if (filtered != null) {
  //       var stateSingleMed = Object.values(filtered).pop();
  //       var stateSingleMed1 = Object.values(
  //         state1B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed2 = Object.values(
  //         state2B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed3 = Object.values(
  //         state3B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed4 = Object.values(
  //         state4B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed5 = Object.values(
  //         state5B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed6 = Object.values(
  //         stateAH.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed7 = Object.values(
  //         stateCo.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //     } else {
  //       stateSingleMed = 0;
  //       stateSingleMed1 = 0;
  //       stateSingleMed2 = 0;
  //       stateSingleMed3 = 0;
  //       stateSingleMed4 = 0;
  //       stateSingleMed5 = 0;
  //       stateSingleMed6 = 0;
  //       stateSingleMed7 = 0;
  //     }

  //     let filiteredCounty = countyAss.filter(
  //       (county, index) => home.properties.postal == county.state
  //     );
  //     // console.log(filiteredCounty)

  //     let filiteredStuff = filiteredCounty.map((county, countyIndex) => {
  //       let sorted = countyData.features.filter(
  //         (cnty) => cnty.properties.fips == county.fips
  //       );

  //       //  console.log(filtered)
  //       var filtered = countySF.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered != null && filtered != "" && filtered != undefined) {
  //         var countySingleMed = Object.values(filtered).pop();
  //         if (countySingleMed == "") {
  //           countySingleMed = 0;
  //         }
  //       } else {
  //         countySingleMed = 0;
  //       }

  //       var filtered1 = county1B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered1 != null && filtered1 != "" && filtered1 != undefined) {
  //         var countySingleMed1 = Object.values(filtered1).pop();
  //         if (countySingleMed1 == "") {
  //           countySingleMed1 = 0;
  //         }
  //       } else {
  //         countySingleMed1 = 0;
  //       }

  //       var filtered2 = county2B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered2 != null && filtered2 != "" && filtered2 != undefined) {
  //         var countySingleMed2 = Object.values(filtered2).pop();
  //         if (countySingleMed2 == "") {
  //           countySingleMed2 = 0;
  //         }
  //       } else {
  //         countySingleMed2 = 0;
  //       }

  //       var filtered3 = county3B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered3 != null && filtered3 != "" && filtered3 != undefined) {
  //         var countySingleMed3 = Object.values(filtered3).pop();
  //         if (countySingleMed3 == "") {
  //           countySingleMed3 = 0;
  //         }
  //       } else {
  //         countySingleMed3 = 0;
  //       }

  //       var filtered4 = county4B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered4 != null && filtered4 != "" && filtered4 != undefined) {
  //         var countySingleMed4 = Object.values(filtered4).pop();
  //         if (countySingleMed4 == "") {
  //           countySingleMed4 = 0;
  //         }
  //       } else {
  //         countySingleMed4 = 0;
  //       }

  //       var filtered5 = county5B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered5 != null && filtered5 != "" && filtered5 != undefined) {
  //         var countySingleMed5 = Object.values(filtered5).pop();
  //         if (countySingleMed5 == "") {
  //           countySingleMed5 = 0;
  //         }
  //       } else {
  //         countySingleMed5 = 0;
  //       }

  //       var filtered6 = countyAH.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered6 != null && filtered6 != "" && filtered6 != undefined) {
  //         var countySingleMed6 = Object.values(filtered6).pop();
  //         if (countySingleMed6 == "") {
  //           countySingleMed6 = 0;
  //         }
  //       } else {
  //         countySingleMed6 = 0;
  //       }
  //       var filtered7 = countyCo.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered7 != null && filtered7 != "" && filtered7 != undefined) {
  //         var countySingleMed7 = Object.values(filtered7).pop();
  //         if (countySingleMed7 == "") {
  //           countySingleMed7 = 0;
  //         }
  //       } else {
  //         countySingleMed7 = 0;
  //       }

  //       let filiteredZip = associations.filter(
  //         (zip) => county.name == zip.county
  //       );

  //       let zipFilter = filiteredZip.map((zip, zipIndex) => {
  //         let zipSort = zipData.features.filter(
  //           (zp) => zp.properties.zip == zip.zipcode
  //         );
  //         // console.log(zipSort)

  //         var filteredzip = zipSF.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         // console.log(zipSF.filter(zip1 => zip1.RegionName== zip.zipcode)[0], 'this is filtedezip')
  //         if (filteredzip) {
  //           var zipSingleMed = Object.values(filteredzip).pop();
  //           if (zipSingleMed == "") {
  //             zipSingleMed = 0;
  //           }
  //         } else {
  //           zipSingleMed = 0;
  //         }

  //         var filteredzip1 = zip1B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip1) {
  //           var zipSingleMed1 = Object.values(filteredzip1).pop();
  //           if (zipSingleMed1 == "") {
  //             zipSingleMed1 = 0;
  //           }
  //         } else {
  //           zipSingleMed1 = 0;
  //         }

  //         var filteredzip2 = zip2B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip2) {
  //           var zipSingleMed2 = Object.values(filteredzip2).pop();
  //           if (zipSingleMed2 == "") {
  //             zipSingleMed2 = 0;
  //           }
  //         } else {
  //           zipSingleMed2 = 0;
  //         }

  //         var filteredzip3 = zip3B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip3) {
  //           var zipSingleMed3 = Object.values(filteredzip3).pop();
  //           if (zipSingleMed3 == "") {
  //             zipSingleMed3 = 0;
  //           }
  //         } else {
  //           zipSingleMed3 = 0;
  //         }

  //         var filteredzip4 = zip4B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip4) {
  //           var zipSingleMed4 = Object.values(filteredzip4).pop();
  //           if (zipSingleMed4 == "") {
  //             zipSingleMed4 = 0;
  //           }
  //         } else {
  //           zipSingleMed4 = 0;
  //         }

  //         var filteredzip5 = zip5B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip5) {
  //           var zipSingleMed5 = Object.values(filteredzip5).pop();
  //           if (zipSingleMed5 == "") {
  //             zipSingleMed5 = 0;
  //           }
  //         } else {
  //           zipSingleMed5 = 0;
  //         }

  //         var filteredzip6 = zipAH.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip6) {
  //           var zipSingleMed6 = Object.values(filteredzip6).pop();
  //           if (zipSingleMed6 == "") {
  //             zipSingleMed6 = 0;
  //           }
  //         } else {
  //           zipSingleMed6 = 0;
  //         }
  //         var filteredzip7 = zipCo.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip7) {
  //           var zipSingleMed7 = Object.values(filteredzip7).pop();
  //           if (zipSingleMed7 == "") {
  //             zipSingleMed7 = 0;
  //           }
  //         } else {
  //           zipSingleMed7 = 0;
  //         }

  //         //  console.log(zipSingleMed)
  //         return {
  //           zip: zip.zipcode,
  //           singleHMed: zipSingleMed,
  //           oneBedMed: zipSingleMed1,
  //           twoBedMed: zipSingleMed2,
  //           threeBedMed: zipSingleMed3,
  //           fourBedMed: zipSingleMed4,
  //           fiveBedMed: zipSingleMed5,
  //           aHBedMed: zipSingleMed6,
  //           coopMed: zipSingleMed7,
  //           features: zipSort,
  //         };
  //       });

  //       return {
  //         county: county.name,
  //         singleHMed: countySingleMed,
  //         oneBedMed: countySingleMed1,
  //         twoBedMed: countySingleMed2,
  //         threeBedMed: countySingleMed3,
  //         fourBedMed: countySingleMed4,
  //         fiveBedMed: countySingleMed5,
  //         aHBedMed: countySingleMed6,
  //         coopMed: countySingleMed7,
  //         features: sorted,
  //         zips: zipFilter,
  //       };
  //     });

  //     console.log(home.properties.postal, home.properties.label_en);

  //     return State.create(
  //       {
  //         stateName: home.properties.label_en,
  //         state: home.properties.postal,
  //         singleHMed: stateSingleMed,
  //         oneBedMed: stateSingleMed1,
  //         twoBedMed: stateSingleMed2,
  //         threeBedMed: stateSingleMed3,
  //         fourBedMed: stateSingleMed4,
  //         fiveBedMed: stateSingleMed5,
  //         aHBedMed: stateSingleMed6,
  //         coopMed: stateSingleMed7,
  //         features: home,
  //         counties: filiteredStuff,
  //       },
  //       {
  //         include: [
  //           {
  //             association: manyCounty,
  //             include: [Zip],
  //           },
  //         ],
  //       }
  //     );
  //   })
  // );

  // await Promise.all(
  //   statesData4.features.map((home, index) => {
  //     var filtered = stateSinglePriceMed.filter(
  //       (state) => state.StateName == home.properties.postal
  //     )[0];
  //     if (filtered != null) {
  //       var stateSingleMed = Object.values(filtered).pop();
  //       var stateSingleMed1 = Object.values(
  //         state1B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed2 = Object.values(
  //         state2B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed3 = Object.values(
  //         state3B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed4 = Object.values(
  //         state4B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed5 = Object.values(
  //         state5B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed6 = Object.values(
  //         stateAH.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed7 = Object.values(
  //         stateCo.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //     } else {
  //       stateSingleMed = 0;
  //       stateSingleMed1 = 0;
  //       stateSingleMed2 = 0;
  //       stateSingleMed3 = 0;
  //       stateSingleMed4 = 0;
  //       stateSingleMed5 = 0;
  //       stateSingleMed6 = 0;
  //       stateSingleMed7 = 0;
  //     }

  //     let filiteredCounty = countyAss.filter(
  //       (county, index) => home.properties.postal == county.state
  //     );
  //     // console.log(filiteredCounty)

  //     let filiteredStuff = filiteredCounty.map((county, countyIndex) => {
  //       let sorted = countyData.features.filter(
  //         (cnty) => cnty.properties.fips == county.fips
  //       );

  //       //  console.log(filtered)
  //       var filtered = countySF.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered != null && filtered != "" && filtered != undefined) {
  //         var countySingleMed = Object.values(filtered).pop();
  //         if (countySingleMed == "") {
  //           countySingleMed = 0;
  //         }
  //       } else {
  //         countySingleMed = 0;
  //       }

  //       var filtered1 = county1B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered1 != null && filtered1 != "" && filtered1 != undefined) {
  //         var countySingleMed1 = Object.values(filtered1).pop();
  //         if (countySingleMed1 == "") {
  //           countySingleMed1 = 0;
  //         }
  //       } else {
  //         countySingleMed1 = 0;
  //       }

  //       var filtered2 = county2B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered2 != null && filtered2 != "" && filtered2 != undefined) {
  //         var countySingleMed2 = Object.values(filtered2).pop();
  //         if (countySingleMed2 == "") {
  //           countySingleMed2 = 0;
  //         }
  //       } else {
  //         countySingleMed2 = 0;
  //       }

  //       var filtered3 = county3B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered3 != null && filtered3 != "" && filtered3 != undefined) {
  //         var countySingleMed3 = Object.values(filtered3).pop();
  //         if (countySingleMed3 == "") {
  //           countySingleMed3 = 0;
  //         }
  //       } else {
  //         countySingleMed3 = 0;
  //       }

  //       var filtered4 = county4B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered4 != null && filtered4 != "" && filtered4 != undefined) {
  //         var countySingleMed4 = Object.values(filtered4).pop();
  //         if (countySingleMed4 == "") {
  //           countySingleMed4 = 0;
  //         }
  //       } else {
  //         countySingleMed4 = 0;
  //       }

  //       var filtered5 = county5B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered5 != null && filtered5 != "" && filtered5 != undefined) {
  //         var countySingleMed5 = Object.values(filtered5).pop();
  //         if (countySingleMed5 == "") {
  //           countySingleMed5 = 0;
  //         }
  //       } else {
  //         countySingleMed5 = 0;
  //       }

  //       var filtered6 = countyAH.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered6 != null && filtered6 != "" && filtered6 != undefined) {
  //         var countySingleMed6 = Object.values(filtered6).pop();
  //         if (countySingleMed6 == "") {
  //           countySingleMed6 = 0;
  //         }
  //       } else {
  //         countySingleMed6 = 0;
  //       }
  //       var filtered7 = countyCo.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered7 != null && filtered7 != "" && filtered7 != undefined) {
  //         var countySingleMed7 = Object.values(filtered7).pop();
  //         if (countySingleMed7 == "") {
  //           countySingleMed7 = 0;
  //         }
  //       } else {
  //         countySingleMed7 = 0;
  //       }

  //       let filiteredZip = associations.filter(
  //         (zip) => county.name == zip.county
  //       );

  //       let zipFilter = filiteredZip.map((zip, zipIndex) => {
  //         let zipSort = zipData.features.filter(
  //           (zp) => zp.properties.zip == zip.zipcode
  //         );
  //         // console.log(zipSort)

  //         var filteredzip = zipSF.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         // console.log(zipSF.filter(zip1 => zip1.RegionName== zip.zipcode)[0], 'this is filtedezip')
  //         if (filteredzip) {
  //           var zipSingleMed = Object.values(filteredzip).pop();
  //           if (zipSingleMed == "") {
  //             zipSingleMed = 0;
  //           }
  //         } else {
  //           zipSingleMed = 0;
  //         }

  //         var filteredzip1 = zip1B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip1) {
  //           var zipSingleMed1 = Object.values(filteredzip1).pop();
  //           if (zipSingleMed1 == "") {
  //             zipSingleMed1 = 0;
  //           }
  //         } else {
  //           zipSingleMed1 = 0;
  //         }

  //         var filteredzip2 = zip2B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip2) {
  //           var zipSingleMed2 = Object.values(filteredzip2).pop();
  //           if (zipSingleMed2 == "") {
  //             zipSingleMed2 = 0;
  //           }
  //         } else {
  //           zipSingleMed2 = 0;
  //         }

  //         var filteredzip3 = zip3B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip3) {
  //           var zipSingleMed3 = Object.values(filteredzip3).pop();
  //           if (zipSingleMed3 == "") {
  //             zipSingleMed3 = 0;
  //           }
  //         } else {
  //           zipSingleMed3 = 0;
  //         }

  //         var filteredzip4 = zip4B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip4) {
  //           var zipSingleMed4 = Object.values(filteredzip4).pop();
  //           if (zipSingleMed4 == "") {
  //             zipSingleMed4 = 0;
  //           }
  //         } else {
  //           zipSingleMed4 = 0;
  //         }

  //         var filteredzip5 = zip5B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip5) {
  //           var zipSingleMed5 = Object.values(filteredzip5).pop();
  //           if (zipSingleMed5 == "") {
  //             zipSingleMed5 = 0;
  //           }
  //         } else {
  //           zipSingleMed5 = 0;
  //         }

  //         var filteredzip6 = zipAH.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip6) {
  //           var zipSingleMed6 = Object.values(filteredzip6).pop();
  //           if (zipSingleMed6 == "") {
  //             zipSingleMed6 = 0;
  //           }
  //         } else {
  //           zipSingleMed6 = 0;
  //         }
  //         var filteredzip7 = zipCo.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip7) {
  //           var zipSingleMed7 = Object.values(filteredzip7).pop();
  //           if (zipSingleMed7 == "") {
  //             zipSingleMed7 = 0;
  //           }
  //         } else {
  //           zipSingleMed7 = 0;
  //         }

  //         //  console.log(zipSingleMed)
  //         return {
  //           zip: zip.zipcode,
  //           singleHMed: zipSingleMed,
  //           oneBedMed: zipSingleMed1,
  //           twoBedMed: zipSingleMed2,
  //           threeBedMed: zipSingleMed3,
  //           fourBedMed: zipSingleMed4,
  //           fiveBedMed: zipSingleMed5,
  //           aHBedMed: zipSingleMed6,
  //           coopMed: zipSingleMed7,
  //           features: zipSort,
  //         };
  //       });

  //       return {
  //         county: county.name,
  //         singleHMed: countySingleMed,
  //         oneBedMed: countySingleMed1,
  //         twoBedMed: countySingleMed2,
  //         threeBedMed: countySingleMed3,
  //         fourBedMed: countySingleMed4,
  //         fiveBedMed: countySingleMed5,
  //         aHBedMed: countySingleMed6,
  //         coopMed: countySingleMed7,
  //         features: sorted,
  //         zips: zipFilter,
  //       };
  //     });

  //     console.log(home.properties.postal, home.properties.label_en);

  //     return State.create(
  //       {
  //         stateName: home.properties.label_en,
  //         state: home.properties.postal,
  //         singleHMed: stateSingleMed,
  //         oneBedMed: stateSingleMed1,
  //         twoBedMed: stateSingleMed2,
  //         threeBedMed: stateSingleMed3,
  //         fourBedMed: stateSingleMed4,
  //         fiveBedMed: stateSingleMed5,
  //         aHBedMed: stateSingleMed6,
  //         coopMed: stateSingleMed7,
  //         features: home,
  //         counties: filiteredStuff,
  //       },
  //       {
  //         include: [
  //           {
  //             association: manyCounty,
  //             include: [Zip],
  //           },
  //         ],
  //       }
  //     );
  //   })
  // );

  // await Promise.all(
  //   statesData5.features.map((home, index) => {
  //     var filtered = stateSinglePriceMed.filter(
  //       (state) => state.StateName == home.properties.postal
  //     )[0];
  //     if (filtered != null) {
  //       var stateSingleMed = Object.values(filtered).pop();
  //       var stateSingleMed1 = Object.values(
  //         state1B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed2 = Object.values(
  //         state2B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed3 = Object.values(
  //         state3B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed4 = Object.values(
  //         state4B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed5 = Object.values(
  //         state5B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed6 = Object.values(
  //         stateAH.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed7 = Object.values(
  //         stateCo.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //     } else {
  //       stateSingleMed = 0;
  //       stateSingleMed1 = 0;
  //       stateSingleMed2 = 0;
  //       stateSingleMed3 = 0;
  //       stateSingleMed4 = 0;
  //       stateSingleMed5 = 0;
  //       stateSingleMed6 = 0;
  //       stateSingleMed7 = 0;
  //     }

  //     let filiteredCounty = countyAss.filter(
  //       (county, index) => home.properties.postal == county.state
  //     );
  //     // console.log(filiteredCounty)

  //     let filiteredStuff = filiteredCounty.map((county, countyIndex) => {
  //       let sorted = countyData.features.filter(
  //         (cnty) => cnty.properties.fips == county.fips
  //       );

  //       //  console.log(filtered)
  //       var filtered = countySF.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered != null && filtered != "" && filtered != undefined) {
  //         var countySingleMed = Object.values(filtered).pop();
  //         if (countySingleMed == "") {
  //           countySingleMed = 0;
  //         }
  //       } else {
  //         countySingleMed = 0;
  //       }

  //       var filtered1 = county1B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered1 != null && filtered1 != "" && filtered1 != undefined) {
  //         var countySingleMed1 = Object.values(filtered1).pop();
  //         if (countySingleMed1 == "") {
  //           countySingleMed1 = 0;
  //         }
  //       } else {
  //         countySingleMed1 = 0;
  //       }

  //       var filtered2 = county2B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered2 != null && filtered2 != "" && filtered2 != undefined) {
  //         var countySingleMed2 = Object.values(filtered2).pop();
  //         if (countySingleMed2 == "") {
  //           countySingleMed2 = 0;
  //         }
  //       } else {
  //         countySingleMed2 = 0;
  //       }

  //       var filtered3 = county3B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered3 != null && filtered3 != "" && filtered3 != undefined) {
  //         var countySingleMed3 = Object.values(filtered3).pop();
  //         if (countySingleMed3 == "") {
  //           countySingleMed3 = 0;
  //         }
  //       } else {
  //         countySingleMed3 = 0;
  //       }

  //       var filtered4 = county4B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered4 != null && filtered4 != "" && filtered4 != undefined) {
  //         var countySingleMed4 = Object.values(filtered4).pop();
  //         if (countySingleMed4 == "") {
  //           countySingleMed4 = 0;
  //         }
  //       } else {
  //         countySingleMed4 = 0;
  //       }

  //       var filtered5 = county5B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered5 != null && filtered5 != "" && filtered5 != undefined) {
  //         var countySingleMed5 = Object.values(filtered5).pop();
  //         if (countySingleMed5 == "") {
  //           countySingleMed5 = 0;
  //         }
  //       } else {
  //         countySingleMed5 = 0;
  //       }

  //       var filtered6 = countyAH.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered6 != null && filtered6 != "" && filtered6 != undefined) {
  //         var countySingleMed6 = Object.values(filtered6).pop();
  //         if (countySingleMed6 == "") {
  //           countySingleMed6 = 0;
  //         }
  //       } else {
  //         countySingleMed6 = 0;
  //       }
  //       var filtered7 = countyCo.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered7 != null && filtered7 != "" && filtered7 != undefined) {
  //         var countySingleMed7 = Object.values(filtered7).pop();
  //         if (countySingleMed7 == "") {
  //           countySingleMed7 = 0;
  //         }
  //       } else {
  //         countySingleMed7 = 0;
  //       }

  //       let filiteredZip = associations.filter(
  //         (zip) => county.name == zip.county
  //       );

  //       let zipFilter = filiteredZip.map((zip, zipIndex) => {
  //         let zipSort = zipData.features.filter(
  //           (zp) => zp.properties.zip == zip.zipcode
  //         );
  //         // console.log(zipSort)

  //         var filteredzip = zipSF.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         // console.log(zipSF.filter(zip1 => zip1.RegionName== zip.zipcode)[0], 'this is filtedezip')
  //         if (filteredzip) {
  //           var zipSingleMed = Object.values(filteredzip).pop();
  //           if (zipSingleMed == "") {
  //             zipSingleMed = 0;
  //           }
  //         } else {
  //           zipSingleMed = 0;
  //         }

  //         var filteredzip1 = zip1B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip1) {
  //           var zipSingleMed1 = Object.values(filteredzip1).pop();
  //           if (zipSingleMed1 == "") {
  //             zipSingleMed1 = 0;
  //           }
  //         } else {
  //           zipSingleMed1 = 0;
  //         }

  //         var filteredzip2 = zip2B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip2) {
  //           var zipSingleMed2 = Object.values(filteredzip2).pop();
  //           if (zipSingleMed2 == "") {
  //             zipSingleMed2 = 0;
  //           }
  //         } else {
  //           zipSingleMed2 = 0;
  //         }

  //         var filteredzip3 = zip3B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip3) {
  //           var zipSingleMed3 = Object.values(filteredzip3).pop();
  //           if (zipSingleMed3 == "") {
  //             zipSingleMed3 = 0;
  //           }
  //         } else {
  //           zipSingleMed3 = 0;
  //         }

  //         var filteredzip4 = zip4B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip4) {
  //           var zipSingleMed4 = Object.values(filteredzip4).pop();
  //           if (zipSingleMed4 == "") {
  //             zipSingleMed4 = 0;
  //           }
  //         } else {
  //           zipSingleMed4 = 0;
  //         }

  //         var filteredzip5 = zip5B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip5) {
  //           var zipSingleMed5 = Object.values(filteredzip5).pop();
  //           if (zipSingleMed5 == "") {
  //             zipSingleMed5 = 0;
  //           }
  //         } else {
  //           zipSingleMed5 = 0;
  //         }

  //         var filteredzip6 = zipAH.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip6) {
  //           var zipSingleMed6 = Object.values(filteredzip6).pop();
  //           if (zipSingleMed6 == "") {
  //             zipSingleMed6 = 0;
  //           }
  //         } else {
  //           zipSingleMed6 = 0;
  //         }
  //         var filteredzip7 = zipCo.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip7) {
  //           var zipSingleMed7 = Object.values(filteredzip7).pop();
  //           if (zipSingleMed7 == "") {
  //             zipSingleMed7 = 0;
  //           }
  //         } else {
  //           zipSingleMed7 = 0;
  //         }

  //         //  console.log(zipSingleMed)
  //         return {
  //           zip: zip.zipcode,
  //           singleHMed: zipSingleMed,
  //           oneBedMed: zipSingleMed1,
  //           twoBedMed: zipSingleMed2,
  //           threeBedMed: zipSingleMed3,
  //           fourBedMed: zipSingleMed4,
  //           fiveBedMed: zipSingleMed5,
  //           aHBedMed: zipSingleMed6,
  //           coopMed: zipSingleMed7,
  //           features: zipSort,
  //         };
  //       });

  //       return {
  //         county: county.name,
  //         singleHMed: countySingleMed,
  //         oneBedMed: countySingleMed1,
  //         twoBedMed: countySingleMed2,
  //         threeBedMed: countySingleMed3,
  //         fourBedMed: countySingleMed4,
  //         fiveBedMed: countySingleMed5,
  //         aHBedMed: countySingleMed6,
  //         coopMed: countySingleMed7,
  //         features: sorted,
  //         zips: zipFilter,
  //       };
  //     });

  //     console.log(home.properties.postal, home.properties.label_en);

  //     return State.create(
  //       {
  //         stateName: home.properties.label_en,
  //         state: home.properties.postal,
  //         singleHMed: stateSingleMed,
  //         oneBedMed: stateSingleMed1,
  //         twoBedMed: stateSingleMed2,
  //         threeBedMed: stateSingleMed3,
  //         fourBedMed: stateSingleMed4,
  //         fiveBedMed: stateSingleMed5,
  //         aHBedMed: stateSingleMed6,
  //         coopMed: stateSingleMed7,
  //         features: home,
  //         counties: filiteredStuff,
  //       },
  //       {
  //         include: [
  //           {
  //             association: manyCounty,
  //             include: [Zip],
  //           },
  //         ],
  //       }
  //     );
  //   })
  // );

  // await Promise.all(
  //   statesData6.features.map((home, index) => {
  //     var filtered = stateSinglePriceMed.filter(
  //       (state) => state.StateName == home.properties.postal
  //     )[0];
  //     if (filtered != null) {
  //       var stateSingleMed = Object.values(filtered).pop();
  //       var stateSingleMed1 = Object.values(
  //         state1B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed2 = Object.values(
  //         state2B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed3 = Object.values(
  //         state3B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed4 = Object.values(
  //         state4B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed5 = Object.values(
  //         state5B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed6 = Object.values(
  //         stateAH.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed7 = Object.values(
  //         stateCo.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //     } else {
  //       stateSingleMed = 0;
  //       stateSingleMed1 = 0;
  //       stateSingleMed2 = 0;
  //       stateSingleMed3 = 0;
  //       stateSingleMed4 = 0;
  //       stateSingleMed5 = 0;
  //       stateSingleMed6 = 0;
  //       stateSingleMed7 = 0;
  //     }

  //     let filiteredCounty = countyAss.filter(
  //       (county, index) => home.properties.postal == county.state
  //     );
  //     // console.log(filiteredCounty)

  //     let filiteredStuff = filiteredCounty.map((county, countyIndex) => {
  //       let sorted = countyData.features.filter(
  //         (cnty) => cnty.properties.fips == county.fips
  //       );

  //       //  console.log(filtered)
  //       var filtered = countySF.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered != null && filtered != "" && filtered != undefined) {
  //         var countySingleMed = Object.values(filtered).pop();
  //         if (countySingleMed == "") {
  //           countySingleMed = 0;
  //         }
  //       } else {
  //         countySingleMed = 0;
  //       }

  //       var filtered1 = county1B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered1 != null && filtered1 != "" && filtered1 != undefined) {
  //         var countySingleMed1 = Object.values(filtered1).pop();
  //         if (countySingleMed1 == "") {
  //           countySingleMed1 = 0;
  //         }
  //       } else {
  //         countySingleMed1 = 0;
  //       }

  //       var filtered2 = county2B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered2 != null && filtered2 != "" && filtered2 != undefined) {
  //         var countySingleMed2 = Object.values(filtered2).pop();
  //         if (countySingleMed2 == "") {
  //           countySingleMed2 = 0;
  //         }
  //       } else {
  //         countySingleMed2 = 0;
  //       }

  //       var filtered3 = county3B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered3 != null && filtered3 != "" && filtered3 != undefined) {
  //         var countySingleMed3 = Object.values(filtered3).pop();
  //         if (countySingleMed3 == "") {
  //           countySingleMed3 = 0;
  //         }
  //       } else {
  //         countySingleMed3 = 0;
  //       }

  //       var filtered4 = county4B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered4 != null && filtered4 != "" && filtered4 != undefined) {
  //         var countySingleMed4 = Object.values(filtered4).pop();
  //         if (countySingleMed4 == "") {
  //           countySingleMed4 = 0;
  //         }
  //       } else {
  //         countySingleMed4 = 0;
  //       }

  //       var filtered5 = county5B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered5 != null && filtered5 != "" && filtered5 != undefined) {
  //         var countySingleMed5 = Object.values(filtered5).pop();
  //         if (countySingleMed5 == "") {
  //           countySingleMed5 = 0;
  //         }
  //       } else {
  //         countySingleMed5 = 0;
  //       }

  //       var filtered6 = countyAH.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered6 != null && filtered6 != "" && filtered6 != undefined) {
  //         var countySingleMed6 = Object.values(filtered6).pop();
  //         if (countySingleMed6 == "") {
  //           countySingleMed6 = 0;
  //         }
  //       } else {
  //         countySingleMed6 = 0;
  //       }
  //       var filtered7 = countyCo.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered7 != null && filtered7 != "" && filtered7 != undefined) {
  //         var countySingleMed7 = Object.values(filtered7).pop();
  //         if (countySingleMed7 == "") {
  //           countySingleMed7 = 0;
  //         }
  //       } else {
  //         countySingleMed7 = 0;
  //       }

  //       let filiteredZip = associations.filter(
  //         (zip) => county.name == zip.county
  //       );

  //       let zipFilter = filiteredZip.map((zip, zipIndex) => {
  //         let zipSort = zipData.features.filter(
  //           (zp) => zp.properties.zip == zip.zipcode
  //         );
  //         // console.log(zipSort)

  //         var filteredzip = zipSF.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         // console.log(zipSF.filter(zip1 => zip1.RegionName== zip.zipcode)[0], 'this is filtedezip')
  //         if (filteredzip) {
  //           var zipSingleMed = Object.values(filteredzip).pop();
  //           if (zipSingleMed == "") {
  //             zipSingleMed = 0;
  //           }
  //         } else {
  //           zipSingleMed = 0;
  //         }

  //         var filteredzip1 = zip1B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip1) {
  //           var zipSingleMed1 = Object.values(filteredzip1).pop();
  //           if (zipSingleMed1 == "") {
  //             zipSingleMed1 = 0;
  //           }
  //         } else {
  //           zipSingleMed1 = 0;
  //         }

  //         var filteredzip2 = zip2B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip2) {
  //           var zipSingleMed2 = Object.values(filteredzip2).pop();
  //           if (zipSingleMed2 == "") {
  //             zipSingleMed2 = 0;
  //           }
  //         } else {
  //           zipSingleMed2 = 0;
  //         }

  //         var filteredzip3 = zip3B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip3) {
  //           var zipSingleMed3 = Object.values(filteredzip3).pop();
  //           if (zipSingleMed3 == "") {
  //             zipSingleMed3 = 0;
  //           }
  //         } else {
  //           zipSingleMed3 = 0;
  //         }

  //         var filteredzip4 = zip4B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip4) {
  //           var zipSingleMed4 = Object.values(filteredzip4).pop();
  //           if (zipSingleMed4 == "") {
  //             zipSingleMed4 = 0;
  //           }
  //         } else {
  //           zipSingleMed4 = 0;
  //         }

  //         var filteredzip5 = zip5B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip5) {
  //           var zipSingleMed5 = Object.values(filteredzip5).pop();
  //           if (zipSingleMed5 == "") {
  //             zipSingleMed5 = 0;
  //           }
  //         } else {
  //           zipSingleMed5 = 0;
  //         }

  //         var filteredzip6 = zipAH.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip6) {
  //           var zipSingleMed6 = Object.values(filteredzip6).pop();
  //           if (zipSingleMed6 == "") {
  //             zipSingleMed6 = 0;
  //           }
  //         } else {
  //           zipSingleMed6 = 0;
  //         }
  //         var filteredzip7 = zipCo.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip7) {
  //           var zipSingleMed7 = Object.values(filteredzip7).pop();
  //           if (zipSingleMed7 == "") {
  //             zipSingleMed7 = 0;
  //           }
  //         } else {
  //           zipSingleMed7 = 0;
  //         }

  //         //  console.log(zipSingleMed)
  //         return {
  //           zip: zip.zipcode,
  //           singleHMed: zipSingleMed,
  //           oneBedMed: zipSingleMed1,
  //           twoBedMed: zipSingleMed2,
  //           threeBedMed: zipSingleMed3,
  //           fourBedMed: zipSingleMed4,
  //           fiveBedMed: zipSingleMed5,
  //           aHBedMed: zipSingleMed6,
  //           coopMed: zipSingleMed7,
  //           features: zipSort,
  //         };
  //       });

  //       return {
  //         county: county.name,
  //         singleHMed: countySingleMed,
  //         oneBedMed: countySingleMed1,
  //         twoBedMed: countySingleMed2,
  //         threeBedMed: countySingleMed3,
  //         fourBedMed: countySingleMed4,
  //         fiveBedMed: countySingleMed5,
  //         aHBedMed: countySingleMed6,
  //         coopMed: countySingleMed7,
  //         features: sorted,
  //         zips: zipFilter,
  //       };
  //     });

  //     console.log(home.properties.postal, home.properties.label_en);

  //     return State.create(
  //       {
  //         stateName: home.properties.label_en,
  //         state: home.properties.postal,
  //         singleHMed: stateSingleMed,
  //         oneBedMed: stateSingleMed1,
  //         twoBedMed: stateSingleMed2,
  //         threeBedMed: stateSingleMed3,
  //         fourBedMed: stateSingleMed4,
  //         fiveBedMed: stateSingleMed5,
  //         aHBedMed: stateSingleMed6,
  //         coopMed: stateSingleMed7,
  //         features: home,
  //         counties: filiteredStuff,
  //       },
  //       {
  //         include: [
  //           {
  //             association: manyCounty,
  //             include: [Zip],
  //           },
  //         ],
  //       }
  //     );
  //   })
  // );

  // await Promise.all(
  //   statesData7.features.map((home, index) => {
  //     var filtered = stateSinglePriceMed.filter(
  //       (state) => state.StateName == home.properties.postal
  //     )[0];
  //     if (filtered != null) {
  //       var stateSingleMed = Object.values(filtered).pop();
  //       var stateSingleMed1 = Object.values(
  //         state1B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed2 = Object.values(
  //         state2B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed3 = Object.values(
  //         state3B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed4 = Object.values(
  //         state4B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed5 = Object.values(
  //         state5B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed6 = Object.values(
  //         stateAH.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed7 = Object.values(
  //         stateCo.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //     } else {
  //       stateSingleMed = 0;
  //       stateSingleMed1 = 0;
  //       stateSingleMed2 = 0;
  //       stateSingleMed3 = 0;
  //       stateSingleMed4 = 0;
  //       stateSingleMed5 = 0;
  //       stateSingleMed6 = 0;
  //       stateSingleMed7 = 0;
  //     }

  //     let filiteredCounty = countyAss.filter(
  //       (county, index) => home.properties.postal == county.state
  //     );
  //     // console.log(filiteredCounty)

  //     let filiteredStuff = filiteredCounty.map((county, countyIndex) => {
  //       let sorted = countyData.features.filter(
  //         (cnty) => cnty.properties.fips == county.fips
  //       );

  //       //  console.log(filtered)
  //       var filtered = countySF.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered != null && filtered != "" && filtered != undefined) {
  //         var countySingleMed = Object.values(filtered).pop();
  //         if (countySingleMed == "") {
  //           countySingleMed = 0;
  //         }
  //       } else {
  //         countySingleMed = 0;
  //       }

  //       var filtered1 = county1B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered1 != null && filtered1 != "" && filtered1 != undefined) {
  //         var countySingleMed1 = Object.values(filtered1).pop();
  //         if (countySingleMed1 == "") {
  //           countySingleMed1 = 0;
  //         }
  //       } else {
  //         countySingleMed1 = 0;
  //       }

  //       var filtered2 = county2B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered2 != null && filtered2 != "" && filtered2 != undefined) {
  //         var countySingleMed2 = Object.values(filtered2).pop();
  //         if (countySingleMed2 == "") {
  //           countySingleMed2 = 0;
  //         }
  //       } else {
  //         countySingleMed2 = 0;
  //       }

  //       var filtered3 = county3B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered3 != null && filtered3 != "" && filtered3 != undefined) {
  //         var countySingleMed3 = Object.values(filtered3).pop();
  //         if (countySingleMed3 == "") {
  //           countySingleMed3 = 0;
  //         }
  //       } else {
  //         countySingleMed3 = 0;
  //       }

  //       var filtered4 = county4B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered4 != null && filtered4 != "" && filtered4 != undefined) {
  //         var countySingleMed4 = Object.values(filtered4).pop();
  //         if (countySingleMed4 == "") {
  //           countySingleMed4 = 0;
  //         }
  //       } else {
  //         countySingleMed4 = 0;
  //       }

  //       var filtered5 = county5B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered5 != null && filtered5 != "" && filtered5 != undefined) {
  //         var countySingleMed5 = Object.values(filtered5).pop();
  //         if (countySingleMed5 == "") {
  //           countySingleMed5 = 0;
  //         }
  //       } else {
  //         countySingleMed5 = 0;
  //       }

  //       var filtered6 = countyAH.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered6 != null && filtered6 != "" && filtered6 != undefined) {
  //         var countySingleMed6 = Object.values(filtered6).pop();
  //         if (countySingleMed6 == "") {
  //           countySingleMed6 = 0;
  //         }
  //       } else {
  //         countySingleMed6 = 0;
  //       }
  //       var filtered7 = countyCo.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered7 != null && filtered7 != "" && filtered7 != undefined) {
  //         var countySingleMed7 = Object.values(filtered7).pop();
  //         if (countySingleMed7 == "") {
  //           countySingleMed7 = 0;
  //         }
  //       } else {
  //         countySingleMed7 = 0;
  //       }

  //       let filiteredZip = associations.filter(
  //         (zip) => county.name == zip.county
  //       );

  //       let zipFilter = filiteredZip.map((zip, zipIndex) => {
  //         let zipSort = zipData.features.filter(
  //           (zp) => zp.properties.zip == zip.zipcode
  //         );
  //         // console.log(zipSort)

  //         var filteredzip = zipSF.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         // console.log(zipSF.filter(zip1 => zip1.RegionName== zip.zipcode)[0], 'this is filtedezip')
  //         if (filteredzip) {
  //           var zipSingleMed = Object.values(filteredzip).pop();
  //           if (zipSingleMed == "") {
  //             zipSingleMed = 0;
  //           }
  //         } else {
  //           zipSingleMed = 0;
  //         }

  //         var filteredzip1 = zip1B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip1) {
  //           var zipSingleMed1 = Object.values(filteredzip1).pop();
  //           if (zipSingleMed1 == "") {
  //             zipSingleMed1 = 0;
  //           }
  //         } else {
  //           zipSingleMed1 = 0;
  //         }

  //         var filteredzip2 = zip2B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip2) {
  //           var zipSingleMed2 = Object.values(filteredzip2).pop();
  //           if (zipSingleMed2 == "") {
  //             zipSingleMed2 = 0;
  //           }
  //         } else {
  //           zipSingleMed2 = 0;
  //         }

  //         var filteredzip3 = zip3B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip3) {
  //           var zipSingleMed3 = Object.values(filteredzip3).pop();
  //           if (zipSingleMed3 == "") {
  //             zipSingleMed3 = 0;
  //           }
  //         } else {
  //           zipSingleMed3 = 0;
  //         }

  //         var filteredzip4 = zip4B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip4) {
  //           var zipSingleMed4 = Object.values(filteredzip4).pop();
  //           if (zipSingleMed4 == "") {
  //             zipSingleMed4 = 0;
  //           }
  //         } else {
  //           zipSingleMed4 = 0;
  //         }

  //         var filteredzip5 = zip5B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip5) {
  //           var zipSingleMed5 = Object.values(filteredzip5).pop();
  //           if (zipSingleMed5 == "") {
  //             zipSingleMed5 = 0;
  //           }
  //         } else {
  //           zipSingleMed5 = 0;
  //         }

  //         var filteredzip6 = zipAH.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip6) {
  //           var zipSingleMed6 = Object.values(filteredzip6).pop();
  //           if (zipSingleMed6 == "") {
  //             zipSingleMed6 = 0;
  //           }
  //         } else {
  //           zipSingleMed6 = 0;
  //         }
  //         var filteredzip7 = zipCo.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip7) {
  //           var zipSingleMed7 = Object.values(filteredzip7).pop();
  //           if (zipSingleMed7 == "") {
  //             zipSingleMed7 = 0;
  //           }
  //         } else {
  //           zipSingleMed7 = 0;
  //         }

  //         //  console.log(zipSingleMed)
  //         return {
  //           zip: zip.zipcode,
  //           singleHMed: zipSingleMed,
  //           oneBedMed: zipSingleMed1,
  //           twoBedMed: zipSingleMed2,
  //           threeBedMed: zipSingleMed3,
  //           fourBedMed: zipSingleMed4,
  //           fiveBedMed: zipSingleMed5,
  //           aHBedMed: zipSingleMed6,
  //           coopMed: zipSingleMed7,
  //           features: zipSort,
  //         };
  //       });

  //       return {
  //         county: county.name,
  //         singleHMed: countySingleMed,
  //         oneBedMed: countySingleMed1,
  //         twoBedMed: countySingleMed2,
  //         threeBedMed: countySingleMed3,
  //         fourBedMed: countySingleMed4,
  //         fiveBedMed: countySingleMed5,
  //         aHBedMed: countySingleMed6,
  //         coopMed: countySingleMed7,
  //         features: sorted,
  //         zips: zipFilter,
  //       };
  //     });

  //     console.log(home.properties.postal, home.properties.label_en);

  //     return State.create(
  //       {
  //         stateName: home.properties.label_en,
  //         state: home.properties.postal,
  //         singleHMed: stateSingleMed,
  //         oneBedMed: stateSingleMed1,
  //         twoBedMed: stateSingleMed2,
  //         threeBedMed: stateSingleMed3,
  //         fourBedMed: stateSingleMed4,
  //         fiveBedMed: stateSingleMed5,
  //         aHBedMed: stateSingleMed6,
  //         coopMed: stateSingleMed7,
  //         features: home,
  //         counties: filiteredStuff,
  //       },
  //       {
  //         include: [
  //           {
  //             association: manyCounty,
  //             include: [Zip],
  //           },
  //         ],
  //       }
  //     );
  //   })
  // );

  // await Promise.all(
  //   statesData8.features.map((home, index) => {
  //     var filtered = stateSinglePriceMed.filter(
  //       (state) => state.StateName == home.properties.postal
  //     )[0];
  //     if (filtered != null) {
  //       var stateSingleMed = Object.values(filtered).pop();
  //       var stateSingleMed1 = Object.values(
  //         state1B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed2 = Object.values(
  //         state2B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed3 = Object.values(
  //         state3B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed4 = Object.values(
  //         state4B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed5 = Object.values(
  //         state5B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed6 = Object.values(
  //         stateAH.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed7 = Object.values(
  //         stateCo.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //     } else {
  //       stateSingleMed = 0;
  //       stateSingleMed1 = 0;
  //       stateSingleMed2 = 0;
  //       stateSingleMed3 = 0;
  //       stateSingleMed4 = 0;
  //       stateSingleMed5 = 0;
  //       stateSingleMed6 = 0;
  //       stateSingleMed7 = 0;
  //     }

  //     let filiteredCounty = countyAss.filter(
  //       (county, index) => home.properties.postal == county.state
  //     );
  //     // console.log(filiteredCounty)

  //     let filiteredStuff = filiteredCounty.map((county, countyIndex) => {
  //       let sorted = countyData.features.filter(
  //         (cnty) => cnty.properties.fips == county.fips
  //       );

  //       //  console.log(filtered)
  //       var filtered = countySF.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered != null && filtered != "" && filtered != undefined) {
  //         var countySingleMed = Object.values(filtered).pop();
  //         if (countySingleMed == "") {
  //           countySingleMed = 0;
  //         }
  //       } else {
  //         countySingleMed = 0;
  //       }

  //       var filtered1 = county1B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered1 != null && filtered1 != "" && filtered1 != undefined) {
  //         var countySingleMed1 = Object.values(filtered1).pop();
  //         if (countySingleMed1 == "") {
  //           countySingleMed1 = 0;
  //         }
  //       } else {
  //         countySingleMed1 = 0;
  //       }

  //       var filtered2 = county2B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered2 != null && filtered2 != "" && filtered2 != undefined) {
  //         var countySingleMed2 = Object.values(filtered2).pop();
  //         if (countySingleMed2 == "") {
  //           countySingleMed2 = 0;
  //         }
  //       } else {
  //         countySingleMed2 = 0;
  //       }

  //       var filtered3 = county3B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered3 != null && filtered3 != "" && filtered3 != undefined) {
  //         var countySingleMed3 = Object.values(filtered3).pop();
  //         if (countySingleMed3 == "") {
  //           countySingleMed3 = 0;
  //         }
  //       } else {
  //         countySingleMed3 = 0;
  //       }

  //       var filtered4 = county4B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered4 != null && filtered4 != "" && filtered4 != undefined) {
  //         var countySingleMed4 = Object.values(filtered4).pop();
  //         if (countySingleMed4 == "") {
  //           countySingleMed4 = 0;
  //         }
  //       } else {
  //         countySingleMed4 = 0;
  //       }

  //       var filtered5 = county5B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered5 != null && filtered5 != "" && filtered5 != undefined) {
  //         var countySingleMed5 = Object.values(filtered5).pop();
  //         if (countySingleMed5 == "") {
  //           countySingleMed5 = 0;
  //         }
  //       } else {
  //         countySingleMed5 = 0;
  //       }

  //       var filtered6 = countyAH.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered6 != null && filtered6 != "" && filtered6 != undefined) {
  //         var countySingleMed6 = Object.values(filtered6).pop();
  //         if (countySingleMed6 == "") {
  //           countySingleMed6 = 0;
  //         }
  //       } else {
  //         countySingleMed6 = 0;
  //       }
  //       var filtered7 = countyCo.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered7 != null && filtered7 != "" && filtered7 != undefined) {
  //         var countySingleMed7 = Object.values(filtered7).pop();
  //         if (countySingleMed7 == "") {
  //           countySingleMed7 = 0;
  //         }
  //       } else {
  //         countySingleMed7 = 0;
  //       }

  //       let filiteredZip = associations.filter(
  //         (zip) => county.name == zip.county
  //       );

  //       let zipFilter = filiteredZip.map((zip, zipIndex) => {
  //         let zipSort = zipData.features.filter(
  //           (zp) => zp.properties.zip == zip.zipcode
  //         );
  //         // console.log(zipSort)

  //         var filteredzip = zipSF.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         // console.log(zipSF.filter(zip1 => zip1.RegionName== zip.zipcode)[0], 'this is filtedezip')
  //         if (filteredzip) {
  //           var zipSingleMed = Object.values(filteredzip).pop();
  //           if (zipSingleMed == "") {
  //             zipSingleMed = 0;
  //           }
  //         } else {
  //           zipSingleMed = 0;
  //         }

  //         var filteredzip1 = zip1B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip1) {
  //           var zipSingleMed1 = Object.values(filteredzip1).pop();
  //           if (zipSingleMed1 == "") {
  //             zipSingleMed1 = 0;
  //           }
  //         } else {
  //           zipSingleMed1 = 0;
  //         }

  //         var filteredzip2 = zip2B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip2) {
  //           var zipSingleMed2 = Object.values(filteredzip2).pop();
  //           if (zipSingleMed2 == "") {
  //             zipSingleMed2 = 0;
  //           }
  //         } else {
  //           zipSingleMed2 = 0;
  //         }

  //         var filteredzip3 = zip3B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip3) {
  //           var zipSingleMed3 = Object.values(filteredzip3).pop();
  //           if (zipSingleMed3 == "") {
  //             zipSingleMed3 = 0;
  //           }
  //         } else {
  //           zipSingleMed3 = 0;
  //         }

  //         var filteredzip4 = zip4B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip4) {
  //           var zipSingleMed4 = Object.values(filteredzip4).pop();
  //           if (zipSingleMed4 == "") {
  //             zipSingleMed4 = 0;
  //           }
  //         } else {
  //           zipSingleMed4 = 0;
  //         }

  //         var filteredzip5 = zip5B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip5) {
  //           var zipSingleMed5 = Object.values(filteredzip5).pop();
  //           if (zipSingleMed5 == "") {
  //             zipSingleMed5 = 0;
  //           }
  //         } else {
  //           zipSingleMed5 = 0;
  //         }

  //         var filteredzip6 = zipAH.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip6) {
  //           var zipSingleMed6 = Object.values(filteredzip6).pop();
  //           if (zipSingleMed6 == "") {
  //             zipSingleMed6 = 0;
  //           }
  //         } else {
  //           zipSingleMed6 = 0;
  //         }
  //         var filteredzip7 = zipCo.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip7) {
  //           var zipSingleMed7 = Object.values(filteredzip7).pop();
  //           if (zipSingleMed7 == "") {
  //             zipSingleMed7 = 0;
  //           }
  //         } else {
  //           zipSingleMed7 = 0;
  //         }

  //         //  console.log(zipSingleMed)
  //         return {
  //           zip: zip.zipcode,
  //           singleHMed: zipSingleMed,
  //           oneBedMed: zipSingleMed1,
  //           twoBedMed: zipSingleMed2,
  //           threeBedMed: zipSingleMed3,
  //           fourBedMed: zipSingleMed4,
  //           fiveBedMed: zipSingleMed5,
  //           aHBedMed: zipSingleMed6,
  //           coopMed: zipSingleMed7,
  //           features: zipSort,
  //         };
  //       });

  //       return {
  //         county: county.name,
  //         singleHMed: countySingleMed,
  //         oneBedMed: countySingleMed1,
  //         twoBedMed: countySingleMed2,
  //         threeBedMed: countySingleMed3,
  //         fourBedMed: countySingleMed4,
  //         fiveBedMed: countySingleMed5,
  //         aHBedMed: countySingleMed6,
  //         coopMed: countySingleMed7,
  //         features: sorted,
  //         zips: zipFilter,
  //       };
  //     });

  //     console.log(home.properties.postal, home.properties.label_en);

  //     return State.create(
  //       {
  //         stateName: home.properties.label_en,
  //         state: home.properties.postal,
  //         singleHMed: stateSingleMed,
  //         oneBedMed: stateSingleMed1,
  //         twoBedMed: stateSingleMed2,
  //         threeBedMed: stateSingleMed3,
  //         fourBedMed: stateSingleMed4,
  //         fiveBedMed: stateSingleMed5,
  //         aHBedMed: stateSingleMed6,
  //         coopMed: stateSingleMed7,
  //         features: home,
  //         counties: filiteredStuff,
  //       },
  //       {
  //         include: [
  //           {
  //             association: manyCounty,
  //             include: [Zip],
  //           },
  //         ],
  //       }
  //     );
  //   })
  // );

  // await Promise.all(
  //   statesData9.features.map((home, index) => {
  //     var filtered = stateSinglePriceMed.filter(
  //       (state) => state.StateName == home.properties.postal
  //     )[0];
  //     if (filtered != null) {
  //       var stateSingleMed = Object.values(filtered).pop();
  //       var stateSingleMed1 = Object.values(
  //         state1B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed2 = Object.values(
  //         state2B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed3 = Object.values(
  //         state3B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed4 = Object.values(
  //         state4B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed5 = Object.values(
  //         state5B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed6 = Object.values(
  //         stateAH.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed7 = Object.values(
  //         stateCo.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //     } else {
  //       stateSingleMed = 0;
  //       stateSingleMed1 = 0;
  //       stateSingleMed2 = 0;
  //       stateSingleMed3 = 0;
  //       stateSingleMed4 = 0;
  //       stateSingleMed5 = 0;
  //       stateSingleMed6 = 0;
  //       stateSingleMed7 = 0;
  //     }

  //     let filiteredCounty = countyAss.filter(
  //       (county, index) => home.properties.postal == county.state
  //     );
  //     // console.log(filiteredCounty)

  //     let filiteredStuff = filiteredCounty.map((county, countyIndex) => {
  //       let sorted = countyData.features.filter(
  //         (cnty) => cnty.properties.fips == county.fips
  //       );

  //       //  console.log(filtered)
  //       var filtered = countySF.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered != null && filtered != "" && filtered != undefined) {
  //         var countySingleMed = Object.values(filtered).pop();
  //         if (countySingleMed == "") {
  //           countySingleMed = 0;
  //         }
  //       } else {
  //         countySingleMed = 0;
  //       }

  //       var filtered1 = county1B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered1 != null && filtered1 != "" && filtered1 != undefined) {
  //         var countySingleMed1 = Object.values(filtered1).pop();
  //         if (countySingleMed1 == "") {
  //           countySingleMed1 = 0;
  //         }
  //       } else {
  //         countySingleMed1 = 0;
  //       }

  //       var filtered2 = county2B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered2 != null && filtered2 != "" && filtered2 != undefined) {
  //         var countySingleMed2 = Object.values(filtered2).pop();
  //         if (countySingleMed2 == "") {
  //           countySingleMed2 = 0;
  //         }
  //       } else {
  //         countySingleMed2 = 0;
  //       }

  //       var filtered3 = county3B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered3 != null && filtered3 != "" && filtered3 != undefined) {
  //         var countySingleMed3 = Object.values(filtered3).pop();
  //         if (countySingleMed3 == "") {
  //           countySingleMed3 = 0;
  //         }
  //       } else {
  //         countySingleMed3 = 0;
  //       }

  //       var filtered4 = county4B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered4 != null && filtered4 != "" && filtered4 != undefined) {
  //         var countySingleMed4 = Object.values(filtered4).pop();
  //         if (countySingleMed4 == "") {
  //           countySingleMed4 = 0;
  //         }
  //       } else {
  //         countySingleMed4 = 0;
  //       }

  //       var filtered5 = county5B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered5 != null && filtered5 != "" && filtered5 != undefined) {
  //         var countySingleMed5 = Object.values(filtered5).pop();
  //         if (countySingleMed5 == "") {
  //           countySingleMed5 = 0;
  //         }
  //       } else {
  //         countySingleMed5 = 0;
  //       }

  //       var filtered6 = countyAH.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered6 != null && filtered6 != "" && filtered6 != undefined) {
  //         var countySingleMed6 = Object.values(filtered6).pop();
  //         if (countySingleMed6 == "") {
  //           countySingleMed6 = 0;
  //         }
  //       } else {
  //         countySingleMed6 = 0;
  //       }
  //       var filtered7 = countyCo.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered7 != null && filtered7 != "" && filtered7 != undefined) {
  //         var countySingleMed7 = Object.values(filtered7).pop();
  //         if (countySingleMed7 == "") {
  //           countySingleMed7 = 0;
  //         }
  //       } else {
  //         countySingleMed7 = 0;
  //       }

  //       let filiteredZip = associations.filter(
  //         (zip) => county.name == zip.county
  //       );

  //       let zipFilter = filiteredZip.map((zip, zipIndex) => {
  //         let zipSort = zipData.features.filter(
  //           (zp) => zp.properties.zip == zip.zipcode
  //         );
  //         // console.log(zipSort)

  //         var filteredzip = zipSF.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         // console.log(zipSF.filter(zip1 => zip1.RegionName== zip.zipcode)[0], 'this is filtedezip')
  //         if (filteredzip) {
  //           var zipSingleMed = Object.values(filteredzip).pop();
  //           if (zipSingleMed == "") {
  //             zipSingleMed = 0;
  //           }
  //         } else {
  //           zipSingleMed = 0;
  //         }

  //         var filteredzip1 = zip1B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip1) {
  //           var zipSingleMed1 = Object.values(filteredzip1).pop();
  //           if (zipSingleMed1 == "") {
  //             zipSingleMed1 = 0;
  //           }
  //         } else {
  //           zipSingleMed1 = 0;
  //         }

  //         var filteredzip2 = zip2B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip2) {
  //           var zipSingleMed2 = Object.values(filteredzip2).pop();
  //           if (zipSingleMed2 == "") {
  //             zipSingleMed2 = 0;
  //           }
  //         } else {
  //           zipSingleMed2 = 0;
  //         }

  //         var filteredzip3 = zip3B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip3) {
  //           var zipSingleMed3 = Object.values(filteredzip3).pop();
  //           if (zipSingleMed3 == "") {
  //             zipSingleMed3 = 0;
  //           }
  //         } else {
  //           zipSingleMed3 = 0;
  //         }

  //         var filteredzip4 = zip4B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip4) {
  //           var zipSingleMed4 = Object.values(filteredzip4).pop();
  //           if (zipSingleMed4 == "") {
  //             zipSingleMed4 = 0;
  //           }
  //         } else {
  //           zipSingleMed4 = 0;
  //         }

  //         var filteredzip5 = zip5B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip5) {
  //           var zipSingleMed5 = Object.values(filteredzip5).pop();
  //           if (zipSingleMed5 == "") {
  //             zipSingleMed5 = 0;
  //           }
  //         } else {
  //           zipSingleMed5 = 0;
  //         }

  //         var filteredzip6 = zipAH.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip6) {
  //           var zipSingleMed6 = Object.values(filteredzip6).pop();
  //           if (zipSingleMed6 == "") {
  //             zipSingleMed6 = 0;
  //           }
  //         } else {
  //           zipSingleMed6 = 0;
  //         }
  //         var filteredzip7 = zipCo.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip7) {
  //           var zipSingleMed7 = Object.values(filteredzip7).pop();
  //           if (zipSingleMed7 == "") {
  //             zipSingleMed7 = 0;
  //           }
  //         } else {
  //           zipSingleMed7 = 0;
  //         }

  //         //  console.log(zipSingleMed)
  //         return {
  //           zip: zip.zipcode,
  //           singleHMed: zipSingleMed,
  //           oneBedMed: zipSingleMed1,
  //           twoBedMed: zipSingleMed2,
  //           threeBedMed: zipSingleMed3,
  //           fourBedMed: zipSingleMed4,
  //           fiveBedMed: zipSingleMed5,
  //           aHBedMed: zipSingleMed6,
  //           coopMed: zipSingleMed7,
  //           features: zipSort,
  //         };
  //       });

  //       return {
  //         county: county.name,
  //         singleHMed: countySingleMed,
  //         oneBedMed: countySingleMed1,
  //         twoBedMed: countySingleMed2,
  //         threeBedMed: countySingleMed3,
  //         fourBedMed: countySingleMed4,
  //         fiveBedMed: countySingleMed5,
  //         aHBedMed: countySingleMed6,
  //         coopMed: countySingleMed7,
  //         features: sorted,
  //         zips: zipFilter,
  //       };
  //     });

  //     console.log(home.properties.postal, home.properties.label_en);

  //     return State.create(
  //       {
  //         stateName: home.properties.label_en,
  //         state: home.properties.postal,
  //         singleHMed: stateSingleMed,
  //         oneBedMed: stateSingleMed1,
  //         twoBedMed: stateSingleMed2,
  //         threeBedMed: stateSingleMed3,
  //         fourBedMed: stateSingleMed4,
  //         fiveBedMed: stateSingleMed5,
  //         aHBedMed: stateSingleMed6,
  //         coopMed: stateSingleMed7,
  //         features: home,
  //         counties: filiteredStuff,
  //       },
  //       {
  //         include: [
  //           {
  //             association: manyCounty,
  //             include: [Zip],
  //           },
  //         ],
  //       }
  //     );
  //   })
  // );

  // await Promise.all(
  //   statesData10.features.map((home, index) => {
  //     var filtered = stateSinglePriceMed.filter(
  //       (state) => state.StateName == home.properties.postal
  //     )[0];
  //     if (filtered != null) {
  //       var stateSingleMed = Object.values(filtered).pop();
  //       var stateSingleMed1 = Object.values(
  //         state1B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed2 = Object.values(
  //         state2B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed3 = Object.values(
  //         state3B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed4 = Object.values(
  //         state4B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed5 = Object.values(
  //         state5B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed6 = Object.values(
  //         stateAH.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed7 = Object.values(
  //         stateCo.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //     } else {
  //       stateSingleMed = 0;
  //       stateSingleMed1 = 0;
  //       stateSingleMed2 = 0;
  //       stateSingleMed3 = 0;
  //       stateSingleMed4 = 0;
  //       stateSingleMed5 = 0;
  //       stateSingleMed6 = 0;
  //       stateSingleMed7 = 0;
  //     }

  //     let filiteredCounty = countyAss.filter(
  //       (county, index) => home.properties.postal == county.state
  //     );
  //     // console.log(filiteredCounty)

  //     let filiteredStuff = filiteredCounty.map((county, countyIndex) => {
  //       let sorted = countyData.features.filter(
  //         (cnty) => cnty.properties.fips == county.fips
  //       );

  //       //  console.log(filtered)
  //       var filtered = countySF.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered != null && filtered != "" && filtered != undefined) {
  //         var countySingleMed = Object.values(filtered).pop();
  //         if (countySingleMed == "") {
  //           countySingleMed = 0;
  //         }
  //       } else {
  //         countySingleMed = 0;
  //       }

  //       var filtered1 = county1B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered1 != null && filtered1 != "" && filtered1 != undefined) {
  //         var countySingleMed1 = Object.values(filtered1).pop();
  //         if (countySingleMed1 == "") {
  //           countySingleMed1 = 0;
  //         }
  //       } else {
  //         countySingleMed1 = 0;
  //       }

  //       var filtered2 = county2B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered2 != null && filtered2 != "" && filtered2 != undefined) {
  //         var countySingleMed2 = Object.values(filtered2).pop();
  //         if (countySingleMed2 == "") {
  //           countySingleMed2 = 0;
  //         }
  //       } else {
  //         countySingleMed2 = 0;
  //       }

  //       var filtered3 = county3B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered3 != null && filtered3 != "" && filtered3 != undefined) {
  //         var countySingleMed3 = Object.values(filtered3).pop();
  //         if (countySingleMed3 == "") {
  //           countySingleMed3 = 0;
  //         }
  //       } else {
  //         countySingleMed3 = 0;
  //       }

  //       var filtered4 = county4B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered4 != null && filtered4 != "" && filtered4 != undefined) {
  //         var countySingleMed4 = Object.values(filtered4).pop();
  //         if (countySingleMed4 == "") {
  //           countySingleMed4 = 0;
  //         }
  //       } else {
  //         countySingleMed4 = 0;
  //       }

  //       var filtered5 = county5B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered5 != null && filtered5 != "" && filtered5 != undefined) {
  //         var countySingleMed5 = Object.values(filtered5).pop();
  //         if (countySingleMed5 == "") {
  //           countySingleMed5 = 0;
  //         }
  //       } else {
  //         countySingleMed5 = 0;
  //       }

  //       var filtered6 = countyAH.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered6 != null && filtered6 != "" && filtered6 != undefined) {
  //         var countySingleMed6 = Object.values(filtered6).pop();
  //         if (countySingleMed6 == "") {
  //           countySingleMed6 = 0;
  //         }
  //       } else {
  //         countySingleMed6 = 0;
  //       }
  //       var filtered7 = countyCo.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered7 != null && filtered7 != "" && filtered7 != undefined) {
  //         var countySingleMed7 = Object.values(filtered7).pop();
  //         if (countySingleMed7 == "") {
  //           countySingleMed7 = 0;
  //         }
  //       } else {
  //         countySingleMed7 = 0;
  //       }

  //       let filiteredZip = associations.filter(
  //         (zip) => county.name == zip.county
  //       );

  //       let zipFilter = filiteredZip.map((zip, zipIndex) => {
  //         let zipSort = zipData.features.filter(
  //           (zp) => zp.properties.zip == zip.zipcode
  //         );
  //         // console.log(zipSort)

  //         var filteredzip = zipSF.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         // console.log(zipSF.filter(zip1 => zip1.RegionName== zip.zipcode)[0], 'this is filtedezip')
  //         if (filteredzip) {
  //           var zipSingleMed = Object.values(filteredzip).pop();
  //           if (zipSingleMed == "") {
  //             zipSingleMed = 0;
  //           }
  //         } else {
  //           zipSingleMed = 0;
  //         }

  //         var filteredzip1 = zip1B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip1) {
  //           var zipSingleMed1 = Object.values(filteredzip1).pop();
  //           if (zipSingleMed1 == "") {
  //             zipSingleMed1 = 0;
  //           }
  //         } else {
  //           zipSingleMed1 = 0;
  //         }

  //         var filteredzip2 = zip2B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip2) {
  //           var zipSingleMed2 = Object.values(filteredzip2).pop();
  //           if (zipSingleMed2 == "") {
  //             zipSingleMed2 = 0;
  //           }
  //         } else {
  //           zipSingleMed2 = 0;
  //         }

  //         var filteredzip3 = zip3B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip3) {
  //           var zipSingleMed3 = Object.values(filteredzip3).pop();
  //           if (zipSingleMed3 == "") {
  //             zipSingleMed3 = 0;
  //           }
  //         } else {
  //           zipSingleMed3 = 0;
  //         }

  //         var filteredzip4 = zip4B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip4) {
  //           var zipSingleMed4 = Object.values(filteredzip4).pop();
  //           if (zipSingleMed4 == "") {
  //             zipSingleMed4 = 0;
  //           }
  //         } else {
  //           zipSingleMed4 = 0;
  //         }

  //         var filteredzip5 = zip5B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip5) {
  //           var zipSingleMed5 = Object.values(filteredzip5).pop();
  //           if (zipSingleMed5 == "") {
  //             zipSingleMed5 = 0;
  //           }
  //         } else {
  //           zipSingleMed5 = 0;
  //         }

  //         var filteredzip6 = zipAH.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip6) {
  //           var zipSingleMed6 = Object.values(filteredzip6).pop();
  //           if (zipSingleMed6 == "") {
  //             zipSingleMed6 = 0;
  //           }
  //         } else {
  //           zipSingleMed6 = 0;
  //         }
  //         var filteredzip7 = zipCo.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip7) {
  //           var zipSingleMed7 = Object.values(filteredzip7).pop();
  //           if (zipSingleMed7 == "") {
  //             zipSingleMed7 = 0;
  //           }
  //         } else {
  //           zipSingleMed7 = 0;
  //         }

  //         //  console.log(zipSingleMed)
  //         return {
  //           zip: zip.zipcode,
  //           singleHMed: zipSingleMed,
  //           oneBedMed: zipSingleMed1,
  //           twoBedMed: zipSingleMed2,
  //           threeBedMed: zipSingleMed3,
  //           fourBedMed: zipSingleMed4,
  //           fiveBedMed: zipSingleMed5,
  //           aHBedMed: zipSingleMed6,
  //           coopMed: zipSingleMed7,
  //           features: zipSort,
  //         };
  //       });

  //       return {
  //         county: county.name,
  //         singleHMed: countySingleMed,
  //         oneBedMed: countySingleMed1,
  //         twoBedMed: countySingleMed2,
  //         threeBedMed: countySingleMed3,
  //         fourBedMed: countySingleMed4,
  //         fiveBedMed: countySingleMed5,
  //         aHBedMed: countySingleMed6,
  //         coopMed: countySingleMed7,
  //         features: sorted,
  //         zips: zipFilter,
  //       };
  //     });

  //     console.log(home.properties.postal, home.properties.label_en);

  //     return State.create(
  //       {
  //         stateName: home.properties.label_en,
  //         state: home.properties.postal,
  //         singleHMed: stateSingleMed,
  //         oneBedMed: stateSingleMed1,
  //         twoBedMed: stateSingleMed2,
  //         threeBedMed: stateSingleMed3,
  //         fourBedMed: stateSingleMed4,
  //         fiveBedMed: stateSingleMed5,
  //         aHBedMed: stateSingleMed6,
  //         coopMed: stateSingleMed7,
  //         features: home,
  //         counties: filiteredStuff,
  //       },
  //       {
  //         include: [
  //           {
  //             association: manyCounty,
  //             include: [Zip],
  //           },
  //         ],
  //       }
  //     );
  //   })
  // );

  // await Promise.all(
  //   statesData11.features.map((home, index) => {
  //     var filtered = stateSinglePriceMed.filter(
  //       (state) => state.StateName == home.properties.postal
  //     )[0];
  //     if (filtered != null) {
  //       var stateSingleMed = Object.values(filtered).pop();
  //       var stateSingleMed1 = Object.values(
  //         state1B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed2 = Object.values(
  //         state2B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed3 = Object.values(
  //         state3B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed4 = Object.values(
  //         state4B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed5 = Object.values(
  //         state5B.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed6 = Object.values(
  //         stateAH.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //       var stateSingleMed7 = Object.values(
  //         stateCo.filter(
  //           (state) => state.StateName == home.properties.postal
  //         )[0]
  //       ).pop();
  //     } else {
  //       stateSingleMed = 0;
  //       stateSingleMed1 = 0;
  //       stateSingleMed2 = 0;
  //       stateSingleMed3 = 0;
  //       stateSingleMed4 = 0;
  //       stateSingleMed5 = 0;
  //       stateSingleMed6 = 0;
  //       stateSingleMed7 = 0;
  //     }

  //     let filiteredCounty = countyAss.filter(
  //       (county, index) => home.properties.postal == county.state
  //     );
  //     // console.log(filiteredCounty)

  //     let filiteredStuff = filiteredCounty.map((county, countyIndex) => {
  //       let sorted = countyData.features.filter(
  //         (cnty) => cnty.properties.fips == county.fips
  //       );

  //       //  console.log(filtered)
  //       var filtered = countySF.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered != null && filtered != "" && filtered != undefined) {
  //         var countySingleMed = Object.values(filtered).pop();
  //         if (countySingleMed == "") {
  //           countySingleMed = 0;
  //         }
  //       } else {
  //         countySingleMed = 0;
  //       }

  //       var filtered1 = county1B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered1 != null && filtered1 != "" && filtered1 != undefined) {
  //         var countySingleMed1 = Object.values(filtered1).pop();
  //         if (countySingleMed1 == "") {
  //           countySingleMed1 = 0;
  //         }
  //       } else {
  //         countySingleMed1 = 0;
  //       }

  //       var filtered2 = county2B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered2 != null && filtered2 != "" && filtered2 != undefined) {
  //         var countySingleMed2 = Object.values(filtered2).pop();
  //         if (countySingleMed2 == "") {
  //           countySingleMed2 = 0;
  //         }
  //       } else {
  //         countySingleMed2 = 0;
  //       }

  //       var filtered3 = county3B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered3 != null && filtered3 != "" && filtered3 != undefined) {
  //         var countySingleMed3 = Object.values(filtered3).pop();
  //         if (countySingleMed3 == "") {
  //           countySingleMed3 = 0;
  //         }
  //       } else {
  //         countySingleMed3 = 0;
  //       }

  //       var filtered4 = county4B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered4 != null && filtered4 != "" && filtered4 != undefined) {
  //         var countySingleMed4 = Object.values(filtered4).pop();
  //         if (countySingleMed4 == "") {
  //           countySingleMed4 = 0;
  //         }
  //       } else {
  //         countySingleMed4 = 0;
  //       }

  //       var filtered5 = county5B.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered5 != null && filtered5 != "" && filtered5 != undefined) {
  //         var countySingleMed5 = Object.values(filtered5).pop();
  //         if (countySingleMed5 == "") {
  //           countySingleMed5 = 0;
  //         }
  //       } else {
  //         countySingleMed5 = 0;
  //       }

  //       var filtered6 = countyAH.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered6 != null && filtered6 != "" && filtered6 != undefined) {
  //         var countySingleMed6 = Object.values(filtered6).pop();
  //         if (countySingleMed6 == "") {
  //           countySingleMed6 = 0;
  //         }
  //       } else {
  //         countySingleMed6 = 0;
  //       }
  //       var filtered7 = countyCo.filter(
  //         (county1) => county1.RegionName == county.name
  //       )[0];
  //       if (filtered7 != null && filtered7 != "" && filtered7 != undefined) {
  //         var countySingleMed7 = Object.values(filtered7).pop();
  //         if (countySingleMed7 == "") {
  //           countySingleMed7 = 0;
  //         }
  //       } else {
  //         countySingleMed7 = 0;
  //       }

  //       let filiteredZip = associations.filter(
  //         (zip) => county.name == zip.county
  //       );

  //       let zipFilter = filiteredZip.map((zip, zipIndex) => {
  //         let zipSort = zipData.features.filter(
  //           (zp) => zp.properties.zip == zip.zipcode
  //         );
  //         // console.log(zipSort)

  //         var filteredzip = zipSF.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         // console.log(zipSF.filter(zip1 => zip1.RegionName== zip.zipcode)[0], 'this is filtedezip')
  //         if (filteredzip) {
  //           var zipSingleMed = Object.values(filteredzip).pop();
  //           if (zipSingleMed == "") {
  //             zipSingleMed = 0;
  //           }
  //         } else {
  //           zipSingleMed = 0;
  //         }

  //         var filteredzip1 = zip1B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip1) {
  //           var zipSingleMed1 = Object.values(filteredzip1).pop();
  //           if (zipSingleMed1 == "") {
  //             zipSingleMed1 = 0;
  //           }
  //         } else {
  //           zipSingleMed1 = 0;
  //         }

  //         var filteredzip2 = zip2B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip2) {
  //           var zipSingleMed2 = Object.values(filteredzip2).pop();
  //           if (zipSingleMed2 == "") {
  //             zipSingleMed2 = 0;
  //           }
  //         } else {
  //           zipSingleMed2 = 0;
  //         }

  //         var filteredzip3 = zip3B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip3) {
  //           var zipSingleMed3 = Object.values(filteredzip3).pop();
  //           if (zipSingleMed3 == "") {
  //             zipSingleMed3 = 0;
  //           }
  //         } else {
  //           zipSingleMed3 = 0;
  //         }

  //         var filteredzip4 = zip4B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip4) {
  //           var zipSingleMed4 = Object.values(filteredzip4).pop();
  //           if (zipSingleMed4 == "") {
  //             zipSingleMed4 = 0;
  //           }
  //         } else {
  //           zipSingleMed4 = 0;
  //         }

  //         var filteredzip5 = zip5B.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip5) {
  //           var zipSingleMed5 = Object.values(filteredzip5).pop();
  //           if (zipSingleMed5 == "") {
  //             zipSingleMed5 = 0;
  //           }
  //         } else {
  //           zipSingleMed5 = 0;
  //         }

  //         var filteredzip6 = zipAH.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip6) {
  //           var zipSingleMed6 = Object.values(filteredzip6).pop();
  //           if (zipSingleMed6 == "") {
  //             zipSingleMed6 = 0;
  //           }
  //         } else {
  //           zipSingleMed6 = 0;
  //         }
  //         var filteredzip7 = zipCo.filter(
  //           (zip1) => zip1.RegionName == zip.zipcode
  //         )[0];
  //         if (filteredzip7) {
  //           var zipSingleMed7 = Object.values(filteredzip7).pop();
  //           if (zipSingleMed7 == "") {
  //             zipSingleMed7 = 0;
  //           }
  //         } else {
  //           zipSingleMed7 = 0;
  //         }

  //         //  console.log(zipSingleMed)
  //         return {
  //           zip: zip.zipcode,
  //           singleHMed: zipSingleMed,
  //           oneBedMed: zipSingleMed1,
  //           twoBedMed: zipSingleMed2,
  //           threeBedMed: zipSingleMed3,
  //           fourBedMed: zipSingleMed4,
  //           fiveBedMed: zipSingleMed5,
  //           aHBedMed: zipSingleMed6,
  //           coopMed: zipSingleMed7,
  //           features: zipSort,
  //         };
  //       });

  //       return {
  //         county: county.name,
  //         singleHMed: countySingleMed,
  //         oneBedMed: countySingleMed1,
  //         twoBedMed: countySingleMed2,
  //         threeBedMed: countySingleMed3,
  //         fourBedMed: countySingleMed4,
  //         fiveBedMed: countySingleMed5,
  //         aHBedMed: countySingleMed6,
  //         coopMed: countySingleMed7,
  //         features: sorted,
  //         zips: zipFilter,
  //       };
  //     });

  //     console.log(home.properties.postal, home.properties.label_en);

  //     return State.create(
  //       {
  //         stateName: home.properties.label_en,
  //         state: home.properties.postal,
  //         singleHMed: stateSingleMed,
  //         oneBedMed: stateSingleMed1,
  //         twoBedMed: stateSingleMed2,
  //         threeBedMed: stateSingleMed3,
  //         fourBedMed: stateSingleMed4,
  //         fiveBedMed: stateSingleMed5,
  //         aHBedMed: stateSingleMed6,
  //         coopMed: stateSingleMed7,
  //         features: home,
  //         counties: filiteredStuff,
  //       },
  //       {
  //         include: [
  //           {
  //             association: manyCounty,
  //             include: [Zip],
  //           },
  //         ],
  //       }
  //     );
  //   })
  // );

  // //Creating Homes
  // await Promise.all(
  //   homeData.map((home) => {
  //     return Home.create({
  //       imageURL: home.imgSrc,
  //       city: home.hdpData.homeInfo.city,
  //       state: home.hdpData.homeInfo.state,
  //       zipcode: home.hdpData.homeInfo.zipcode,
  //       type: home.hdpData.homeInfo.homeType,
  //       price: home.price,
  //       priceNum: home.hdpData.homeInfo.price,
  //       bathrooms: home.baths,
  //       beds: home.beds,
  //       landSize: home.hdpData.homeInfo.livingArea,
  //       latitude: home.hdpData.homeInfo.latitude,
  //       longitude: home.hdpData.homeInfo.longitude,
  //     });
  //   })
  // );

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);

  // return {
  //   users: {
  //     cody: users[0],
  //     murphy: users[1],
  //   },
  // };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
