const savedHistory = [
  { squares: [null, null, null, null, null, null, null, null, null] },
  { squares: ['X', null, null, null, null, null, null, null, null] },
  { squares: ['X', 'O', null, null, null, null, null, null, null] },
  { squares: ['X', 'O', null, null, null, 'X', null, null, null] },
  { squares: ['X', 'O', null, null, 'O', 'X', null, null, null] },
];

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const fetchSavedHistory = () =>
  delay(500).then(() => savedHistory);
