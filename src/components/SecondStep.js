import React, { useCallback, useContext, useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { AppContext } from "../page/Context";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useTheme } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import { DatePicker } from "antd";
import { FormControl, InputLabel, Typography } from "@mui/material";
import axios from "axios";

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
  "ตัดเล็บ+ตะไบเล็บ",
  "เช็ดหู",
  "ฟอกน้ำยา Malaceb เชื้อรา",
  "ฟอกน้ำยา Hexine ลดแบคทีเรีย",
  "แปรงฟัน",
];

const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

const groomdetail = ["อาบน้ำ", "ตัดขน"];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function SecondStep() {
  const [isValid, setIsValid] = useState(true);
  const [personName, setPersonName] = React.useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const theme = useTheme();
  const { formValues, handleChange, handleBack, handleNext, variant, margin } =
    useContext(AppContext);
  const { addon, date, phone, agreenemt, grooming, idline } = formValues;
  const time = formValues.time || { value: "", required: true };

  const isError = useCallback(
    () =>
      Object.keys({
        addon,
        date,
        time,
        phone,
        agreenemt,
        grooming,
        idline,
      }).some(
        (name) =>
          (formValues[name].required && !formValues[name].value) ||
          formValues[name].error
      ),
    [formValues, addon, date, time, phone, agreenemt, grooming, idline]
  );

  const isTimeBooking = async (date, time) => {
    try {
      const response = await axios.get("/api/v1/user/isTimeBooked", {
        params: {
          date,
          time,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return response.data.isBooked || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const updateRoomOptions = async () => {
    if (date && date.value) {
      const bookedTimes = await isTimeBooking(date.value, selectedTimeSlot);
      
      if (Array.isArray(bookedTimes)) {
        const updatedOptions = timeSlots.map((slot) => ({
          value: slot,
          disabled: bookedTimes.includes(slot),
        }));
        setAvailableTimeSlots(updatedOptions);
      } else {
        console.error('bookedTimes is not an array:', bookedTimes);
      }
    }
  };

  useEffect(() => {
    // ตรวจสอบว่า grooming ไม่เป็น empty array
    const groomingIsValid =
      grooming.value.length > 0 || selectedTimeSlot !== "";
    setIsValid(groomingIsValid);

    // updateRoomOptions();
  }, [grooming, selectedTimeSlot, date]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h7" style={{ color: "rgba(0, 0, 0, 0.5)" }}>
            บริการหลัก
          </Typography>
          <Select
            variant={variant}
            margin={margin}
            fullWidth
            label="Grooming"
            name="grooming"
            multiple={true}
            value={grooming.value}
            onChange={handleChange}
            input={<OutlinedInput label="Name" />}
            MenuProps={MenuProps}
            error={!isValid}
            required={grooming.required}
          >
            <MenuItem value="" disabled>
              <em>โปรดเลือกข้อมูล</em>
            </MenuItem>
            {groomdetail.map((groom) => (
              <MenuItem
                key={groom}
                value={groom}
                style={getStyles(groom, grooming.value, theme)}
              >
                {groom}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h7" style={{ color: "rgba(0, 0, 0, 0.5)" }}>
            บริการเสริม
          </Typography>
          <Select
            variant={variant}
            margin={margin}
            fullWidth
            label="Add-on"
            name="addon"
            multiple={true}
            value={addon.value}
            onChange={handleChange}
            input={<OutlinedInput label="Name" />}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, addon.value, theme)}
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
            value={date.value}
            onChange={handleChange}
            required={date.required}
          />
          {/* <TextField
            variant={variant}
            margin={margin}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            label="Time of book"
            name="time"
            type="time"
            value={time.value}
            onChange={handleChange}
            required={time.required}
          /> */}
          <FormControl variant={variant} fullWidth required={time.required}>
            <InputLabel>Time of book</InputLabel>
            <Select
              name="time"
              value={time.value}
              // value={selectedTimeSlot}
              onChange={handleChange}
              // onChange={(event) => setSelectedTimeSlot(event.target.value)}
              input={<OutlinedInput label="Time of book" />}
            >
              {timeSlots.map((slot) => (
                <MenuItem key={slot} value={slot} disabled={slot.disabled}>
                  {slot}
                </MenuItem>
              ))}
              {/* {availableTimeSlots.map((slot) => (
                <MenuItem
                  key={slot.value}
                  value={slot.value}
                  disabled={slot.disabled}
                >
                  {slot.value}
                </MenuItem>
              ))} */}
            </Select>
          </FormControl>
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
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            label="ID LINE"
            name="idline"
            placeholder="please input ID LINE"
            value={idline.value}
            onChange={handleChange}
            error={!!idline.error}
            helperText={idline.error}
            required={idline.required}
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
            label="กรุณา เช็คข้อมูล ที่กรอกให้ครับถ้วน และ ถูกต้อง"
          />
          <FormHelperText error={!!agreenemt.error}>
            {agreenemt.error}
          </FormHelperText>
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <Button onClick={handleBack} sx={{ mr: 1 }}>
          Back
        </Button>
        <Button
          variant="contained"
          disabled={!isValid || isError()}
          color="primary"
          onClick={!isError() ? handleNext : () => null}
        >
          Next
        </Button>
      </Box>
    </>
  );
}
export default SecondStep;
