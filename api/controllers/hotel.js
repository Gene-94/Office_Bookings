import { createError } from "../utils/error.js";
import Hotel from "../models/Hotel.js"

export const createHotel = async (req, res, next) => {
    try{
        const newHotel = new Hotel(req.body)
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    }catch(err){
        next(err)
    }
}
export const getHotel = async (req, res, next) => {
    try{
        const hotel = await Hotel.findById(req.params.id)
        if (!hotel) return next(createError(404, `Hotel nº ${req.params.id} not found`))
        res.status(200).json(hotel)
    }catch(err){
        next(err)
    }
}
export const getHotels = async (req, res, next) => {
    try{
        const allHotels = await Hotel.find()
        res.status(200).json(allHotels)
    }catch(err){
        next(err)
    }
}
export const updateHotel = async (req, res, next) => {
    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        if (!updatedHotel) return next(createError(404, `Hotel nº ${req.params.id} not found`))
        res.status(200).json(updatedHotel)
    }catch(err){
        next(err)
    }
}
export const deleteHotel = async (req, res, next) => {
    try{
        const query = await Hotel.findByIdAndDelete(req.params.id)
        if (!query) return next(createError(404, `Hotel nº ${req.params.id} not found`))
        res.status(200).json(`Hotel nº ${req.params.id} deleted`)

    }catch(err){
        next(err)
    }
}

export const countByCity = async (req, res, next) => {
    try{
        const cities = req.query.cities.split(",")

        const list = await Promise.all(cities.map(city =>{
            return Hotel.countDocuments({city:city})
        }))

        res.status(200).json(list)
    }catch(err){
        next(err)
    }
}

export const countByType = async (req, res, next) => {
    try{
        const hotel = await Hotel.findById(req.params.id)
        if (!hotel) return next(createError(404, `Hotel nº ${req.params.id} not found`))
        res.status(200).json(hotel)
    }catch(err){
        next(err)
    }
}