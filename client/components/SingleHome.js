import React, { Component } from "react";
import { connect } from "react-redux";
import home, { setSingle } from "../store/home";
import { HeartSwitch } from "@anatoliygatt/heart-switch";
import { addHouse, removeHouse, getWatchlist } from "../store/watchlist";

export class SingleHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      home: null,
      toggle: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    if (this.state.toggle) {
      this.props.removeHome(id);
    } else {
      this.props.addHome(id);
    }
  }

  componentDidMount() {
    // console.log("it is mounted!!!!!------");
    const { id } = this.props.match.params;
    const singleHouse = this.props.fetchSingleHome(id);
    // this.props.fetchWatchlist();
    this.setState({ home: singleHouse });
    // const watchlist = this.props.watchlist.homes || [];
    // const watchlistCheck = watchlist.filter((home) => home.id);
    // console.log("watchlist---------", watchlistCheck);
    // console.log("id---------", id);
    // if (watchlistCheck.includes(id)) {
    //   this.setState({ toggle: true });
    // }
  }

  render() {
    const { home, watchlist } = this.props;
    const { toggle } = this.state;
    const { handleClick } = this;
    console.log("toggle ------", toggle);
    const landSize = home.landSize ? home.landSize : "";

    return (
      <div className="singleHome-body">
        <div className="map-container">
          {home ? (
            <div className="singleHome-container">
              <div className="singleHome-left">
                <img src={home.imageURL} />
              </div>
              <div className="singleHome-right">
                <h1>Overview</h1>
                <span>
                  <HeartSwitch
                    size="md"
                    checked={toggle}
                    onChange={() => {
                      this.setState({ toggle: !this.state.toggle }),
                        handleClick(home.id);
                    }}
                  />
                </span>
                <div>
                  <h2>{home.price}</h2>
                  <span>
                    <b>{home.beds}</b> Beds
                  </span>
                  <span>
                    {" "}
                    <b>{home.bathrooms}</b> Bathrooms
                  </span>
                  <span>
                    {" "}
                    <b>{landSize}</b> {landSize ? `sqft` : ``}
                  </span>
                </div>
                <div className="description">
                  <h3>Description</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitatio
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
  console.log(state);
  return {
    home: state.home.single,
    watchlist: state.watchlist,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchSingleHome: (id) => dispatch(setSingle(id)),
  addHome: (id) => dispatch(addHouse(id)),
  removeHome: (id) => dispatch(removeHouse(id)),
  fetchWatchlist: () => dispatch(getWatchlist()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleHome);
