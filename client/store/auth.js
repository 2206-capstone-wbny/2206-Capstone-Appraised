import axios from "axios";
import history from "../history";

const TOKEN = "token";

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";
const UPDATE_AUTH = "UPDATE_AUTH";
/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });
export const updateAuth = (auth) => {
  return {
    type: UPDATE_AUTH,
    auth,
  };
};
/**
 * THUNK CREATORS
 */

export const updateUser = (auth) => {
  return async (dispatch) => {
    // console.log(auth)
    const { data } = await axios.put("/auth/update", auth);
    dispatch(updateAuth(data));
  };
};

export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

export const authenticate =
  (username, password, method) => async (dispatch) => {
    try {
      const res = await axios.post(`/auth/${method}`, { username, password });
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
      history.push("/home");
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push("/home");
  return {
    type: SET_AUTH,
    auth: {},
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    await axios.delete("/auth/delete", { data: { id } });
    return logout();
  };
};
/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    case UPDATE_AUTH:
      return state;
    default:
      return state;
  }
}
