const { configureStore } = require('@reduxjs/toolkit')

const games = require('./games')
const scores = require('./scores')

const store = configureStore({
    reducer: {
        games: games.reducer,
        scores: scores.reducer,
    },
})

module.exports = store
