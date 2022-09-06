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

  async componentDidMount() {}

  render() {
    console.log(this.props);
    let { house, similar, data } = this.props;
    let forIn;
    let datesData;
    let lineData;
    if (house.beds == 1) {
      if (data.oneBedMed.length > 0) {
        forIn = Object.values(data.oneBedMed[0]);
        datesData = Object.keys(data.oneBedMed[0]);
        lineData = Object.values(data.oneBedMed[0]);
      } else {
        forIn = Object.values(data.oneBedMed);
      }
    } else if (house.beds == 2) {
      if (data.twoBedMed.length > 0) {
        forIn = Object.values(data.twoBedMed[0]);
        datesData = Object.keys(data.twoBedMed[0]);
        lineData = Object.values(data.twoBedMed[0]);
      } else {
        forIn = Object.values(data.twoBedMed);
      }
    } else if (house.beds == 3) {
      if (data.threeBedMed.length > 0) {
        forIn = Object.values(data.threeBedMed[0]);
        datesData = Object.keys(data.threeBedMed[0]);
        lineData = Object.values(data.threeBedMed[0]);
      } else {
        forIn = Object.values(data.threeBedMed);
      }
    } else if (house.beds == 4) {
      if (data.fourBedMed.length > 0) {
        datesData = Object.keys(data.fourBedMed[0]);
        lineData = Object.values(data.fourBedMed[0]);
        forIn = Object.values(data.fourBedMed[0]);
      } else {
        forIn = Object.values(data.fourBedMed);
      }
    } else if (house.beds >= 5) {
      if (data.fiveBedMed.length > 0) {
        datesData = Object.keys(data.fiveBedMed[0]);
        lineData = Object.values(data.fiveBedMed[0]);
        forIn = Object.values(data.fiveBedMed[0]);
      } else {
        forIn = Object.values(data.fiveBedMed);
      }
    } else {
      forIn = Object.values(data.aHBedMed[0]);
    }

    datesData.shift();
    lineData.shift();
    let collect = forIn[forIn.length - 2];
    let otherHousePrice = similar
      .filter((homes) => homes.type == house.type && homes.beds == house.beds)
      .map((houseInfo) => Number(houseInfo.priceNum));
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
            {house.landSize}sqft
          </p>
          <p>Type: {house.type}</p>
          <p>
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

        <div className="chart-graph lineGraph">
          <Line
            data={{
              labels: datesData,
              datasets: [
                {
                  label: "past market value",
                  data: lineData,
                  fill: false,
                  borderColor: ["rgb(54, 162, 235)"],
                  pointRadius: 0,
                },
              ],
            }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    house: state.home.single,
    similar: state.home.forZipcode,
    data: state.geo.historic,
  };
};

export default connect(mapStateToProps)(SideInfoView);
