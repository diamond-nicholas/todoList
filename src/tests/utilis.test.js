import clearElement from '../utilis';

test('clearElement clears form fields', () => {
  expect(clearElement('daily')).toBe(undefined);
});
