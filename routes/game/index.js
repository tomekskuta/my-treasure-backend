const express = require('express')
const router = express.Router()

const { createValidator, updateValidator } = require('../../validators')

const {
    getGame,
    createGame,
    updateGame,
    deleteGame,
} = require('../../controllers/game')

router.get('/:gameId', getGame)
router.post('/', createValidator, createGame)
router.patch('/', updateValidator, updateGame)
router.delete('/', deleteGame)

module.exports = router
