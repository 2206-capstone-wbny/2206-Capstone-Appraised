import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Navbar = ({ handleClick, isLoggedIn, image }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchor, setAnchor] = React.useState(null);
  const open = Boolean(anchorEl);
  const open1 = Boolean(anchor);
  const Click = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const Click1 = (event) => {
    setAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setAnchor(null);
  };

  const iconCheck =
    image !==
    "https://icon-library.com/images/three-line-menu-icon/three-line-menu-icon-6.jpg" ? (
      <img className="profile-pic" src={image}></img>
    ) : (
      <img
        className="profile-pic"
        src="https://tise-static.telenorcdn.net/profile-pictures/5fa982dbe2fe150012e3930e/32ff5636-7dae-42ec-9e32-e6846afda0ad"
      ></img>
    );

  return (
    <div>
      <nav>
        <div id="navbar">
          <img id="nbf-logo" src="/Appraised.png" />
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}

              <Link to="/home">
                <Button>Home</Button>
              </Link>
              <Link to="/map">
                <Button>Map</Button>
              </Link>
              <Link to="/login">
                <Button>Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button>Create Account</Button>
              </Link>

              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={Click}
              >
                <img
                  className="profile-pic"
                  src="https://tise-static.telenorcdn.net/profile-pictures/5fa982dbe2fe150012e3930e/32ff5636-7dae-42ec-9e32-e6846afda0ad"
                ></img>{" "}
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <Link to="/setting">
                  <MenuItem onClick={handleClose}>Setting</MenuItem>
                </Link>
                <MenuItem onClick={(handleClose, handleClick)}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              <Link to="/home">
                <Button>Home</Button>
              </Link>
              <Link to="/map">
                <Button>Map</Button>
              </Link>
              <Link to="/login">
                <Button>Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button>Create Account</Button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    image: state.auth.imageUrl,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
