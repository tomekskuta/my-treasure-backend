const express = require('express')
const router = express.Router()

const {
    getGame,
    createGame,
    updateGame,
    deleteGame,
} = require('../../controllers/game')

router.get('/:gameId', getGame)
router.post('/', createGame)
router.patch('/', updateGame)
router.delete('/', deleteGame)

module.exports = router
