import express from "express";
import Hotel from "../models/Hotel.js"
import { createError } from "../utils/error.js";

const router = express.Router(); 


//Create
router.post("/", async (req, res, next)=>{

    try{
        const newHotel = new Hotel(req.body)
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    }catch(err){
        next(err)
    }
})

//Read
router.get("/:id", async (req, res, next) => {
    try{
        const hotel = await Hotel.findById(req.params.id)
        if (!hotel) return next(createError(404, `Hotel nº ${req.params.id} not found`))
        res.status(200).json(hotel)
        
    }catch(err){
        next(err)
    }
})

router.get("/", async (req, res, next) => {
    try{
        const allHotels = await Hotel.find()
        res.status(200).json(allHotels)
    }catch(err){
        next(err)
    }
    
})

//Update

router.put("/:id", async (req, res, next) => {
    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        if (!updatedHotel) return next(createError(404, `Hotel nº ${req.params.id} not found`))
        res.status(200).json(updatedHotel)
    }catch(err){
        next(err)
    }
})

//Delete

router.delete("/:id", async (req, re, next) => {
    try{
        const query = await Hotel.findByIdAndDelete(req.params.id)
        if (!query) return next(createError(404, `Hotel nº ${req.params.id} not found`))
        res.status(200).json(`Hotel nº ${req.params.id} deleted`)

    }catch(err){
        next(err)
    }
})


export default router