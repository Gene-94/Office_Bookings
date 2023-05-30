import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRouter from "./routes/auth.js"
import hotelsRouter from "./routes/hotels.js"
import roomsRouter from "./routes/rooms.js"
import usersRouter from "./routes/users.js"



const app = express()
dotenv.config()

const connect = async () => {
    await mongoose.connect(process.env.MONGO).catch(e => {throw e});
    console.log("connected to mongo db")
}

mongoose.connection.on("disconnected", ()=>{
    console.log("disconnected from db")
})
mongoose.connection.on("connected", ()=>{
    console.log("reconnected to db")
})


//middlewares

app.use(express.json())

app.enable('trust proxy')
app.use((req, res, next)=>{
    console.log(`${req.ip} connected with ${req.method} to ${req.url}`)
    next()
})

app.use("/api/auth", authRouter)
app.use("/api/users", usersRouter)
app.use("/api/rooms", roomsRouter)
app.use("/api/hotels", hotelsRouter)

/*
MIDLEWARE TO LOG RESPONSE STATUS 
app.use((req, res, next)=>{
    console.log(`${req.method} responded ${res.} to ${req.ip}`)
    next()
})
*/

//server launch
app.listen(8880, () => {
    connect()
    console.log("connected")
})

