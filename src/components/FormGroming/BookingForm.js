import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
export default function BookingForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    const newBooking = {
      name,
      email,
      date,
      time,
    };

    axios.post('http://localhost:5000/booking/add', newBooking).then(res => {
      console.log(res.data);
    });

    // // Clear form inputs
    // setName('');
    // setEmail('');
    // setDate(new Date());
    // setTime('');
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        width: 300,
        height: 300,
        backgroundColor: 'primary.dark',
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <FormControl onSubmit={handleSubmit}>
        <Box mb={1} className="form-group">
          <FormLabel>Name:</FormLabel>
          <input
            type="text"
            required
            className="form-control"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Box>
        <Box mb={1} className="form-group">
          <label>Email:</label>
          <input
            type="email"
            required
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Box>
        <Box mb={1} className="form-group">
          <label>Date:</label>
          <DatePicker selected={date} onChange={date => setDate(date)} />
        </Box>
        <Box mb={2} className="form-group">
          <label>Time:</label>
          <input
            type="text"
            required
            className="form-control"
            value={time}
            onChange={e => setTime(e.target.value)}
          />
        </Box>
        <Button type="submit" variant="contained" className="btn btn-primary">
          Book
        </Button>
      </FormControl>
    </Box>
  );
}
