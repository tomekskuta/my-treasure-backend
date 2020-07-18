const express = require('express')
const router = express.Router()

const { getGame, createGame, updateGame } = require('../controllers/game')

router.get('/', getGame)
router.post('/', createGame)
router.patch('/', updateGame)

module.exports = router
