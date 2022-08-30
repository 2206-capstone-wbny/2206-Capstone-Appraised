"use strict";
const homeData = require("./dummydata");
const statesData = require("./usaState.geo.json");
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
const associations = require("./associations");
const {
  db,
  models: { User, Home, State, County, Zip, HistoricData },
} = require("../server/db");

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

  await Promise.all(
    statesData.features.map((home) => {
      var filtered = stateSinglePriceMed.filter(
        (state) => state.StateName == home.properties.postal
      )[0];
      if (filtered != null) {
        var stateSingleMed = Object.values(filtered).pop();
      } else {
        stateSingleMed = 0;
      }

      // console.log(filtered, stateSingleMed);
      return State.create({
        stateName: home.properties.label_en,
        state: home.properties.postal,
        singleHMed: stateSingleMed,
        features: home,
      });
    })
  );

  //Creating Homes
  await Promise.all(
    statesData.features.map((home, index) => {
      var filtered = stateSinglePriceMed.filter(
        (state) => state.StateName == home.properties.postal
      )[0];
      if (filtered != null) {
        var stateSingleMed = Object.values(filtered).pop();
        var stateSingleMed1 = Object.values(
          state1B.filter(
            (state) => state.StateName == home.properties.postal
          )[0]
        ).pop();
        var stateSingleMed2 = Object.values(
          state2B.filter(
            (state) => state.StateName == home.properties.postal
          )[0]
        ).pop();
        var stateSingleMed3 = Object.values(
          state3B.filter(
            (state) => state.StateName == home.properties.postal
          )[0]
        ).pop();
        var stateSingleMed4 = Object.values(
          state4B.filter(
            (state) => state.StateName == home.properties.postal
          )[0]
        ).pop();
        var stateSingleMed5 = Object.values(
          state5B.filter(
            (state) => state.StateName == home.properties.postal
          )[0]
        ).pop();
        var stateSingleMed6 = Object.values(
          stateAH.filter(
            (state) => state.StateName == home.properties.postal
          )[0]
        ).pop();
        var stateSingleMed7 = Object.values(
          stateCo.filter(
            (state) => state.StateName == home.properties.postal
          )[0]
        ).pop();
      } else {
        stateSingleMed = 0;
        stateSingleMed1 = 0;
        stateSingleMed2 = 0;
        stateSingleMed3 = 0;
        stateSingleMed4 = 0;
        stateSingleMed5 = 0;
        stateSingleMed6 = 0;
        stateSingleMed7 = 0;
      }
      State.create({
        id: index + 1,
        stateName: home.properties.label_en,
        state: home.properties.postal,
        singleHMed: stateSingleMed,
        oneBedMed: stateSingleMed1,
        twoBedMed: stateSingleMed2,
        threeBedMed: stateSingleMed3,
        fourBedMed: stateSingleMed4,
        fiveBedMed: stateSingleMed5,
        aHBedMed: stateSingleMed6,
        coopMed: stateSingleMed7,
        features: home,
      });
      let filiteredCounty = associations.filter(
        (county) => home.properties.postal == county.state_abbr
      );
      // console.log(filiteredCounty.state_abbr)

      filiteredCounty.map((county, countyIndex) => {
        let sorted = countyData.features.filter(
          (cnty) => cnty.properties.label_en == county.county
        );

        // let filiteredZip = associations.filter(zip => county.county == zip.county)
        // filiteredZip.map((zip, zipIndex) =>{
        // let zipSort = zipData.features.filter(zp => zp.properties.zip == zip.zipcode)
        // // console.log(zipSort)

        //   return Zip.create({
        // county: zip.zipcode,
        // // singleHMed : stateSingleMed,
        // // oneBedMed: stateSingleMed1,
        // // twoBedMed: stateSingleMed2,
        // // threeBedMed: stateSingleMed3,
        // // fourBedMed: stateSingleMed4,
        // // fiveBedMed: stateSingleMed5,
        // // aHBedMed: stateSingleMed6,
        // // coopMed: stateSingleMed7,
        // features : zipSort,
        // countyId : countyIndex
        // })})

        return County.create({
          county: county.county,
          // singleHMed : stateSingleMed,
          // oneBedMed: stateSingleMed1,
          // twoBedMed: stateSingleMed2,
          // threeBedMed: stateSingleMed3,
          // fourBedMed: stateSingleMed4,
          // fiveBedMed: stateSingleMed5,
          // aHBedMed: stateSingleMed6,
          // coopMed: stateSingleMed7,
          features: sorted,
          stateId: index + 1,
        });
      });
    })
  );

  //Creating Homes
  await Promise.all(
    homeData.map((home) => {
      return Home.create({
        imageURL: home.imgSrc,
        city: home.hdpData.homeInfo.city,
        state: home.hdpData.homeInfo.state,
        zipcode: home.hdpData.homeInfo.zipcode,
        type: home.hdpData.homeInfo.homeType,
        price: home.price,
        priceNum: home.hdpData.homeInfo.price,
        bathrooms: home.baths,
        beds: home.beds,
        landSize: home.hdpData.homeInfo.livingArea,
        latitude: home.hdpData.homeInfo.latitude,
        longitude: home.hdpData.homeInfo.longitude,
      });
    })
  );

  // console.log(`seeded ${users.length} users`);
  // console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
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
