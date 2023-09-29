import { createError } from "../utils/error.js";
import Room from "../models/Room.js"
import Hotel from "../models/Hotel.js"

export const createRoom = async (req, res, next) => {
    try{
        const hotelId = req.params.hotelid
        const newRoom = new Room(req.body)

        if(Room.findOne({title:newRoom.title})){
            return next(createError(409, `Room ${newRoom.title} already exists`))
        }
        
        const savedRoom = await newRoom.save()

        await Hotel.findByIdAndUpdate(hotelId, {
            $push: {rooms: savedRoom.id},
        })

        res.status(200).json(savedRoom)
    }catch(err){
        next(err)
    }
}
export const getRoom = async (req, res, next) => {
    try{
        const room = await Room.findById(req.params.id)
        if (!room) return next(createError(404, `Room nº ${req.params.id} not found`))
        res.status(200).json(room)
    }catch(err){
        next(err)
    }
}
export const getRooms = async (req, res, next) => {
    try{
        const allRooms = await Room.find()
        res.status(200).json(allRooms)
    }catch(err){
        next(err)
    }
}
export const updateRoom = async (req, res, next) => {
    try{
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        if (!updatedRoom) return next(createError(404, `Room nº ${req.params.id} not found`))
        res.status(200).json(updatedRoom)
    }catch(err){
        next(err)
    }
}
export const deleteRoom = async (req, res, next) => {
    try{
        const query = await Room.findByIdAndDelete(req.params.id)
        if (!query) return next(createError(404, `Room with id ${req.params.id} not found`))

        await Hotel.findOneAndUpdate({rooms: req.params.id}, {
            $pull: {rooms: req.params.id},
        })

        res.status(200).json(`Room nº ${req.params.id} deleted`)

    }catch(err){
        next(err)
    }
}