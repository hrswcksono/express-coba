const jwt = require("jsonwebtoken");
const secretCode = process.env.SECRET_CODE || "YukKuy";

const tokenGenerator = (data) => {
  const { id, username, name, email} = data;
  return jwt.sign(
    {
      id,
      username,
      name,
      email
    },
    secretCode
  );
};

const tokenVerifier = (data) => {
  return jwt.verify(data, secretCode);
};

module.exports = {
  tokenGenerator,
  tokenVerifier,
};