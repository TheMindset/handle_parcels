const Parcel = require('../../models').Parcel
const User = require('../../models').User

module.exports = async function cleanup() {
  await Parcel.destroy({ where: {} })
  await User.destroy({ where: {} })
}