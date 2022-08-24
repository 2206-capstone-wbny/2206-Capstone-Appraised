import axios from 'axios'
import history from '../history'

const SET_HOMES = 'SET_HOMES'
const SET_SINGLE = 'SET_SINGLE'

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

const setHomes = () =>{
    return (async(dispatch) =>{
      const {data} = await axios.get('/api/homes')
      return dispatch(_setHomes(data))
    })
}

const setSingle = (id) =>{
    return (async(dispatch)=>{
        const {data} = await axios.get(`/api/homes/${id}`)
        return dispatch(_setSingle(data))
    })
}

export default function(state = {single:{}, all:[]}, action) {
  switch (action.type) {
    case SET_HOMES:
      return {...state, all: action.homes}
      case SET_SINGLE:
      return {...state, single: action.homes}
    default:
      return state
  }
}