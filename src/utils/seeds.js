
const semesterSeed = [
  { name: '1st Semester', level: 'Bachelores' },
  { name: '2nd Semester', level: 'Bachelores' },
  { name: '3rd Semester', level: 'Bachelores' },
  { name: '4th Semester', level: 'Bachelores' },
  { name: '5th Semester', level: 'Bachelores' },
  { name: '6th Semester', level: 'Bachelores' },
  { name: '7th Semester', level: 'Bachelores' },
  { name: '8th Semester', level: 'Bachelores' },
  { name: '1st Year', level: 'Masters' },
  { name: '2nd Year', level: 'Masters' },
];

const fineSeed = [{fine: 5}];

const limitSeed = [
  {
    quantity: 6,
    level: 'Bachelors',
    sub_quantity: [
      {
        quantity: 3,
        type: 'reference',
      },
      {
        quantity: 3,
        type: 'text-book',
      },
      {
        quantity: 3,
        type: 'others',
      },
    ],
  },
  {
    quantity: 5,
    level: 'Masters',
    sub_quantity: [
      {
        quantity: 2,
        type: 'reference',
      },
      {
        quantity: 3,
        type: 'text-book',
      },
      {
        quantity: 2,
        type: 'others',
      },
    ],
  },
];

module.exports = {
  semesterSeed,
  fineSeed,
  limitSeed,
}
