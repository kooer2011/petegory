import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import {AppContext} from '../page/Context';
import Button from '@mui/material/Button';
export default function Confirm() {
  const { formValues, handleBack, handleNext } = useContext(AppContext);
  const { PetName, Name, email, pet_type, date, time, city, phone } =
    formValues;

  const handleSubmit = e => {
    // Remove unwanted properties from formValue object
    let form = {};

    Object.keys(formValues).map(name => {
      form = {
        ...form,
        [name]: formValues[name].value,
      };
      return form;
    });
  
    // Do whatever with the values
    console.log(form);
    // Show last component or success message
    handleNext();
  };

  return (
    <>
      <List disablePadding>
        <ListItem>
          <ListItemText
            primary="Pet Name"
            secondary={PetName.value || 'Not Provided'}
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="Name"
            secondary={Name.value || 'Not Provided'}
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="Email Address"
            secondary={email.value || 'Not Provided'}
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="Pet type"
            secondary={pet_type.value || 'Not Provided'}
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="Date of book"
            secondary={date.value || 'Not Provided'}
          />
          <ListItemText
            primary="Time of book"
            secondary={time.value || 'Not Provided'}
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="City"
            secondary={city.value + '' || 'Not Provided'}
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="phone"
            secondary={phone.value || 'Not Provided'}
          />
        </ListItem>
      </List>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button sx={{ mr: 1 }} onClick={handleBack}>
          Back
        </Button>
        <Button variant="contained" color="success" onClick={handleSubmit}>
          Confirm & Continue
        </Button>
      </Box>
    </>
  );
}
