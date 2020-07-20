const { v4: uuidv4 } = require('uuid')
const pick = require('lodash.pick')
const { validationResult } = require('express-validator')
const store = require('../store')
const { gamesSelectors, actions } = require('../store/games')
const getRevealedWithStatus = require('../utils/getRevealedWithStatus')

exports.getGame = (req, res) => {
    const { gameId } = req.params
    const currentGame = gamesSelectors.selectById(store.getState(), gameId)

    if (!currentGame) {
        res.status(404).send('Not found')
        return
    }

    if (currentGame.finished) {
        res.status(403).send('Forbidden')
        return
    }

    const resGame = pick(currentGame, [
        'id',
        'userName',
        'score',
        'finished',
        'revealedFields',
    ])
    resGame.revealedFields = getRevealedWithStatus(
        resGame.revealedFields,
        currentGame.matrix
    )
    res.json(resGame)
}

exports.createGame = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const { userName } = req.body

    const newGamePayload = {
        id: uuidv4(),
        userName,
    }

    store.dispatch(actions.addGame(newGamePayload))
    const newGame = gamesSelectors.selectById(
        store.getState(),
        newGamePayload.id
    )
    const resGame = pick(newGame, [
        'id',
        'userName',
        'score',
        'finished',
        'revealedFields',
    ])

    res.status(201).json(resGame)
}

exports.updateGame = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const getCurrentGame = () =>
        gamesSelectors.selectById(store.getState(), req.body.id)

    const currentGameBeforeUpdate = getCurrentGame()
    if (!currentGameBeforeUpdate) {
        return res.status(404).send('Game not found')
    }
    if (currentGameBeforeUpdate.finished) {
        return res.status(403).send('Forbidden')
    }

    store.dispatch(actions.updateGame(req.body))
    const {
        id,
        userName,
        score,
        finished,
        revealedFields,
        matrix,
    } = getCurrentGame()

    const topScores = finished
        ? gamesSelectors
              .selectAll(store.getState())
              .filter(({ finished }, index) => finished && index < 10)
        : undefined

    const resBody = {
        id,
        userName,
        score,
        finished,
        revealedFields: getRevealedWithStatus(revealedFields, matrix),
        topScores,
    }

    res.status(200).json(resBody)
}
