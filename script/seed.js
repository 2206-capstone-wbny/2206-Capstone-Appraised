"use strict";
const homeData = require("./dummydata");
const statesData = require("./usaState.geo.json");
const stateSinglePriceMed = require("./stateSingle.json");
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

      console.log(filtered, stateSingleMed);
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

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
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
