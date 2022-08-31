import React, { Component } from "react";
import { connect } from "react-redux";
import home, { setSingle } from "../store/home";

export class SingleHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      home: null,
    };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    const singleHouse = await this.props.fetchSingleHome(id);
    this.setState({ home: singleHouse });
  }

  render() {
    const { home } = this.props;
    const landSize = home.landSize ? home.landSize : "";
    console.log(`@@@@`, this.props);
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
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchSingleHome: (id) => dispatch(setSingle(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleHome);
