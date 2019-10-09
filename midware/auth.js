const USER = require('../models/user');

module.exports = async (req, res, next) => {
  console.log(req.headers);
  next();
}