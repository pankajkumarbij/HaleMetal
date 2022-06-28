import jwt from 'jsonwebtoken';

const jwtAuth = {

  generateAccessToken(mobile,fName, lName, email, id, type) {
    return jwt.sign({ mobile, fName, lName, email, id, type }, process.env.TOKEN_SECRET, { expiresIn: '6h' });
  }
    
}

module.exports = jwtAuth;