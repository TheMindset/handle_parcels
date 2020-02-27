const express = require('express')
const router = express.Router()
const parcelController = require('../../../controllers/parcels_controllers')

router.get('/', parcelController.index)

module.exports = router