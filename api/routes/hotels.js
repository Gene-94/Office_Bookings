import express from "express";
import { countByCity, countByType, createHotel } from "../controllers/hotel.js";
import { getHotel } from "../controllers/hotel.js";
import { getHotels } from "../controllers/hotel.js";
import { updateHotel  } from "../controllers/hotel.js";
import { deleteHotel  } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router(); 


//Create
router.post("/", verifyAdmin, createHotel)

//Read
router.get("/find/:id", getHotel)

router.get("/", getHotels)

router.get("/countByCity", countByCity)

router.get("/countByType", countByType)

//Update

router.put("/:id", verifyAdmin, updateHotel)

//Delete

router.delete("/:id", verifyAdmin, deleteHotel)


export default router