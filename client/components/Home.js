import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import SearchIcon from "@material-ui/icons/Search";
import {
  Container,
  DialogContent,
  DialogActions,
  Box,
  CssBaseline,
  TextField,
  Dialog,
  DialogContentText,
  AppBar,
  Toolbar,
  InputLabel,
  MenuItem,
  FormControlLabel,
  FormControl,
  NativeSelect,
  Slider,
  Grid,
} from "@mui/material";
import { alpha, makeStyles, styled } from "@material-ui/core/styles";
import Footer from "./footer";

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    display: "flex",
    backgroundColor: "lightblue",
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px",
  },
  searchInput: {
    width: "350px",
    margin: "5px",
  },
}));

export const Home = (props) => {
  const classes = useStyles();
  const { username, history } = props;
  const renderCheck = username ? "" : "";

  useEffect(() => {
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "hidden";
    };
  }, []);

  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Box
          m={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            bgcolor: "lightblue",
            height: "40vh",
            marginTop: "5%",
            margin: "10px",
            paddingTop: "40px",
            borderRadius: "15px",
            backgroundImage: `url(https://www.bestourism.com/img/items/big/535/Philadelphia_General-view_2120.jpg)`,
          }}
        >
          <Link to="/map">
            <Button
              variant="contained"
              color="primary"
              style={{ height: 40, width: 250, background: "#72bcd4" }}
            >
              View Map
            </Button>
          </Link>
        </Box>
      </Container>
      <Container maxWidth="md">
        <Box
          m={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            bgcolor: "lightblue",
            height: "40vh",
            marginTop: "5%",
            margin: "10px",
            paddingTop: "40px",
            borderRadius: "15px",
            backgroundImage: `url(https://www.nawy.com/blog/wp-content/uploads/2022/07/Modern-Interior-Design.jpg)`,
          }}
        >
          <Link to="/research">
            <Button
              variant="contained"
              color="primary"
              style={{ height: 40, width: 250, background: "#72bcd4" }}
            >
              Research
            </Button>
          </Link>
        </Box>
      </Container>
      {username ? (
        <Container maxWidth="md">
          <Box
            m={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              bgcolor: "lightblue",
              height: "40vh",
              borderRadius: "15px",
              marginTop: "5%",
              margin: "10px",
              padding: "20px",
              backgroundImage: `url(https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
              backgroundSize: "cover",
              backgroundPostion: "center bottom",
            }}
          >
            <Link to="/watchlist">
              <Button
                variant="contained"
                color="primary"
                style={{ height: 40, width: 250, background: "#72bcd4" }}
              >
                My Watchlist
              </Button>
            </Link>
          </Box>
        </Container>
      ) : (
        ""
      )}
      <Footer />
    </React.Fragment>
  );
};

const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
