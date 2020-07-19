const getFinish = (revealedFields, matrix) => {
    if (
        !Array.isArray(revealedFields) ||
        !Array.isArray(matrix) ||
        matrix.every((row) => !Array.isArray(row))
    ) {
        return false
    }

    return (
        revealedFields
            .map(([row, column]) => matrix[row][column])
            .filter((status) => status === 'T').length === 3
    )
}

module.exports = getFinish
