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

app.enable('trust proxy')
app.use((req, res, next)=>{
    const req_url = new URL(req.url, `http://${req.headers.host}`);
    console.log(`${req.ip} connected with ${req.method} to ${req_url}`)
    res.on("finish", () => {
        console.log(`${req_url} responded ${res.statusCode} to ${req.ip}`)
    });
    next()
})

app.use(express.json())


app.use("/api/auth", authRouter)
app.use("/api/users", usersRouter)
app.use("/api/rooms", roomsRouter)
app.use("/api/hotels", hotelsRouter)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        sucess: false,
        status: errorStatus,
        message: errorMessage
    })
});

//server launch
app.listen(8880, () => {
    connect()
    console.log("connected")
})

