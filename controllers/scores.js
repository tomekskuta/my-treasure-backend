const store = require('../store')

exports.getScores = (req, res, next) => {
    const { scores } = store.getState()
    res.send(scores)
}

exports.getBest = (req, res, next) => {
    const { scores } = store.getState()
    res.send(scores[0])
}
