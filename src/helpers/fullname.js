/* eslint-disable no-param-reassign */
const fullname = (follow) => {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < follow.length; i++) {
    const { firstname, lastname } = follow[i];
    const full = `${firstname} ${lastname}`;
    follow[i]._doc.fullname = full;
    follow[i].firstname = undefined;
    follow[i].lastname = undefined;
  }
};

export default fullname;
