import { display } from "@mui/system";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import { Link } from "react-router-dom";

const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;
  const title = displayName === "Login" ? "Log-In" : "Create Account";
  console.log(props);

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);
  return (
    <div className="bg">
      <div id="authForm-body">
        <div className="authForm-container">
          <div className="authForm-form">
            <span className="title">{title}</span>
            <form onSubmit={handleSubmit} name={name}>
              <div className="input-field">
                <input
                  name="username"
                  type="text"
                  placeholder="Enter your email"
                  required
                ></input>
              </div>
              <div className="input-field">
                <input
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                ></input>
              </div>
              <div className="authForm-checkbox-text">
                <div className="authForm-checkbox-content">
                  <input type="checkbox" id="logCheck" />
                  <label htmlFor="logCheck" className="text">
                    Remember Me
                  </label>
                </div>
                <a href="#" className="text">
                  Forgot password?
                </a>
              </div>
              <div className="authForm-buttons">
                <button className="log-in" type="submit">
                  {displayName}
                </button>
                <Link to={"/home"}>
                  <button className="cancel">Cancel</button>
                </Link>

              </div>
              {error && error.response && <div>{error.response.data}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      dispatch(authenticate(username, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
