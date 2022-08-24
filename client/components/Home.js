import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {
  Container,
  DialogContent,
  DialogActions,
  Box,
  CssBaseline,
  TextField,
  Dialog,
  DialogContentText,
} from "@mui/material";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;
  const [price, setPrice] = useState(0);
  const [beds, setBeds] = useState(0);
  const [baths, setBaths] = useState(0);
  const [address, setAddress] = useState(null);
  const [searchAd, setSearchAd] = useState(false);
  const renderCheck = username ? <h1>Hello, {username}</h1> : "";

  function searchClickOpen() {
    setSearchAd(true);
  }

  function searchClickClose() {
    setSearchAd(false);
  }

  function searchClick(evt) {
    setAddress(evt.target.value);
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
            <Button
              variant="contained"
              color="primary"
              style={{ height: 40, width: 250, background: "#72bcd4" }}
              onClick={searchClickOpen}
            >
              Search
            </Button>
            <Dialog open={searchAd} onClose={searchClickClose}>
              <DialogContent>
                <DialogContentText>Please enter address.</DialogContentText>
                <TextField
                  autoFocus
                  value={address}
                  onChange={searchClick}
                  margin="dense"
                  id="name"
                  label="Address"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={searchClickClose}>Cancel</Button>
                <Button onClick={searchClickClose}>Search</Button>
              </DialogActions>
            </Dialog>
            <Button
              variant="contained"
              color="primary"
              style={{
                height: 40,
                width: 250,
                background: "#72bcd4",
              }}
            >
              Custom your search
            </Button>
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
