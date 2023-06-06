import express from "express";
import { getUser } from "../controllers/user.js";
import { getUsers } from "../controllers/user.js";
import { updateUser  } from "../controllers/user.js";
import { deleteUser  } from "../controllers/user.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router(); 

//Read
router.get("/:id", verifyUser, getUser)

router.get("/", verifyAdmin, getUsers)

//Update

router.put("/:id", verifyUser, updateUser)

//Delete

router.delete("/:id", verifyUser, deleteUser)


export default router