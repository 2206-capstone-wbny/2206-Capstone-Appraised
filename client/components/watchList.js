import React, { Component } from "react";
import { connect } from "react-redux";
import { setSingle } from "../store/home";
import { Link } from "react-router-dom";
import { getWatchlist, addHouse, removeHouse } from "../store/watchlist";
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
    this.removeHouse = this.removeHouse.bind(this);
  }

  fetchHouse(id) {
    this.props.fetchSingle(id);
  }

  removeHouse(house) {
    this.props.removeHouse(house);
  }

  componentDidMount() {
    this.props.getWatchlist();
  }

  render() {
    const { watchlist } = this.props;
    const { fetchHouse, removeHouse } = this;
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <Link to="/singleHome">
          <button value={1} onClick={fetchHouse}>
            House 1
          </button>
        </Link>
        {watchlist.map((house) => {})}
      </div>
    );
  }
}

/**
 * CONTAINER
 */

const mapState = (state) => ({
  watchlist: state.watchlist,
});

const mapDispatch = (dispatch) => ({
  fetchSingle: (id) => dispatch(setSingle(id)),
  getWatchlist: () => dispatch(getWatchlist()),
  removeHouse: (house) => dispatch(removeHouse(house)),
});

export default connect(mapState, mapDispatch)(watchList);
