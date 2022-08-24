import React, { useState } from "react";
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
} from "@mui/material";
import { alpha, makeStyles, styled } from "@material-ui/core/styles";

/**
 * COMPONENT
 */

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

// const marks = [
//   { value: 0, label: "$0" },
//   { value: 100000, label: "$100,000+" },
//   { value: 150000, label: "$150,000+" },
//   { value: 200000, label: "$200,000+" },
//   { value: 250000, label: "$250,000+" },
//   { value: 300000, label: "$300,000+" },
//   { value: 350000, label: "$350,000+" },
//   { value: 400000, label: "$400,000+" },
// ];

export const Home = (props) => {
  const classes = useStyles();
  const { username, history } = props;
  const [price, setPrice] = useState(0);
  const [beds, setBeds] = useState(0);
  const [baths, setBaths] = useState(0);
  const [address, setAddress] = useState("");
  const [searchOpt, setSearchOpt] = useState(false);
  const [minPriceOpt, setMinPriceOpt] = useState(false);
  const [maxPriceOpt, setMaxPriceOpt] = useState(false);
  const renderCheck = username ? <h1>Hello, {username}</h1> : "";

  function searchClickOpen() {
    setSearchOpt(true);
  }

  function searchClickClose() {
    setSearchOpt(false);
  }

  function searchClick(evt) {
    setAddress(evt.target.value);
  }

  function handlePrice(evt) {
    let price = Number(evt.target.value);
    setPrice(price);
  }

  console.log(address);

  return (
    <React.Fragment>
      {renderCheck}
      <Container maxWidth="md">
        <Box
          m={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            bgcolor: "lightblue",
            height: "40vh",
          }}
        >
          <Stack spacing={2}>
            <AppBar position="static">
              <div className={classes.searchContainer}>
                <SearchIcon
                  className={classes.searchIcon}
                  onClick={() => {
                    history.push("/map");
                  }}
                />
                <TextField
                  className={classes.searchInput}
                  value={address}
                  onChange={searchClick}
                  label="Enter an address, city, or ZIP code"
                  variant="standard"
                />
              </div>
            </AppBar>
            <Button
              variant="contained"
              color="primary"
              style={{
                height: 40,
                width: 400,
                background: "#72bcd4",
              }}
              onClick={searchClickOpen}
            >
              Custom your search
            </Button>
            <Dialog open={searchOpt} onClose={searchClickClose}>
              <DialogContent>
                <Box
                  noValidate
                  component="form"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    zIndex: "tooltip",
                  }}
                >
                  <FormControl sx={{ m: 1, minWidth: 80 }}>
                    <InputLabel htmlFor="price">Price</InputLabel>
                    <NativeSelect
                      autoFocus
                      value={price}
                      onChange={handlePrice}
                      label="price"
                      autoWidth
                    >
                      <option value="0">$0</option>
                      <option value="100000">$100,000+</option>
                      <option value="200000">$200,000+</option>
                      <option value="300000">$300,000+</option>
                      <option value="400000">$400,000+</option>
                      <option value="500000">$500,000+</option>
                    </NativeSelect>
                  </FormControl>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={searchClickClose}>Cancel</Button>
                <Button onClick={searchClickClose}>Search</Button>
              </DialogActions>
            </Dialog>
          </Stack>
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
    </React.Fragment>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
