import express from "express";
import { createRoom, getRoom, getRooms, updateRoom, deleteRoom } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";


const router = express.Router(); 

//Create
router.post("/:hotelid", verifyAdmin, createRoom)

//Read
router.get("/:id", getRoom)

router.get("/", getRooms)

//Update

router.put("/:id", verifyAdmin, updateRoom)

//Delete

router.delete("/:id", verifyAdmin, deleteRoom)

export default router