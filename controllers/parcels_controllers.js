const Parcel = require('../models').Parcel

const index = async (req, res) => {
  try {
    const parcels = await Parcel.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt']}
    })
    console.log(parcels.dataValues)
    res.setHeader('Content-Type', 'application/json')
    res.status(200).send(JSON.stringify({ data: parcels }))
  } catch (error) {
    res.status(500).send(JSON.stringify({ error: error }))
  }
}

const create = async (req, res) => {
  console.log(req.body)
  try {
    const parcel = await Parcel.create({
      type: req.body.type,
      weight: req.body.weight,
      volume: req.body.volume,
      recipient: req.body.recipient,
      address: req.body.address,
      city: req.body.city,
      zipcode: req.body.zipcode,
  })
    res.setHeader('Content-type', 'application/json')
    res.status(200).send(JSON.stringify( parcel, ['id', 'type', 'weigth', 'volume', 'recipient', 'address', 'city', 'zipcode'] ))

  } catch (error) {
    res.setHeader('Content-type', 'application/json')
    res.status(400).send(JSON.stringify({
      error: error
    }))
  }
}

module.exports = {
  index, create
}