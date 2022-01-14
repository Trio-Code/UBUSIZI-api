/* eslint-disable import/prefer-default-export */
export const extension = (file) => {
  const { content } = file;
  const ext = content.name.split('.').pop();
  return ext;
};
