const store = require('../store')

exports.getScores = (req, res, next) => {
    const { games } = store.getState()
    res.send(games)
}

exports.getBest = (req, res, next) => {
    const { games } = store.getState()
    res.send(games)
}
