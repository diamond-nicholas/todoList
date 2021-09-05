import clearElement from '../src/utilis';

test('clearElement clears form fields', () => {
  expect(clearElement('daily')).toBe(undefined);
});
