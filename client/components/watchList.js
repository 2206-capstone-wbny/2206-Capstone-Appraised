import React, { Component } from "react";
import { connect } from "react-redux";
import { setSingle } from "../store/home";
import { Link } from "react-router-dom";
// import Data from "../dummydata"

// Data.houseData.map((house, idx) => {
//   return (house.id = idx);
// });
/**
 * COMPONENT
 */
export class watchList extends Component {
  constructor(props) {
    super(props);
    this.fetchHouse = this.fetchHouse.bind(this);
  }

  fetchHouse() {
    this.props.fetchSingle(event.target.value);
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <Link to="/singleHome">
          <button value={1} onClick={this.fetchHouse}>
            House 1
          </button>
        </Link>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapDispatch = (dispatch) => ({
  fetchSingle: (id) => dispatch(setSingle(id)),
});

export default connect(null, mapDispatch)(watchList);
