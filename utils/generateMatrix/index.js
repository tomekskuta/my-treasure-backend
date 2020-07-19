const getNextFields = (field, matrix) => {
    const nextFields = [
        [0, -1],
        [0, +1],
        [1, -1],
        [1, +1],
    ].reduce((acc, [direction, sense]) => {
        const nextField = field.map((coordinate, index) =>
            index === direction ? coordinate + sense : coordinate
        )
        const isInMatrix = nextField.every((coord) => coord > -1 && coord < 5)
        const hasValue =
            matrix[nextField[0]] && matrix[nextField[0]][nextField[1]]
        return isInMatrix && !hasValue ? [...acc, nextField] : acc
    }, [])
    return nextFields
}

const asignNextFields = ({ fields, status, matrix }) => {
    const newMatrix = fields.reduce((acc, [row, column]) => {
        if (acc[row] && acc[row][column]) {
            return acc
        }

        const mappedRow = acc[row].map((element, columnIndex) =>
            columnIndex === column ? status : element
        )
        acc[row] = mappedRow
        return acc
    }, matrix)

    if (status === 1) {
        return newMatrix
    }

    const nextFields = Object.values(newMatrix).reduce((acc, row, rowIndex) => {
        const fieldsInRow = row.reduce(
            (a, element, columnIndex) =>
                element === status
                    ? a.concat(
                          getNextFields([rowIndex, columnIndex], newMatrix)
                      )
                    : a,
            []
        )
        return acc.concat(fieldsInRow)
    }, [])
    const nextStatus = status === 'T' ? 3 : status - 1

    // eslint-disable-next-line no-unused-vars
    return asignNextFields({
        fields: nextFields,
        status: nextStatus,
        matrix: newMatrix,
    })
}

const generateMatrix = (treasures) => {
    const emptyRow = new Array(5).fill(null)
    const matrix = new Array(5).fill(emptyRow)
    return asignNextFields({ fields: treasures, status: 'T', matrix })
}

module.exports = generateMatrix
