import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RadioButtonsGroup() {
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        row
      >
        <FormControlLabel  value="سفارش های تحویل شده" control={<Radio />} label="سفارش های تحویل شده" />
        <FormControlLabel value="سفارش های در انتظار ارسال" control={<Radio />} label="سفارش های در انتظار ارسال" />
      </RadioGroup>
    </FormControl>
  );
}
