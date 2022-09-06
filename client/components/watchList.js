import React, { Component } from "react";
import { connect } from "react-redux";
import { setSingle } from "../store/home";
import { Link } from "react-router-dom";
import { getWatchlist, addHouse, removeHouse } from "../store/watchlist";
import { HeartSwitch } from "@anatoliygatt/heart-switch";
import WatchlistHouse from "./WatchlistHouse";
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
    this.state = {
      home: null,
    };
    this.fetchHouse = this.fetchHouse.bind(this);
    this.remove = this.remove.bind(this);
  }

  fetchHouse(id) {
    this.props.fetchSingle(id);
  }

  remove(id) {
    this.props.removeHouse(id);
  }

  add(id) {
    this.props.addHouse(id);
  }

  componentDidMount() {
    this.props.getWatchlist();
    document.body.style.overflow = "auto";
  }

  componentWillUnmount() {
    document.body.style.overflow = "hidden";
  }

  render() {
    const watchlist = this.props.watchlist.homes || [];

    return (
      <div id="watchlist">
        {watchlist.map((house, index) => {
          return (
            <div key={index}>
              <WatchlistHouse house={house} index={index} />
            </div>
          );
        })}
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
  removeHouse: (id) => dispatch(removeHouse(id)),
});

export default connect(mapState, mapDispatch)(watchList);
