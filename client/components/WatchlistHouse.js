import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { setSingle } from "../store/home";
import { Link } from "react-router-dom";
import { getWatchlist, addHouse, removeHouse } from "../store/watchlist";
import { HeartSwitch } from "@anatoliygatt/heart-switch";

function WatchlistHouse({ house, index, removeHouse }) {
  function remove(id) {
    removeHouse(id);
  }

  const [liked, setLiked] = useState(true);

  return (
    <div key={index}>
      <Link to={`/singleHome/${house.id}`}>
        <img src={house.imageURL}></img>
      </Link>
      <span>
        <HeartSwitch
          size="md"
          checked={liked}
          onChange={() => {
            setLiked(false), remove(house.id);
          }}
        />
      </span>
      <h1>{house.price}</h1>
      <h2>{house.type}</h2>
    </div>
  );
}

const mapState = (state) => ({
  watchlist: state.watchlist,
});

const mapDispatch = (dispatch) => ({
  fetchSingle: (id) => dispatch(setSingle(id)),
  getWatchlist: () => dispatch(getWatchlist()),
  removeHouse: (id) => dispatch(removeHouse(id)),
});

export default connect(mapState, mapDispatch)(WatchlistHouse);
