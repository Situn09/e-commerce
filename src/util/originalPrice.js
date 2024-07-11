export const originalPrice = (price, discount) => {
  return (price * (1 + discount / 100)).toFixed(2);
};
