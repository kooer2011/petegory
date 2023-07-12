import React, { Component } from 'react'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';

export class FormPersonalDetails extends Component {







  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  }
  back = e => {
    e.preventDefault();
    this.props.prevStep();
  }

  render() {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };





    const { values, handleChange } = this.props;

    const theme = createTheme({
      palette: {
        primary: {
          main: '#0052cc',
        },
      },
    });
    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <Box>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
          <Select
          
          id="demo-multiple-checkbox"
          multiple  
          defaultValue={values.addOn}
          onChange={handleChange}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}

          >
            {values.map((add) => (
            <MenuItem key={add} value={add}>
              {/* <Checkbox checked={personName.indexOf(name) > -1} /> */}
              <ListItemText primary={add} />
            </MenuItem>
          ))}

          </Select>
              <br />
              <Button color="secondary"

                onClick={this.back}

              >Continue</Button>
            </FormControl>
          </Box>

        </React.Fragment>



      </ThemeProvider>)
  }
}

export default FormPersonalDetails
