import express from "express";
import Hotel from "../models/Hotel.js"

const router = express.Router(); 


//Create
router.post("/", async (req, res)=>{

    const newHotel = new Hotel(req.body)
    try{
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    }catch(err){
        res.status(500).json(err)
    }
})

//Read
router.get("/:id", async (req, res) => {
    try{
        const hotel = await Hotel.findById(req.params.id)
        if (!hotel){
            res.status(404).json(`Hotel nº ${req.params.id} not found`)
        }
        else{
            res.status(200).json(hotel)
        }
    }catch(err){
        res.status(500).json(err)
    }
})

router.get("/", async (req,res) => {
    try{
        const allHotels = await Hotel.find()
        res.status(200).json(allHotels)
    }catch(err){
        res.status(500).json(err)
    }
})

//Update

router.put("/:id", async (req, res) => {
    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(updatedHotel)
    }catch(err){
        res.status(500).json(err)
    }
})

//Delete

router.delete("/:id", async (req, res) => {
    try{
        const query = await Hotel.findByIdAndDelete(req.params.id)
        if (!query){
            res.status(404).json(`Hotel nº ${req.params.id} not found`)
        }
        else{
            res.status(200).json(`Hotel nº ${req.params.id} deleted`)
        }
    }catch(err){
        res.status(500).json(err)
    }
})


export default router