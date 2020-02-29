const User = require('../models').User
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
  console.log(req.body)
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)
  try {
    const user =  await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    })
    console.log(user)
    res.setHeader('Content-Type', 'application/json')
    res.status(200).send(JSON.stringify(user, ['id', 'name', 'email']))

  } catch (error) {
    res.status(500).send(JSON.stringify({ error: error }))
  }
}


module.exports = {
  register
}