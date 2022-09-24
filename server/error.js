export const createError = (status, message) => {
  console.log('Create error', status, message);
  const err = new Error();
  err.status = status;
  err.message = message;
  return err;
};
