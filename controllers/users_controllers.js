const User = require('../models').User
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)
  try {
    const user =  await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    })
    res.setHeader('Content-Type', 'application/json')
    res.status(200).send(JSON.stringify(user, ['id', 'name', 'email']))

  } catch (error) {
    res.status(500).send(JSON.stringify({ error: error }))
  }
}

const login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    })  
    if(!user) return res.status(401).send({ error: 'Email not found' })

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(401).send({ error: 'Invalid Password' })

    res.setHeader('Content-Type', 'application/json')
    res.status(200).send(JSON.stringify({ success: 'Logged in!' }))   
  } catch (error) {
    res.status(500).send(JSON.stringify({ error: error }))
  }
}

module.exports = {
  register, login
}