const calculateCost = (rate, storage) => {
  return rate * storage * 100;
};

export const cost = storage => {
  if (storage <= 10) return calculateCost(4, storage);
  if (storage <= 100) return calculateCost(2, storage);
  return calculateCost(1, storage);
};
