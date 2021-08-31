const clearElement = require('../utilis');

test('clearElement clears form fields', () => {
  expect(clearElement('daily')).toBe(undefined);
});
