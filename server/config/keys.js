const PORT = process.env.PORT;
const JWT_KEY = process.env.JWT_KEY;
const GMAIL_PW = process.env.GMAIL_PW;

// use test database if environment is set to 'test'
const MONGO_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.MONGO_URI_TEST
    : process.env.MONGO_URI;

module.exports = {
  PORT,
  MONGO_URI,
  JWT_KEY,
  GMAIL_PW,
};
