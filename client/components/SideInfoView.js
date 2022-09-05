import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import HistoricChart from './HistoricChart';


class SideInfoView extends Component {
    constructor(props) {
      super(props);
    }
  
    async componentDidMount() {
    //   const { id } = this.props.match.params;
    //   const singleHouse = await this.props.fetchSingleHome(id);
    //   this.setState({ home: singleHouse });
    }
  
    render(){
        console.log(this.props)
    return(
        
        <div id="infoContainer">
        <img
          id="housePic"
          src={this.props.house.imageURL}
          width="100vw"
        />
        <div id="infoText">
          <span style={{ fontSize: "25px" }}>
            {this.props.house.price}{" "}
          </span>{" "}
          <span style={{ fontSize: 14, fontWeight: "bold" }}>
            {" "}
            {this.props.house.beds}{" "}
          </span>
          <span style={{ fontSize: 14 }}>bd | </span>
          <span style={{ fontSize: 14, fontWeight: "bold" }}>
            {this.props.house.bathrooms}{" "}
          </span>{" "}
          <span style={{ fontSize: 14 }}>ba</span>
          <div>
            <span style={{ fontSize: 14, fontWeight: "bold" }}>
              Location:{" "}
            </span>
            <span style={{ fontSize: 14 }}>
              {" "}
              {this.props.house.city}, {this.props.house.state},{" "}
              {this.props.house.zipcode}
            </span>
          </div>
          <div>
            <span style={{ fontSize: 14, fontWeight: "bold" }}>
              Type:{" "}
            </span>
            <span style={{ fontSize: 14 }}> {this.props.house.type}</span>
          </div>
        </div>
        <Link
          to={`/singleHome/${this.props.house.id}`}
          className="MoreInformation"
        >
          <a>More Info</a>
        </Link>
        <HistoricChart/>
      </div>
      )
    }
  }
  
  /**
   * CONTAINER
   */
  const mapStateToProps = (state) => {
    console.log(state)
    return {
     house: state.home.single,
    };
  };
  
  export default connect(mapStateToProps)(SideInfoView);
  