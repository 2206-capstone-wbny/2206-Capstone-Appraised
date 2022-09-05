import accounting from "accounting";
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `$${value}`;
}

let style = {width: "80px", marginRight: '20px', marginTop: '20px', backgroundColor:'white'}

const Filter = (props) => {
  const [type, setType] = React.useState('');
  const [bed, setBed] = React.useState(null);
  const [value, setValue] = React.useState([0, 1000000]);

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleChange1 = (event) => {
    setBed(event.target.value);
  };

  const handleChange3 = (event, newValue) => {
    setValue(newValue);
  };


    return (
      <div className='filterGroup'> 
    <Box style={style}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={'House'}>House</MenuItem>
          <MenuItem value={'Apartment'}>Apartment</MenuItem>
          <MenuItem value={'Townhouse'}>Townhouse</MenuItem>
        </Select>
      </FormControl>
    </Box>
     

    <Box style={style}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Bed</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={bed}
          label="Age"
          onChange={handleChange1}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5+</MenuItem>
        </Select>
      </FormControl>
    </Box>

    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Price range'}
        value={value}
        onChange={handleChange3}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
      </div>
    );
  }


export default Filter;
