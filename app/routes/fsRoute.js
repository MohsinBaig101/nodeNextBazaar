const express = require('express')
const router = express.Router()
const { createDir } = require('../controllers/fsModuleController/fsModule')
router.get('/create-dir', createDir)
module.exports = {
  router: router
}
