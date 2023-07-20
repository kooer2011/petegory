import React, { useState } from 'react';
import './datetime.css';

import { TimePicker } from 'antd';
import { DatePicker, Space } from 'antd';

const AvailableTimeSlots = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);

  // Mock data for available time slots
  const availableTimeSlots = {
    '2023-07-06': ['10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM'],
    '2023-07-07': ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'],
    '2023-07-08': ['1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'],
  };
  const format = 'HH';

  const handleDateChange = event => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate);

    // Retrieve available time slots based on selected date
    const times = availableTimeSlots[selectedDate] || [];
    setAvailableTimes(times);
  };

  return (
    <div>
      <label>Select a date:</label>
      <input type="date" onChange={handleDateChange} />
      <input type="time" onChange={handleDateChange} />
     

      {selectedDate && (
        <div>
          <p>Available times on {selectedDate}:</p>
          {availableTimes.length > 0 ? (
            <ul className="container_datetime">
              {availableTimes.map((time, index) => (
                <li key={index}>{time}</li>
              ))}
            </ul>
          ) : (
            <p>No available times for selected date.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AvailableTimeSlots;
