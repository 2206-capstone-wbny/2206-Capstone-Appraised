import { HomeRounded } from "@material-ui/icons";
import React, { Component } from "react";
import { connect } from "react-redux";

class HouseInfo extends Component {
    constructor(props) {
      super(props);
    }


    render(){
      console.log(this.props)
        let {Houses} = this.props  
    return(
        <div id="infoContainer" >
        {
        Houses.map(home => {
        return (
        <div className='houseContainer' key={home.id} onClick={this.props.getSingle}>
        <img src={home.imageURL} id={home.id}/>
        <h3>{home.price}</h3>
        <p>{home.beds}bds | {home.bathrooms}bths | {home.landSize}sqft - {home.type}</p>
        <p>{home.city}, {home.state} {home.zipcode}</p>
        </div>    
        )})}
      </div>
      )
    }
  }
  
  /**
   * CONTAINER
   */
  const mapStateToProps = (state) => {
    return {
     Houses: state.home.forZipcode,
    };
  };
  
  export default connect(mapStateToProps)(HouseInfo);