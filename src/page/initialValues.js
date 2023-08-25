export const initialValues = {
  PetName: {
    value: '',
    error: '',
    required: true,
    validate: 'text',
    minLength: 2,
    maxLength: 20,
    helperText: 'Custom error message',
  },
  Name: {
    value: '',
    error: '',
    required: true,
    validate: 'text',
    minLength: 2,
    maxLength: 20,
  },
  email: {
    value: '',
    error: '',
    validate: 'email',
  },
  pet_type: {
    value: '',
    error: '',
    validate: 'select',
  },
  date: {
    value: '',
    error: '',
  },
  time: {
    value: '',
    error: '',
  },
  addon: {
    value: [],
    error: '',
    validate: 'select',
  },
  agreenemt: {
    value: false,
    error: '',
    required: true,
    validate: 'checkbox',
    helperText: 'Please accept our terms and conditions',
  },
  phone: {
    value: '',
    error: '',
    validate: 'phone',
    maxLength: 15,
  },
};
