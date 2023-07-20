import React, { useState } from 'react'
import moment from 'moment';
import { DatePicker } from 'antd';
const availableHours = Array.from({ length: 12 }, (_, index) => index + 9);

const TimeAvailable = () => {

    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");

    const dateFormat = 'DD/MM/YYYY';
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
      };

    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    };

    return (
        <div>
            <label className='mb-2'>
                เลือกวันที่:
                <DatePicker
                    value={selectedDate ? moment(selectedDate, dateFormat) : null} // Set the selected date
                    onChange={handleDateChange} // Handle date change event
                    format={dateFormat} // Specify the date format
                />
            </label>
            <br />
            <label className='mb-2'>
                เลือกเวลา:
                <select value={selectedTime} onChange={handleTimeChange}>
                    <option className='h-20'>-- โปรดเลือกเวลา --</option>
                    {availableHours.map((hour) => (
                        <option key={hour} value={hour}>
                            {hour}.00 น.
                        </option>
                    ))}
                </select>
            </label>
            <br />
            {selectedDate && selectedTime && (
                <p>
                    คุณได้ทำการจองวันที่ {selectedDate} เวลา {selectedTime}.00 น.
                </p>
            )}
        </div>
    );
}

export default TimeAvailable;