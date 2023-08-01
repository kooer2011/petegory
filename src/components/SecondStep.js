import React, { useCallback, useContext } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {AppContext} from '../page/Context'
import OutlinedInput from '@mui/material/OutlinedInput';
import { useTheme } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';

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

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

 function SecondStep() {
  const [personName, setPersonName] = React.useState([]);
  const theme = useTheme();
  const { formValues, handleChange, handleBack, handleNext, variant, margin } =
    useContext(AppContext);
  const { city, date, time, phone, agreenemt } = formValues;

  const isError = useCallback(
    () =>
      Object.keys({ city, date, time, phone, agreenemt }).some(
        name =>
          (formValues[name].required && !formValues[name].value) ||
          formValues[name].error
      ),
    [formValues, city, date, time, phone, agreenemt]
  );

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Select
            variant={variant}
            margin={margin}
            fullWidth
            label="City"
            name="city"
            multiple={true}
            value={city.value}
            onChange={handleChange}
            input={<OutlinedInput label="Name" />}
            MenuProps={MenuProps}
          >
            {names.map(name => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, city.value, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            label="Date of book"
            name="date"
            type="date"
            defaultValue={date.value}
            onChange={handleChange}
            required={date.required}
          />
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            label="Time of book"
            name="time"
            type="time"
            defaultValue={time.value}
            onChange={handleChange}
            required={time.required}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            label="Phone number"
            name="phone"
            placeholder="i.e: xxx-xxx-xxxx"
            value={phone.value}
            onChange={handleChange}
            error={!!phone.error}
            helperText={phone.error}
            required={phone.required}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={agreenemt.value}
                onChange={handleChange}
                name="agreenemt"
                color="primary"
                required={agreenemt.required}
              />
            }
            label="Agree to terms and conditions"
          />
          <FormHelperText error={!!agreenemt.error}>
            {agreenemt.error}
          </FormHelperText>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button onClick={handleBack} sx={{ mr: 1 }}>
          Back
        </Button>
        <Button
          variant="contained"
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
export default SecondStep