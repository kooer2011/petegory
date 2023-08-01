import React, { useCallback, useContext } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {AppContext} from '../page/Context'

export default function FirstStep() {
  const { formValues, handleChange, handleNext, variant, margin } =
    useContext(AppContext);
  const { PetName, Name, email, pet_type } = formValues;

  // Check if all values are not empty and if there are some errors
  const isError = useCallback(
    () =>
      Object.keys({ PetName, Name, email, pet_type }).some(
        name =>
          (formValues[name].required && !formValues[name].value) ||
          formValues[name].error
      ),
    [formValues, PetName, Name, email, pet_type]
  );

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            label="Pet Name"
            name="PetName"
            placeholder="Your pet name"
            value={PetName.value}
            onChange={handleChange}
            error={!!PetName.error}
            helperText={PetName.error}
            required={PetName.required}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            label="ชื่อเจ้าของ"
            name="Name"
            placeholder="Your last name"
            value={Name.value}
            onChange={handleChange}
            error={!!Name.error}
            helperText={Name.error}
            required={Name.required}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            label="Email"
            name="email"
            placeholder="Your email address"
            type="email"
            value={email.value}
            onChange={handleChange}
            error={!!email.error}
            helperText={email.error}
            required={email.required}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            select
            SelectProps={{
              native: true,
            }}
            label="Pet type"
            name="pet_type"
            value={pet_type.value}
            onChange={handleChange}
            error={!!pet_type.error}
            helperText={pet_type.error}
            required={pet_type.required}
          >
            <option value=""> </option>
            <option value="cat">Cat</option>
            <option value="dog">Dog</option>
          </TextField>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          sx={{ mt: 3, ml: 1 }}
          disabled={isError()}
          color="primary"
          onClick={!isError() ? handleNext : () => null}
        >
          Next
        </Button>
      </Box>
    </>
  );
}
