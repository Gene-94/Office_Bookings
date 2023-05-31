import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js"
import jwt from "jsonwebtoken"

export const register = async (req, res, next) => {
    try{
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })

        await newUser.save()
        res.status(201).send(`user created with id ${newUser.id}`)
    }catch(err){
        next(err)
    }
}

export const login = async (req, res, next) => {
    try{
        const user = await User.findOne({username:req.body.username})
        if (!user) return next(createError(404, `user ${req.body.username} not found`))
        if(! bcrypt.compareSync(req.body.password, user.password)) return next(createError(401, `wrong password`))
        
        const token = jwt.sign({id:user.id, isAdmin:user.isAdmin}, process.env.JWTKEY)

        //hide sensible data
        const {password, isAdmin, ...Other} = user._doc
        
        res.cookie("access_token", token, {httpOnly:true}).status(201).json({...Other})
    }catch(err){
        next(err)
    }
}