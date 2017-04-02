import React from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';

const DatePicker = ({ date, placeholder, onChange }) =>
  <div>
    <FormControl
      type="date"
      value={date}
      placeholder={placeholder}
      onChange={onChange}
    />
  </div>;

export default DatePicker;
