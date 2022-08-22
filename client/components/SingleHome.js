import React, { Component } from "react";
import { connect } from "react-redux";
import * as Data from "../data.json";
// import Data from "../dummydata"

const test = "this is testing";
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
                <img src={house.imgSrc} />{" "}
              </div>
              <div>
                <div>
                  <p>Price: {house.price}</p>
                  <p>Area: {house.area}</p>
                  <p>Numbers of Baths: {house.baths}</p>
                </div>
                <div>
                  <p>This is details about the house section. Will keep testing for other information.</p>
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

export default connect(SingleHome);
