const store = require('../store')

exports.getGame = (req, res, next) => {
    const { topTen } = store.getState()
    res.send(topTen)
}

exports.createGame = (req, res, next) => {
    res.send('game created')
}

exports.updateGame = (req, res, next) => {
    res.send('game updated')
}
