import axios from "axios";

const TOKEN = "token";

// ACTIONS
const GET_WATCHLIST = "GET_WATCHLIST";
const ADD_HOUSE = "ADD_HOUSE";
const REMOVE_HOUSE = "REMOVE_HOUSE";

// ACTION CREATORS
const _getWatchlist = (watchlist) => ({
  type: GET_WATCHLIST,
  watchlist,
});

const _addHouse = (house) => ({
  type: ADD_HOUSE,
  house,
});

const _removeHouse = (house) => ({
  type: REMOVE_HOUSE,
  house,
});

// THUNKS

export const getWatchlist = () => {
  const token = window.localStorage.getItem(TOKEN);
  return async (dispatch) => {
    const { data: watchlist } = await axios.get("/api/users/watchlist", {
      headers: {
        authorization: token,
      },
    });
    dispatch(_getWatchlist(watchlist));
  };
};

export const addHouse = (house) => {
  const token = window.localStorage.getItem(TOKEN);
  return async (dispatch) => {
    const { data: added } = await axios.put("/api/users/addWatchlist", {
      house,
      headers: {
        authorization: token,
      },
    });
    dispatch(_addHouse(added));
  };
};

export const removerHouse = (house) => {
  const token = window.localStorage.getItem(TOKEN);
  return async (dispatch) => {
    const { data: removed } = await axios.put("/api/users/addWatchlist", {
      house,
      headers: {
        authorization: token,
      },
    });
    dispatch(_addHouse(removed));
  };
};

export default function (state = [], action) {
  switch (action.type) {
    case GET_WATCHLIST:
      return action.watchlist;
    case ADD_HOUSE:
      return [...state, action.house];
    case REMOVE_HOUSE:
      return state.filter((house) => house.id !== action.house.id);
    default:
      return state;
  }
}
