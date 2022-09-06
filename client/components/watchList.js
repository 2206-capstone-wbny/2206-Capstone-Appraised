import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getWatchlist } from "../store/watchlist";
import WatchlistHouse from "./WatchlistHouse";

/**
 * COMPONENT
 */
export class watchList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getWatchlist();
  }

  render() {
    const watchlist = this.props.watchlist.homes || [];
    const watchlistCheck = watchlist.length ? (
      <div id="watchlist">
        {watchlist.map((house, index) => {
          return (
            <div key={index}>
              <WatchlistHouse house={house} index={index} />
            </div>
          );
        })}
      </div>
    ) : (
      <div>
        <Link to={"/map"}>
          <button>Explore more!</button>
        </Link>
      </div>
    );

    return (
      <div>
        <h1>Watchlist</h1>
        {watchlistCheck}
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
  getWatchlist: () => dispatch(getWatchlist()),
});

export default connect(mapState, mapDispatch)(watchList);
