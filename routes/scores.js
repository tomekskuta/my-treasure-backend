const express = require('express')
const router = express.Router()

const { getScores, getBest } = require('../controllers/scores')

router.get('/', getScores)
router.get('/best', getBest)

module.exports = router
