const { body } = require('express-validator')

exports.createValidator = [body('userName').isString().notEmpty()]

exports.updateValidator = [
    body('id').isString().notEmpty(),
    body('revealedFields').custom((value) => {
        const revealdFieldsAreCorrect =
            Array.isArray(value) &&
            value.length > 0 &&
            value.length < 4 &&
            value.every(
                (field) =>
                    Array.isArray(field) &&
                    field.length === 2 &&
                    field.every(
                        (coordinate) =>
                            Number.isInteger(coordinate) &&
                            coordinate > -1 &&
                            coordinate < 5
                    )
            )

        if (revealdFieldsAreCorrect) {
            return true
        }

        throw new Error('revealedFields are incorrect.')
    }),
]
