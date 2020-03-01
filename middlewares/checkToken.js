const jwt = require('jsonwebtoken')

const checkToken = (req, res, next) => {
  const token = req.header('auth-token')
  if (!token) {
    res.setHeader('Content-Type', 'application/json')
    res.status(401).send(JSON.stringify({ error: 'Access denied you must login before'})) 
  }

  try {
    const verifiedToken = jwt.verify(token, process.env.SECRET_TOKEN)
    req.user = verifiedToken
    next()
  } catch (error) {
    res.setHeader('Content-Type', 'application/json')
    res.status(500).send(JSON.stringify({ error: 'Invalid Token' }))
  }
}

module.exports = checkToken