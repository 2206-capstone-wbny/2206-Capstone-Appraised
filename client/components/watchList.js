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
    this.remove = this.remove.bind(this);
  }

  fetchHouse(id) {
    this.props.fetchSingle(id);
  }

  remove(evt) {
    let id = evt.target.value;
    this.props.removeHouse(id);
  }

  componentDidMount() {
    this.props.getWatchlist();
  }

  render() {
    const watchlist = this.props.watchlist.homes || [];

    const { fetchHouse, remove } = this;
    return (
      <div id="watchlist">
        {watchlist.map((house, index) => {
          return (
            <div key={index}>
              <Link to={`/singleHome/${house.id}`}>
                <img src={house.imageURL}></img>
              </Link>
              <h1>{house.price}</h1>
              <h2>{house.type}</h2>
              <button value={house.id} onClick={remove}>
                Delete
              </button>
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
