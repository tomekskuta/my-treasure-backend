const getFinish = (treasures, revealedFields) => {
    return treasures.every((treasure) =>
        revealedFields.some(
            (field) => field[0] === treasure[0] && field[1] === treasure[1]
        )
    )
}

module.exports = getFinish
