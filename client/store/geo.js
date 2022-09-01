import axios from 'axios'
import history from '../history'

const SET_STATES = 'SET_STATES'
const SET_COUNTY = 'SET_COUNTY'
const SET_ZIP = 'SET_ZIP'

const _setState = (states) =>{
    return {
        type: SET_STATES,
        states
    }
}

const _setCounty = (county) =>{
    return {
        type: SET_COUNTY,
        county
    }
}

const _setZip = (zip) =>{
    return {
        type: SET_ZIP,
        zip
    }
}

export const setState = () =>{
    return (async(dispatch) =>{
      const {data} = await axios.get('/api/states')
      return dispatch(_setState(data))
    })
}

export const setCounty = () =>{
    return (async(dispatch) =>{
      const {data} = await axios.get('/api/counties')
      return dispatch(_setCounty(data))
    })
}

export const setZip = () =>{
    return (async(dispatch) =>{
      const {data} = await axios.get('/api/zipcodes')
      return dispatch(_setZip(data))
    })
}


export default function(state = {state:[], zip:[], county:[]}, action) {
  switch (action.type) {
    case SET_STATES:
      return {...state, state: action.states}
    case SET_COUNTY:
      return {...state, county: action.county}
    case SET_ZIP:
      return {...state, zip: action.zip}
    default:
      return state
  }
}