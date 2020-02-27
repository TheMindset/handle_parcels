const Client = require('../../models').Client

module.exports = async function cleanup() {
  await Client.destroy({ where: {} })
}