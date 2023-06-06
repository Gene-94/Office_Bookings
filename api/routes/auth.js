import express from "express";
import { login, register } from "../controllers/auth.js";
import { validatePassword } from "../utils/runtimeValidation.js";

const router = express.Router(); 

router.get("/", (req,res) => {
    res.send("This is authentication endpoint")
})

router.post("/register", validatePassword, register)
router.post("/login", login)

export default router