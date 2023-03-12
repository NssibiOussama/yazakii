const jwt = require('jsonwebtoken')
require('dotenv').config();

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers['authorization']
    if (!token) {
      return res.send('you are not authorized')
    }
    const decoded = await jwt.verify(token, process.env.SECRET_KEY)
    req.userData = decoded
    next()
  } catch (err) {
    res.status(401).send({ msg: 'Your session is not valid!' })
  }
}

module.exports = verifyToken
