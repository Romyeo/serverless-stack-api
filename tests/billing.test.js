import { cost } from '../libs/billing.lib';

test('Lowest tier', () => {
  const storage = 10;
  const amount = 4000;
  const expected = cost(storage);
  expect(amount).toEqual(expected);
});

test('Middle tier', () => {
  const storage = 100;
  const amount = 20000;
  const expected = cost(storage);
  expect(amount).toEqual(expected);
});

test('Highest tier', () => {
  const storage = 101;
  const amount = 10100;
  const expected = cost(storage);
  expect(amount).toEqual(expected);
});
