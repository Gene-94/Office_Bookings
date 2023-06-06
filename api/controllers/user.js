import { createError } from "../utils/error.js";
import User from "../models/User.js"

export const getUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id)
        if (!user) return next(createError(404, `User nº ${req.params.id} not found`))
        res.status(200).json(user)
    }catch(err){
        next(err)
    }
}
export const getUsers = async (req, res, next) => {
    try{
        const allUsers = await User.find()
        res.status(200).json(allUsers)
    }catch(err){
        next(err)
    }
}
export const updateUser = async (req, res, next) => {
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        if (!updatedUser) return next(createError(404, `User nº ${req.params.id} not found`))
        res.status(200).json(updatedUser)
    }catch(err){
        next(err)
    }
}
export const deleteUser = async (req, res, next) => {
    try{
        const query = await User.findByIdAndDelete(req.params.id)
        if (!query) return next(createError(404, `User nº ${req.params.id} not found`))
        res.status(200).json(`User nº ${req.params.id} deleted`)
    }catch(err){
        next(err)
    }
}