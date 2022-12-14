import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { MapViewPage } from "./components/MapComponent";
import Setting from "./components/Setting";
import { me } from "./store";
import SingleHome from "./components/SingleHome";
import Map from "./components/MapComponent";
import HistoricChart from "./components/HistoricChart";
import watchList from "./components/watchList";
import News from "./components/News";
import { getWatchlist } from "./store/watchlist";


class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isLoggedIn && this.props.isLoggedIn) {
      this.props.fetchWatchlist();
    }
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/map" component={Map} />
            <Route path="/setting" component={Setting} />
            <Route path="/singleHome/:id" component={SingleHome} />
            <Route path="/research" component={HistoricChart} />
            <Route path="/watchlist" component={watchList} />
            <Route path="/news" component={News} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/singleHome/:id" component={SingleHome} />
            <Route path="/map" component={Map} />
            <Route path="/research" component={HistoricChart} />
            <Route path="/news" component={News} />
          </Switch>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
    fetchWatchlist() {
      dispatch(getWatchlist());
    },
  };
};

export default withRouter(connect(mapState, mapDispatch)(Routes));
