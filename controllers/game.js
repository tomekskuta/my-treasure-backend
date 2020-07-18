const store = require('../store')

exports.getGame = (req, res, next) => {
    const { games } = store.getState()
    res.send(games)
}

exports.createGame = (req, res, next) => {
    res.send('game created')
}

exports.updateGame = (req, res, next) => {
    res.send('game updated')
}
