export const createError = (status, message) => {
    const err = new Error()
    err.status = status
    err.message = message
    return err
}

export const handleError = (err, next) => {
    if (err.name === 'CastError' && err.kind === 'ObjectId') return next(createError(400, "Invalid id"));
    if (err.keyPattern && err.keyPattern.username && err.code === 11000) {
        return next(createError(409, `Username already exists. Please choose a different username.`))
    }
    if (err.keyPattern && err.keyPattern.email && err.code === 11000) {
        return next(createError(409, `Email already registered. Please choose a different email.`))
    }
    return next(err);
}