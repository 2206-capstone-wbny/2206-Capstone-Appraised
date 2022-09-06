import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { PolarArea, Bar, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const valueCal = (color) => {
  return color == "red"
    ? "This house is over price in the current market. It is 25% above its marketvalue"
    : color == "orange"
    ? "The price of this house for its type is over 15% market value"
    : color == "yellow"
    ? "The price is 5% above marketvalue"
    : color == "green"
    ? "This house is currently at average cost in the current market"
    : "This house is currently going below the average market value. ";
};

class SideInfoView extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    //   const { id } = this.props.match.params;
    //   const singleHouse = await this.props.fetchSingleHome(id);
    //   this.setState({ home: singleHouse });
  }

  render() {
    console.log(this.props);
    let { house, similar, data } = this.props;

    let forIn = Object.values(data.aHBedMed[0]);
    let collect = forIn[forIn.length - 2];
    // console.log(collect, house.price)

    let otherHousePrice = similar
      .filter((homes) => homes.type == house.type && homes.beds == house.beds)
      .map((houseInfo) => Number(houseInfo.priceNum));
    console.log(otherHousePrice);
    return (
      <div id="infoContainer">
        <div
          className="houseContainer2"
          key={house.id}
          onClick={this.props.getSingle}
        >
          <img src={house.imageURL} id={house.id} />
          <h3>Current listing price: {house.price}</h3>
          <p>
            {house.beds} bedroooms | {house.bathrooms} bathrooms |{" "}
            {house.landSize} sqft
          </p>
          <p>
            Type: {house.type}
            Location: {house.city}, {house.state} {house.zipcode}
          </p>
        </div>

        <div className="chart-graph">
          <PolarArea
            data={{
              labels: ["House", "Market Value"],
              datasets: [
                {
                  data: [house.priceNum, collect],
                  backgroundColor: [
                    "rgb(255, 99, 132)",
                    "rgb(75, 192, 192)",
                    "rgb(255, 205, 86)",
                    "rgb(201, 203, 207)",
                    "rgb(54, 162, 235)",
                  ],
                },
              ],
            }}
          />
          <p>{valueCal(house.color)}</p>
        </div>
        <div className="chart-graph">
          <Bar
            data={{
              labels: [`This house (${house.priceNum})`, ...otherHousePrice],
              datasets: [
                {
                  label: "Similar houses in the neighborhood",
                  data: [house.priceNum, ...otherHousePrice],
                  backgroundColor: ["rgb(255, 99, 132)"],
                },
              ],
            }}
          />
        </div>
        <Link
          to={`/singleHome/${this.props.house.id}`}
          className="MoreInformation"
        >
          <a>More Info</a>
        </Link>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = (state) => {
  return {
    house: state.home.single,
    similar: state.home.forZipcode,
    data: state.geo.historic,
  };
};

export default connect(mapStateToProps)(SideInfoView);
