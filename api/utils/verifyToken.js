import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token) return next(createError(401, "Please authenticate before performing this action."));

    try{
        jwt.verify(token, process.env.JWTKEY, (err, user) => {
            if(err) return next(createError(403, "Invalid token."));
            req.user = user;
            next();
        })
    }catch(err){
        next(err);
    }
}

export const verifyUser = (req, res, next) => {
    try{
        verifyToken(req, res, (err) => {
            if(err) return next(err)
            if(req.user.id === req.params.id || req.user.isAdmin){
                next();
            }
            else {
                return next(createError(403, "You are not authorized to perform this action."));
            }
        });
    }catch(err){
        next(err)
    }
}

export const verifyAdmin = (req, res, next) => {
    try{
        verifyToken(req, res, (err) => {
            if(err) return next(err)
            if(req.user.isAdmin){
                next();
            }
            else {
                return next(createError(403, "You are not authorized to perform this action."));
            }
        });
    }catch(err){
        next(err)
    }
}