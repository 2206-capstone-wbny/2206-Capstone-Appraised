import { AccessTimeOutlined } from "@material-ui/icons";
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

const _addHouse = (watchlist) => ({
  type: ADD_HOUSE,
  watchlist,
});

const _removeHouse = (watchlist) => ({
  type: REMOVE_HOUSE,
  watchlist,
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
    const { data: watchlist } = await axios.put("/api/users/addWatchlist", {
      house,
      headers: {
        authorization: token,
      },
    });
    dispatch(_addHouse(watchlist));
  };
};

export const removeHouse = (house) => {
  const token = window.localStorage.getItem(TOKEN);
  return async (dispatch) => {
    const { data: watchlist } = await axios.put("/api/users/removeWatchlist", {
      house,
      headers: {
        authorization: token,
      },
    });
    dispatch(_removeHouse(watchlist));
  };
};

export default function (state = {}, action) {
  switch (action.type) {
    case GET_WATCHLIST:
      return { ...action.watchlist };
    case ADD_HOUSE:
      return action.watchlist;
    case REMOVE_HOUSE:
      return action.watchlist;
    default:
      return state;
  }
}
