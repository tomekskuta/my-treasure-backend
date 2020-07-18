const { configureStore } = require('@reduxjs/toolkit')

const games = require('./games')

const store = configureStore({
    reducer: {
        games: games.reducer,
    },
})

module.exports = store
