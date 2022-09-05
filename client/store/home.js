import axios from 'axios'
import history from '../history'

const SET_HOMES = 'SET_HOMES'
const SET_SINGLE = 'SET_SINGLE'
const SET_FORZIP = 'SET_FORZIP'

const _setHomes = (homes) =>{
    return {
        type: SET_HOMES,
        homes
    }
}

const _setSingle = (homes) =>{
    return {
        type: SET_SINGLE,
        homes
    }
}

const _setForZip = (homes) =>{
  return {
      type: SET_FORZIP,
      homes
  }
}

export const setHomes = () =>{
    return (async(dispatch) =>{
      const {data} = await axios.get('/api/homes')
      return dispatch(_setHomes(data))
    })
}

export const setSingle = (id) =>{
    return (async(dispatch)=>{
        const {data} = await axios.get(`/api/homes/${id}`)
        return dispatch(_setSingle(data))
    })
}

export const setForZip = (id) =>{
  return (async(dispatch)=>{
      const {data} = await axios.get(`/api/homes/zip/${id}`)
      return dispatch(_setForZip(data))
  })
}

export default function(state = {single:{}, all:[], forZipcode:[]}, action) {
  switch (action.type) {
    case SET_HOMES:
      return {...state, all: action.homes}
      case SET_SINGLE:
      return {...state, single: action.homes}
      case SET_FORZIP:
      return {...state, forZipcode: action.homes}
    default:
      return state
  }
}