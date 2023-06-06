import { createError } from "./error.js";

export const validatePassword = (req, res, next) => {
    try{
        const pwd = req.body.password
        // Password must contain at least one lowercase letter, one uppercase letter, and one digit.
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/;

        if(pwd.length < 8 || pwd.length > 25) return next(createError(400, `password must be between 8 and 25 chars long`));

        if(! passwordRegex.test(pwd)) {
            return next(createError(400, `Password must contain at least one lowercase letter, one uppercase letter, and one digit.`));
        }
        return next();
    }catch(err){
        next(err)
    }
}

export const avalibleRoomDate = (req, res, next) => {
    
}