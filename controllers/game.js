const { v4: uuidv4 } = require('uuid')
const pick = require('lodash.pick')
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
        currentGame.treasures
    )
    res.send(resGame)
}

exports.createGame = (req, res) => {
    const { userName } = req.body

    if (!userName || typeof userName !== 'string') {
        res.status(422).send('userName is incorrect')
        return
    }

    const newGamePayload = {
        id: uuidv4(),
        userName,
    }

    store.dispatch(actions.addGame(newGamePayload))
    const newGame = gamesSelectors.selectById(
        store.getState(),
        newGamePayload.id
    )

    res.status(201).send(newGame)
}

exports.updateGame = (req, res, next) => {
    res.send('game updated')
}

exports.deleteGame = (req, res, next) => {
    res.send('game deleted')
}
