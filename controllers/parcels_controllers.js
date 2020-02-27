const Parcel = require('../models').Parcel

const index = async (req, res) => {
  try {
    const parcels = await Parcel.findAll({})
    res.setHeader('Content-Type', 'application/json')
    res.status(200).send(JSON.stringify({ data: parcels }))
  } catch (error) {
    res.status(500).send(JSON.stringify({ error: error }))
  }
}

module.exports = {
  index,
}