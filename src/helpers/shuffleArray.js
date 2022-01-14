/* eslint-disable no-plusplus */
export default (array) => {
  const x = array;
  let i; let j; let temp;
  for (i = 0; i < x.length - 1; i++) {
    j = Math.floor(Math.random() * (i + 1));
    temp = x[i];
    x[i] = x[j];
    x[j] = temp;
  }
  return x;
};
