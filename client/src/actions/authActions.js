// helpers
import axios from "axios";

// Redux actions and types
import { returnErrors, clearErrors } from "./errActions";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL
} from "../actions/types";

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then(res => {
      console.log("before the dispatch", res);
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

export const register = ({ name, email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({ name, email, password });

  axios
    .post("/api/users", body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

export const login = ({ email, password }) => dispatch => {
  dispatch({
    type: USER_LOADING
  });
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({ email, password });

  axios
    .post("/api/auth", body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      console.log("authaction before dispatch loginfail");
      dispatch({
        type: LOGIN_FAIL
      });
    });
};
export const tokenConfig = getState => {
  console.log("im in the tokenConfig");
  // Get token from localstorage
  console.log(getState());

  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
