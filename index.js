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
app.use("/auth", authRouter)
app.use("/users", usersRouter)
app.use("/rooms", roomsRouter)
app.use("/hotels", hotelsRouter)


app.listen(8880, () => {
    connect()
    console.log("connected")
})

