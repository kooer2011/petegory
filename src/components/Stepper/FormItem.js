import { Form } from 'react-bootstrap';
import { useState } from 'react';
import Select from 'react-select';
import makeAnimate from 'react-select/animated';
import AvailableTimeSlots from './AvailableTimeSlots';
import { Confirm } from './Confirm';
export const FormItem = ({ item, onChange, answer,}) => {
  const [currentValue, setCurrentValue] = useState(answer || null);
  //
  const animatedComponent = makeAnimate();
  const handleChange = value => {
    setCurrentValue(value);
    onChange(value, item.value);
  };
  const adding = [
    {
      value: 'product1',
      label: 'ตัดเล็บ-ตะไบเล็บ',
    },
    { value: 'product 2', label: 'เช็ดหู' },
    { value: 'product 3', label: 'ไถเท้าท้องก้น' },
    { value: 'product 4', label: 'ฟอกน้ำยา Malaceb' },
    { value: 'product 5', label: 'ฟอกน้ำยา Hexine' },
    { value: 'product 6', label: 'แปรงฟัน' },
  ];

  switch (item.type) {
    case 'text':
      return (
        <>
          <Form.Label>{item.label}</Form.Label>
          <Form.Control
            type="text"
            id={item.label}
            onChange={e => handleChange(e.target.value, item.value)}
            value={currentValue}
          />
        </>
      );
      break;
    case 'password':
      return (
        <>
          <Form.Label htmlFor="inputPassword5">{item.label}</Form.Label>
          <Form.Control
            type="password"
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
            onChange={e => onChange(e.target.value, item.value)}
          />
        </>
      );
      break;

    case 'select':
      return (
        <div className="mt-2">
          <Form.Select
            aria-label={item.label}
            onChange={e => onChange(e.target.value, item.value)}
          >
            <option>{item.label}</option>
            {item.options.map((opt, index) => {
              return <option value={opt}>{opt}</option>;
            })}
          </Form.Select>
        </div>
      );
      break;
    case 'addon':
      return (
        <div>
          <Select
            aria-label={item.label}
            components={animatedComponent}
            className="select"
            isMulti
            options={adding}
            isClearable={true}
            isSearchable={true}
            isLoading={false}
            isDisabled={false}
            isRtl={false}
          />
        </div>
      );
      break;
    

      return <></>;
  }
};
