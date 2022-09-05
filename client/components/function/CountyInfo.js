import React, { Component } from "react";
import { connect } from "react-redux";
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


class CountyInfo extends Component {
    constructor(props) {
      super(props);
    }
  
    async componentDidMount() {
    //   const { id } = this.props.match.params;
    //   const singleHouse = await this.props.fetchSingleHome(id);
    //   this.setState({ home: singleHouse });
    }
  
    render(){        
        let {state, data, zip} = this.props
        let {oneBedMed, twoBedMed, threeBedMed, fourBedMed, fiveBedMed, counties} = state
        let topC = zip.sort((a, b) => b.aHBedMed-a.aHBedMed).filter((county, index) => {
            if(index < 3)
            {
                return county
            }})

            console.log(topC)
        // Object.keys(data.oneBedMed[0])
        
            let datesData = Object.keys(data.aHBedMed[0]).filter((num, index) => 
            {if(index > 220){return num}})
            let lineData = Object.values(data.aHBedMed[0]).filter((num, index) => 
            {if(index > 220){return num}})
        
            
    return(
        <div id="infoContainer">
        <h2>{state.county}</h2>
        <div className="chart-graph">
        <a>Current Housing Market</a>
        <Doughnut data={{
        labels: ['1 Bed', '2 Bed', '3 Bed', '4 Bed', '5+ Bed'],
        datasets:[{
            label: state.name,
            data: [oneBedMed, twoBedMed, threeBedMed, fourBedMed, fiveBedMed],
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
        }}
        /></div>
        
        <div className="chart-graph">
        <a>Top {topC.length} highest zipcodes</a>
        <Bar data={{
            labels: topC.map(a => a.zip),
            datasets: [{
                label: 'Counties',
                data: topC.map(a => a.aHBedMed),
                backgroundColor: [
                    'rgb(255, 99, 132)',
                  ],
                  hoverOffset: 4
                }]
        }}/></div>
        
        <a>Historic data</a>
        <div className="chart-graph lineGraph">
        <Line data={{
            labels: datesData,
            datasets: [{
                label: 'past market value',
                data: lineData,
                fill: false,
            borderColor: ['rgb(54, 162, 235)'],
             pointRadius: 0,
            }],}} /></div> 
      </div>
      )
    }
  }
  
  /**
   * CONTAINER
   */
  const mapStateToProps = (state) => {
    return {
     state: state.geo.singleCounty,
     data: state.geo.historic
    };
  };
  
  export default connect(mapStateToProps)(CountyInfo);