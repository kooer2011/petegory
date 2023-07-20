import React, { Component } from 'react'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
export class FormPersonalDetails extends Component {
  

 continue = e =>{
  e.preventDefault();
  this.props.nextStep();
 }



 
  render() {
    const {values,handleChange} =this.props;
  
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
      <FormControl >  
        <TextField
          hintText="Enter Your PetName"
          placeholder="PetName"
        onChange={handleChange('petName')}
        defaultValue={values.petName}
        />
        <br/>
        <TextField
          hintText="Enter Your number"
          placeholder="Number"
        onChange={handleChange('number')}
        defaultValue={values.number}
        />
        <br/>
        
        <Select
        hintText="Enter Your type pet"
        onChange={handleChange}
        defaultValue={values.petType['']}
     
        >
          
          <MenuItem value={values.petType[1]}>Cat</MenuItem>
          <MenuItem value={values.petType[2]}>Dog</MenuItem>
        </Select>
        
        <br/>
        <Button color="secondary"
        
        onClick={this.continue}
        
        >Continue</Button>
        </FormControl>
        </Box>
        
      </React.Fragment>



     </ThemeProvider>
    )
  }
}


const styles ={
  button:{
    margin:15
  }
}
export default FormPersonalDetails
