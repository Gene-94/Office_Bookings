import express from "express";
import { createHotel } from "../controllers/hotel.js";
import { getHotel } from "../controllers/hotel.js";
import { getHotels } from "../controllers/hotel.js";
import { updateHotel  } from "../controllers/hotel.js";
import { deleteHotel  } from "../controllers/hotel.js";

const router = express.Router(); 


//Create
router.post("/", createHotel)

//Read
router.get("/:id", getHotel)

router.get("/", getHotels)

//Update

router.put("/:id", updateHotel)

//Delete

router.delete("/:id", deleteHotel)


export default router