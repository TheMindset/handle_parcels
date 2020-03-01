const express = require('express')
const router = express.Router()
const parcelController = require('../../../controllers/parcels_controllers')
const checkToken = require('../../../middlewares/checkToken')

router.get('/', parcelController.index)
router.get('/:id', parcelController.show)
router.get('/:id/price', checkToken, parcelController.estimatePrice)
router.post('/', checkToken, parcelController.create)
router.patch('/:id', checkToken, parcelController.update)
router.delete('/:id', checkToken, parcelController.deletePacrel)

module.exports = router