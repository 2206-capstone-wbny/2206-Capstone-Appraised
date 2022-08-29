import React from 'react'
import * as AllHouses from './Data/Graph/StateAH';
import * as state1B from './Data/Graph/state1B';
import * as state2B from './Data/Graph/state2B';
import * as state3B from './Data/Graph/state3B';
import * as state4B from './Data/Graph/state4B';
import * as state5B from './Data/Graph/state5B';
import * as stateCo from './Data/Graph/stateCo';
import * as stateSingle from './Data/Graph/stateSingle';
import {connect} from 'react-redux'
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


const HistoricChart = (state) => {
        // let data = AllHouses.map(house => 
        // Object.keys(house).filter(num => num != 'RegionName' && num != 'StateName'))
        var randomColor = ['#bfcff0', '#9ce7c9', '#fbd206', '#feaf8a', '#fd7a8c', '#c780e8', '#118ab2', 'f3e9d2']
        
        let pickedData = AllHouses.filter(house => house.StateName == 'NY')
        let dataLabel =  Object.keys(pickedData[0]).filter(num => num != 'RegionName' && num != 'StateName')
        pickedData[0].RegionName = 'All Houses'
        
        let state1b = state1B.filter(house => house.StateName == 'NY')
        state1b[0].RegionName = '1 Bed'
        
        let state2b = state2B.filter(house => house.StateName == 'NY')
        state2b[0].RegionName = "2 Bed"
        
        let state3b = state3B.filter(house => house.StateName == 'NY')
        state3b[0].RegionName = '3 Bed'
        
        let state4b = state4B.filter(house => house.StateName == 'NY')
        state4b[0].RegionName = '4 Bed'
        
        let state5b = state5B.filter(house => house.StateName == 'NY')
        state5b[0].RegionName = '5+ Bed'
        
        let stateCoop = stateCo.filter(house => house.StateName == 'NY')
        stateCoop[0].RegionName = 'Co-op/Condo'
        
        let stateSi = stateSingle.filter(house => house.StateName == 'NY')
        stateSi[0].RegionName = 'Single Household'
        
        let allData = [...pickedData, ...state1b, ...state2b, ...state3b, ...state4b, ...state5b, ...stateCoop, ...stateSi]
    
        
        
        return(
            <div>
             <Line data={{
            labels: dataLabel,
            datasets: allData.map((house, i) => {
            return({
                label: house.RegionName,
                data: Object.values(house).filter(num => typeof(num) == 'number'),
                fill: false,
            borderColor: randomColor[i],
             pointRadius: 0,
            })
        }),
            
        }}
        
        options= {{
              
            }}/>
            </div>)
    
}


export default HistoricChart

//  labels: data[0],
//             datasets: AllHouses.map(house => {
//             return (
//             {
//             label: house.RegionName,
//             data: Object.values(house).filter(num => typeof(num) == 'number'),
//             fill: true,
//             backgroundColor: "rgba(75,192,192,0.2)",
//             borderColor: "rgba(75,192,192,1)"
//             })
//         })