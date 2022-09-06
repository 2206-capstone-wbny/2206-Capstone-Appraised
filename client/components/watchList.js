import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getWatchlist } from "../store/watchlist";
import WatchlistHouse from "./WatchlistHouse";
import Button from "@mui/material/Button";

export class watchList extends Component {
  constructor(props) {
    super(props);
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
        <h3>No houses in watchlist</h3>
        <h4>Whenever you find homes you like, add them.</h4>
        <Link to="/map">
          <Button
            variant="contained"
            color="primary"
            style={{ height: 40, width: 250, background: "#72bcd4" }}
          >
            View Map
          </Button>
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

const mapState = (state) => ({
  watchlist: state.watchlist,
});

const mapDispatch = (dispatch) => ({
  getWatchlist: () => dispatch(getWatchlist()),
});

export default connect(mapState, mapDispatch)(watchList);
