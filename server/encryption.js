import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
  var salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (passwordA, passwordB) => {
  return await bcrypt.compare(passwordA, passwordB);
};
