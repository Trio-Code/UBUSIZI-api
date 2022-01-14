/* eslint-disable no-param-reassign */
const username = (name) => {
  if (name === 'accounts' || name === 'profile' || name === 'users' || name === 'settings' || name === 'search' || name === 'success' || name === 'verify' || name === 'admin' || name === 'post') return false;
  return true;
};

export default username;
