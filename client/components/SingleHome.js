import React, { Component } from "react";
import { connect } from "react-redux";
// import Data from "../dummydata"

// Data.houseData.map((house, idx) => {
//   return (house.id = idx);
// });
/**
 * COMPONENT
 */
export class SingleHome extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    
    const {home} = this.props
    console.log(this.props);
    return (
      <div>
        <div>
          {home ? (
            <div>
              <div>
                <img src={home.imgSrc} />
              </div>
              <div>
                <div>
                  <h2>Stats</h2>
                  <p>Price: {home.price}</p>
                  <p>Area: {home.area}</p>
                  <p>Numbers of Baths: {home.baths}</p>
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
const mapStateToProps = (state) => {
  console.log(state)
  return {
   home: state.home.single
  };
};

export default connect(mapStateToProps)(SingleHome);