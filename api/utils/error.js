import mongoose from 'mongoose';

export const createError = (status, message) => {
    const err = new Error()
    err.status = status
    err.message = message
    return err
}

export const handleError = (err, next) => {
    if (err instanceof mongoose.Error.ValidationError){
        err.status = 400;
        return next(err);
    }
    if (err.name === 'CastError' && err.kind === 'ObjectId') return next(createError(400, "Invalid id"));
    if (err.keyPattern && err.keyPattern.username && err.code === 11000) {
        return next(createError(409, `Username already exists. Please choose a different username.`))
    }
    if (err.keyPattern && err.keyPattern.email && err.code === 11000) {
        return next(createError(409, `Email already registered. Please choose a different email.`))
    }
    if (err.name === 'CastError') {
        const invalidField = Object.keys(err.errors)[0];
        return next(createError(400, `Invalid data type for ${invalidField}`));
    }
    if (err.message.includes('Illegal arguments')) {
        return next(createError(400, 'Wrong data format for one of the fields'));
      }
      return next(err);
}