const fieldHasProperShape = (field) =>
    Array.isArray(field) &&
    field.length === 2 &&
    field.every((coordinate) => Number.isInteger(coordinate))

const getRevealedWithStatus = (revealedFields, treasures) => {
    const isRevealdFieldsArrayWithElements =
        Array.isArray(revealedFields) && revealedFields.length
    const hasTreasuresThreeProperElements =
        Array.isArray(treasures) &&
        treasures.length === 3 &&
        treasures.every(fieldHasProperShape)

    if (!isRevealdFieldsArrayWithElements || !hasTreasuresThreeProperElements) {
        return []
    }

    const fieldsToTransform = revealedFields.filter(fieldHasProperShape)
    // const transformedFields = fieldsToTransform.map(field => )

    return fieldsToTransform
}

module.exports = getRevealedWithStatus
