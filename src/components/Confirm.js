import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { AppContext } from "../page/Context";
import Button from "@mui/material/Button";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

export default function Confirm() {
  const navigate = useNavigate();
  const { formValues, handleBack, handleNext } = useContext(AppContext);
  const {
    PetName,
    Name,
    email,
    pet_type,
    date,
    time,
    addon,
    phone,
    grooming,
    breed,
    idline,
  } = formValues;

  const isTimeBooking = async (time, date) => {
    try {
      const response = await axios.get("/api/v1/user/isTimeBooked", {
        params: {
          time,
          date,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return response.data.isBooked;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleSubmit = async () => {
    // Remove unwanted properties from formValue object
    let form = {};

    Object.keys(formValues).map((name) => {
      form = {
        ...form,
        [name]: formValues[name].value,
      };
      return form;
    });

    const isTimeAlreadyBooked = await isTimeBooking(time.value, date.value);

    if (isTimeAlreadyBooked) {
      message.error("This time is already booked.");
      return;
    }

    try {
      const res = await axios.post("/api/v1/user/bookGrooming", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      //api google sheet
      await axios.post("https://sheet.best/api/sheets/045a6e1f-dd99-49d1-9afb-4159a0084ecc",form);

      if (res.data.success) {
        message.success(res.data.message);
        handleNext();
        navigate("/grooming");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <List disablePadding>
        <ListItem>
          <ListItemText
            primary="Pet Name"
            secondary={PetName.value || "Not Provided"}
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="Name"
            secondary={Name.value || "Not Provided"}
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="Breed Pet"
            secondary={breed.value || "Not Provided"}
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="Pet type"
            secondary={pet_type.value || "Not Provided"}
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="Date of book"
            secondary={date.value || "Not Provided"}
          />
          <ListItemText
            primary="Time of book"
            secondary={time.value || "Not Provided"}
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="Grooming"
            secondary={grooming.value + "" || "Not Provided"}
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="Add on"
            secondary={addon.value + "" || "Not Provided"}
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="phone"
            secondary={phone.value || "Not Provided"}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="ID LINE"
            secondary={idline.value || "Not Provided"}
          />
        </ListItem>
      </List>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
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
