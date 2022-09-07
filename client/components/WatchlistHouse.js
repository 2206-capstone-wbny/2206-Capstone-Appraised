import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { setSingle } from "../store/home";
import { Link } from "react-router-dom";
import { getWatchlist, addHouse, removeHouse } from "../store/watchlist";
import { HeartSwitch } from "@anatoliygatt/heart-switch";
import { FaCity, FaHouseUser, FaFunnelDollar } from "react-icons/fa";
import { HiInformationCircle } from "react-icons/hi";

function WatchlistHouse({ house, index, removeHouse }) {
  function remove(id) {
    removeHouse(id);
    window.location.reload();
  }

  const replace = house.type.replace(/_/g, " ");
  const sizeCheck = house.landSize ? (
    <span>
      {house.beds} beds {house.bathrooms} baths {house.landSize} sqft
    </span>
  ) : (
    <span>
      {house.beds} beds {house.bathrooms} baths
    </span>
  );
  const priceSize = house.landSize
    ? Math.floor(house.priceNum / house.landSize)
    : "";

  const priceSizeCheck = house.landSize ? (
    <div>
      <FaFunnelDollar /> <span> Price/sqft </span>
      <br />${priceSize}
    </div>
  ) : (
    ""
  );

  const [liked, setLiked] = useState(true);

  return (
    <div className="card">
      <Link to={`/singleHome/${house.id}`}>
        <img src={house.imageURL} width="400px"></img>
      </Link>
      <div className="container">
        <h3 className="price">{house.price}</h3>
        <span className="heartswitch">
          <HeartSwitch
            size="sm"
            checked={liked}
            onChange={() => {
              setLiked(false), remove(house.id);
            }}
          />
        </span>
        <br />
        <br />
        <span>
          <HiInformationCircle />
          {sizeCheck}
        </span>
        <br />
        <br />
        <div>
          <FaCity />
          <span> Address</span>
          <br /> {house.city}, {house.state} {house.zipcode}
        </div>
        <br />
        <div>
          <FaHouseUser />
          <span> House Type</span>
          <br />
          {replace}
        </div>
        <br />
        {priceSizeCheck}
      </div>
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
