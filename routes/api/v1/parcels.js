const express = require('express')
const router = express.Router()
const parcelController = require('../../../controllers/parcels_controllers')

router.get('/', parcelController.index)
router.get('/:id', parcelController.show)
router.get('/:id/price', parcelController.estimatePrice)
router.post('/', parcelController.create)
router.patch('/:id', parcelController.update)
router.delete('/:id', parcelController.deletePacrel)

module.exports = router