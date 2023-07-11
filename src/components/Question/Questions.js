const questions = [
  {
    section: 1,
    items: [
      {
        label: 'Petname',
        type: 'text',
        value: 'username',
      },
      {
        label: 'number',
        type: 'password',
        value: 'number',
      },
      {
        label: 'PetType',
        type: 'select',
        value: 'PetType',
        options: ['CAT', 'DOG'],
      },
    ],
  },
  {
    section: 2,
    items: [
      {
        label: 'บริการเสริม',
        type: 'addon',
        value: 'addon',
      },
      {
        label: 'Breed',
        type: 'select',
        value: 'Breed',
        options: [
          'ปอม',
          'ชิวว่า',
          'พุดเดิ้ล',
          'ชิสุห์',
          'คอร์กี้',
          'โกลเด้น',
          'ไซบีเรียน',
          'ซามอยด์',
          'ขนสั้น',
          'ขนยาว'
        ],
      },
    ],
  },
  {
    section: 3,
    items: [
      {
        label: 'Confirm',
        type: 'Confirm',
        
      },]
  },
];
export default questions;
