import React, { Component } from "react";
import { connect } from "react-redux";
import * as Data from "../data.json";
// import Data from "../dummydata"

// Data.houseData.map((house, idx) => {
//   return (house.id = idx);
// });
/**
 * COMPONENT
 */
export class SingleHome extends Component {
  constructor() {
    super();
  }

  render() {
    const ID = this.props.match.params.id;
    const house = Data.houseData.filter((house) => house.zpid === ID)[0];
    console.log(house);
    return (
      <div>
        <div>
          {house ? (
            <div>
              <div>
                <img src={house.imgSrc} />
              </div>
              <div>
                <div>
                  <h2>Stats</h2>
                  <p>Price: {house.price}</p>
                  <p>Area: {house.area}</p>
                  <p>Numbers of Baths: {house.baths}</p>
                </div>
                <div>
                  <h2>Description</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            "House Does Not Exist"
          )}
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
   home: state.home.single
  };
};

export default connect(mapState)(Map);