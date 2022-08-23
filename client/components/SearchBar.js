import React from "react";
import { AppBar, Toolbar, Typography, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { fade, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    display: "flex",
    backgroundColor: fade(theme.palette.common.white, 0.15),
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px",
  },
  searchInput: {
    width: "200px",
    margin: "5px",
  },
}));

function SearchBar({ placeHolder, data }) {
  const classes = useStyles();
  return (
    <AppBar position="fixed" style={{ marginTop: "64px", color: "72bcd4" }}>
      <Toolbar>
        <div className={classes.searchContainer}>
          <SearchIcon className={classes.searchIcon} />
          <TextField
            className={classes.searchInput}
            label="Enter Zip, City, or State"
            variant="standard"
          />
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default SearchBar;
