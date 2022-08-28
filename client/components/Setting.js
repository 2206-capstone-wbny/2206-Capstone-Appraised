import React from 'react'
import {connect} from 'react-redux'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { updateUser, deleteUser } from "../store/auth";
/**
 * COMPONENT
 */

class Setting extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
      id: this.props.auth.id,
      firstName: null,
      lastName: null,
      imageUrl: null,
      phoneNumber: null,
      email: null,
      username:null,
      password: null,
      open: false,
      open1: false,
      open2: false,
      open3: false,
      open4: false,
      open5: false,
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
    this.handleClickOpen - this.handleClickOpen.bind(this)
    this.handleClose - this.handleClose.bind(this)
  }
  
  handleClickOpen = () => {
    this.setState({
    [event.target.id]: true})
  };

  handleClose = () => {
    this.setState({
    [event.target.id]: false})
  };
  
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    this.props.updateUser({ ...this.state});
    this.handleClose()
  }
  
  deleteAccount() {
    // console.log(this.props)
    this.props.deleteUser(this.state.id);
  }
  
  componentDidMount() {
    const { auth } = this.props;
    this.setState({
      firstName: auth.firstName,
      lastName: auth.lastName,
      imageUrl: auth.imageUrl,
      phoneNumber: auth.phoneNumber,
      email: auth.email,
      username: auth.username,
      password: auth.password
    });
  }
    
  render() {
  const { firstName, lastName, imageUrl, phoneNumber, email, username, password } = this.state;
  // console.log(this.state)
  return (
    <div className="setting-outer">
    
    
    <div className="setting-img">
    <img className="accountImage" src={imageUrl == null? "https://tise-static.telenorcdn.net/profile-pictures/5fa982dbe2fe150012e3930e/32ff5636-7dae-42ec-9e32-e6846afda0ad": imageUrl}/>
    <Stack direction="row" alignItems="center" spacing={2}>
      <Button style={{backgroundColor: "#21b6ae"}}
    variant="contained" component="label">
        Upload
        <input hidden accept="image/*" multiple type="file" />
      </Button></Stack>
    </div>
    
    
    <div className="setting-inner1">
    <h1>Personal Information</h1>
    
    <p class='titleforedit' >First Name</p>
    <p className="accountinfo">{firstName == null? 'N/A' : firstName}</p>
    <Button variant="outlined" id="open" style={{backgroundColor: "white", float: 'right', marginRight: '4%', top: '-46px', top: '-46px'}} onClick={this.handleClickOpen} >
        EDIT
      </Button>
      <Dialog open={this.state.open} onClose={this.handleClose}>
        <DialogContent>
          <TextField
            autoFocus
            name="firstName"
            value={firstName}
            onChange={this.handleChange}
            margin="dense"
            id="open"
            label="First Name"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button id="open" onClick={this.handleClose}>Cancel</Button>
          <Button id="open" onClick={this.handleSubmit}>Update</Button>
        </DialogActions>
      </Dialog>
      
      
    <hr/>
    <p class='titleforedit' >Last Name</p>
    <p className="accountinfo">{lastName == null? 'N/A' : lastName}</p>
   
    <Button variant="outlined" id="open1" style={{backgroundColor: "white", float: 'right', marginRight: '4%', top: '-46px'}} onClick={this.handleClickOpen}>
        EDIT
      </Button>
      <Dialog open={this.state.open1} onClose={this.handleClose}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="lastName"
            value={lastName}
            onChange={this.handleChange}
            label="Last Name"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button id="open1" onClick={this.handleClose}>Cancel</Button>
          <Button id="open1" onClick={this.handleSubmit}>Update</Button>
        </DialogActions>
      </Dialog>
      
      
    <hr/>
    <p class='titleforedit' >Email Adress</p>
    <p className="accountinfo">{email == null? 'N/A' : email}</p>
    
    <Button variant="outlined" id="open2" style={{backgroundColor: "white", float: 'right', marginRight: '4%', top: '-46px'}} onClick={this.handleClickOpen}>
        EDIT
      </Button>
      <Dialog open={this.state.open2} onClose={this.handleClose}>
        <DialogContent>
          <TextField
            autoFocus
            name="email"
            value={email}
            onChange={this.handleChange}
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button id="open2" onClick={this.handleClose}>Cancel</Button>
          <Button id="open2" onClick={this.handleSubmit}>Update</Button>
        </DialogActions>
      </Dialog>
      
      
    <hr/>
    <p class='titleforedit' >Phone Number</p>
    <p className="accountinfo">{phoneNumber == null? 'N/A' : phoneNumber}</p>
    
    <Button variant="outlined" id="open3" style={{backgroundColor: "white", float: 'right', marginRight: '4%', top: '-46px'}} onClick={this.handleClickOpen}>
        EDIT
      </Button>
      <Dialog open={this.state.open3} onClose={this.handleClose}>
        <DialogContent>
          <TextField
            autoFocus
            name="phoneNumber"
            value={phoneNumber}
            onChange={this.handleChange}
            margin="dense"
            id="name"
            label="Phone Number"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button id="open3" onClick={this.handleClose}>Cancel</Button>
          <Button id="open3" onClick={this.handleSubmit}>Update</Button>
        </DialogActions>
      </Dialog>
      
      
    <hr/>
    
    <h1>Security</h1>
    <p class='titleforedit' >Username</p>
    <p className="accountinfo">{username == null? 'N/A' : username}</p>
    
    <Button variant="outlined" id="open4" style={{backgroundColor: "white", float: 'right', marginRight: '4%', top: '-46px'}} onClick={this.handleClickOpen}>
        EDIT
      </Button>
      <Dialog open={this.state.open4} onClose={this.handleClose}>
        <DialogContent>
          <TextField
            autoFocus
            name="username"
            value={username}
            onChange={this.handleChange}
            margin="dense"
            id="name"
            label="Username"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button id="open4" onClick={this.handleClose}>Cancel</Button>
          <Button id="open4" onClick={this.handleSubmit}>Update</Button>
        </DialogActions>
      </Dialog>
      
      
    <hr/>
    <p class='titleforedit' >Password</p>
    <p className="accountinfo">********</p>
    
    <Button variant="outlined" id="open5" style={{backgroundColor: "white", float: 'right', marginRight: '4%', top: '-46px'}} onClick={this.handleClickOpen}>
        EDIT
      </Button>
      <Dialog open={this.state.open5} onClose={this.handleClose}>
        <DialogContent>
          <TextField
            autoFocus
            name="password"
            value={password}
            onChange={this.handleChange}
            margin="dense"
            id="name"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button id="open5" onClick={this.handleClose}>Cancel</Button>
          <Button id="open5" onClick={this.handleSubmit}>Update</Button>
        </DialogActions>
      </Dialog>
      <hr/>
       <Button variant="outlined" color="error" style={{backgroundColor:'white', width: '90%', marginBottom:'30px', marginLeft: '5%', paddingTop:'10px', paddingBottom:'10px'}}>
        Delete Account
      </Button>
    </div>
    </div>
  )}
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    auth: state.auth
  }
}

const mapDispatch = (dispatch) => ({
  updateUser: (auth) => dispatch(updateUser(auth)),
  deleteUser: (id) => dispatch(deleteUser(id)),
});


export default connect(mapState, mapDispatch)(Setting)