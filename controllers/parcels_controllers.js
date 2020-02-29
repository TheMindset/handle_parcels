const Parcel = require('../models').Parcel
const calculate_price = require('../helpers/calculate_price')

const index = async (req, res) => {
  try {
    const parcels = await Parcel.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt']}
    })
    res.setHeader('Content-Type', 'application/json')
    res.status(200).send(JSON.stringify({ data: parcels }))
  } catch (error) {
    res.status(500).send(JSON.stringify({ error: error }))
  }
}

const show = async (req, res) => {
  try {
    const parcel = await Parcel.findOne({
      attributes: { exclude: ['createdAt', 'updatedAt']},
      where: {
        id: req.params.id
      }
    })

    if (parcel) {
      res.setHeader('Content-Type', 'application/json')
      res.status(200).send(JSON.stringify({ data: parcel }))   
    } else {
      res.setHeader('Content-Type', 'application/json')
      res.status(401).send(JSON.stringify({ error: "The ID specified doesn't exists" }))
    }
  } catch (error) {
    res.status(500).send(JSON.stringify({ error: error }))
  }
}

const create = async (req, res) => {
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
    res.status(200).send(JSON.stringify( parcel, ['id', 'type', 'weight', 'volume', 'recipient', 'address', 'city', 'zipcode'] ))

  } catch (error) {
    res.setHeader('Content-type', 'application/json')
    res.status(400).send(JSON.stringify({
      error: error
    }))
  }
}

const update = async (req, res) => {
  try {
    const parcel = await Parcel.findOne({
      where: {
        id: req.params.id
      }
    })

    if (parcel) {
      await parcel.update({
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
    } else {
      res.setHeader('Content-Type', 'application/json')
      res.status(401).send(JSON.stringify({ error: "The ID specified doesn't exists" }))
    }
  } catch (error) {
    res.status(500).send(JSON.stringify({ error: error }))
  }
}

const deletePacrel = async (req, res) => {
  try {
    const parcel = await Parcel.findOne({
      where: {
        id: req.params.id
      }
    })

    if (parcel) {
      await parcel.destroy()
      res.setHeader('Content-Type', 'application/json')
      res.status(204).send(JSON.stringify({ success: 'The parcel has been deleted' }))
    } else {
      res.setHeader('Content-Type', 'application/json')
      res.status(401).send(JSON.stringify({ error: "The ID specified doesn't exists" }))
    }
  } catch (error) {
    res.status(500).send(JSON.stringify({ error: error }))
  }
}

const estimatePrice = async (req, res) => {
  try {
    const parcel = await Parcel.findOne({
      where: {
        id: req.params.id
      }
    })

    if (parcel) {
      await parcel.update({
        price: calculate_price(parcel.dataValues.type, parcel.dataValues.weight)
      })
      res.setHeader('Content-type', 'application/json')
      res.status(200).send(JSON.stringify( parcel, ['id', 'type', 'weigth', 'volume', 'price', 'recipient', 'address', 'city', 'zipcode'] ))  
    } else {
      res.setHeader('Content-Type', 'application/json')
      res.status(401).send(JSON.stringify({ error: "The ID specified doesn't exists" }))
    }
  } catch (error) {
    res.status(500).send(JSON.stringify({ error: error }))
  }
}

module.exports = {
  index, 
  create, 
  show, 
  update, 
  deletePacrel, 
  estimatePrice
}