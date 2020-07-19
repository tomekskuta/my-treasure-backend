const express = require('express')
const router = express.Router()

const { createValidator, updateValidator } = require('../../validators')

const { getGame, createGame, updateGame } = require('../../controllers/game')

router.get('/:gameId', getGame)
router.post('/', createValidator, createGame)
router.patch('/', updateValidator, updateGame)

module.exports = router
