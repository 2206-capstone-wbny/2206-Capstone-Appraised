import axios from 'axios'
import history from '../history'

const SET_STATES = 'SET_STATES'
const SET_COUNTY = 'SET_COUNTY'
const SET_ZIP = 'SET_ZIP'
const SET_SINGLE_STATE = 'SET_SINGLE_STATE'
const SET_COUNTY_STATE = 'SET_COUNTY_STATE'
const UNSELECT_STATE = 'UNSELECT_STATE'
const UNSELECT_COUNTY = 'UNSELECT_COUNTY'
const GET_DATA = 'GET_DATA'

const _setState = (states) =>{
    return {
        type: SET_STATES,
        states
    }
}

const _setSingleState = (states) =>{
  return {
      type: SET_SINGLE_STATE,
      states
  }
}

const _unselectState = (states) =>{
  return {
      type: UNSELECT_STATE,
      states
  }
}

const _setCounty = (county) =>{
    return {
        type: SET_COUNTY,
        county
    }
}

const _setSingleCounty = (county) =>{
  return {
      type: SET_COUNTY_STATE,
      county
  }
}

const _unselectCounty= (states) =>{
  return {
      type: UNSELECT_COUNTY,
      states
  }
}

const _setZip = (zip) =>{
    return {
        type: SET_ZIP,
        zip
    }
}

const _getData = (data) =>{
  return {
      type: GET_DATA,
      data
  }
}

export const setState = () =>{
    return (async(dispatch) =>{
      const {data} = await axios.get('/api/states')
      return dispatch(_setState(data))
    })
}

export const setSingleState = (id) =>{
  return (async(dispatch) =>{
    const {data} = await axios.get(`/api/states/${id}`)
    return dispatch(_setSingleState(data))
  })
}

export const unselectState = () =>{
  return (async(dispatch) =>{
    return dispatch(_unselectState())
  })
}

export const setCounty = () =>{
    return (async(dispatch) =>{
      const {data} = await axios.get('/api/counties')
      return dispatch(_setCounty(data))
    })
}

export const setSingleCounty = (id) =>{
  return (async(dispatch) =>{
    const {data} = await axios.get(`/api/counties/${id}`)
    return dispatch(_setSingleCounty(data))
  })
}

export const unselectCounty = () =>{
  return (async(dispatch) =>{
    return dispatch(_unselectCounty())
  })
}

export const setZip = () =>{
    return (async(dispatch) =>{
      const {data} = await axios.get('/api/zipcodes')
      return dispatch(_setZip(data))
    })
}

export const updateZip = (color) =>{
  return (async(dispatch) =>{
    const {data} = await axios.put('/api/zipcodes', color)
    return dispatch(_setZip(data))
  })
}

export const getData = (id) =>{
  return (async(dispatch) =>{
    const {data} = await axios.get(`/api/historic/${id}`)
    return dispatch(_getData(data))
  })
}

export default function(state = {state:[], zip:[], county:[], singletState:{}, singleCounty:{}, historic:{}}, action) {
  switch (action.type) {
    case SET_STATES:
      return {...state, state: action.states}
    case SET_SINGLE_STATE:
      return {...state, singletState: action.states}
    case SET_COUNTY:
      return {...state, county: action.county}
    case SET_COUNTY_STATE:
      return {...state, singleCounty: action.county}
    case SET_ZIP:
      return {...state, zip: action.zip}
    case UNSELECT_COUNTY:
      return {...state, singleCounty: {}}
    case UNSELECT_STATE:
      return {...state, singletState: {}}  
    case GET_DATA:
      return {...state, historic: action.data}      
    default:
      return state
  }
}