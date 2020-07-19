const fieldHasProperShape = (field) =>
    Array.isArray(field) &&
    field.length === 2 &&
    field.every((coordinate) => Number.isInteger(coordinate))

const getRevealedWithStatus = (revealedFields, matrix) => {
    const isRevealdFieldsArrayWithElements =
        Array.isArray(revealedFields) && revealedFields.length

    if (!isRevealdFieldsArrayWithElements || !Array.isArray(matrix)) {
        return []
    }

    const fieldsToTransform = revealedFields.filter(fieldHasProperShape)
    const transformedFields = fieldsToTransform.map(([row, column]) => ({
        coordinates: [row, column],
        status: matrix[row] && matrix[row][column],
    }))

    return transformedFields
}

module.exports = getRevealedWithStatus
