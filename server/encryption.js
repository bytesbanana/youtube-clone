import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
  var salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
