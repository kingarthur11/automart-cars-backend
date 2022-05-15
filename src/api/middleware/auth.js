const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const config = require('../../config/vars');

const verifyToken = {
  verify(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader === undefined) {
      throw new Error('Token not found');
    }
    const token = authHeader.split(' ')[1];

    jwt.verify(token, config.jwt.secret, (err, decoded) => {
      if (err) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Failed to authenticate token.');
      }
      req.id = decoded.id;
      req.email = decoded.email;
      req.token = decoded.token;
      return next();
    });
  },
};

// const setcookie = async (req, res, next) => {
//   const tokens = await tokenService.generateAuthTokens(user);
//   res.cookie('userToken', token, { maxAge: 900000, httpOnly: true });
// }

module.exports = {
  verifyToken,
  // setcookie
};