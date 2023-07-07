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
        type: 'text',
        value: 'password',
      },
      {
        label: 'PetType',
        type: 'select',
        value: 'select',
        options: ['CAT', 'DOG'],
      },
    ],
  },
  {
    section: 2,
    items: [
      {
        label: 'บริการเสริม',
        type: 'add-on',
        value: 'add-on',
      },
      {
        label: 'Breed',
        type: 'select',
        value: 'select',
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
  {},
];
export default questions;
