const Parcel = require('../../models').Parcel

module.exports = async function cleanup() {
  await Parcel.destroy({ where: {} })
}