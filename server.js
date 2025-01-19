import express from "express"
import mongoose from "mongoose"
import methodOverride from "method-override"
import session from "express-session"
import dotenv from "dotenv"
import errorHandler from "./middleware/errorHandler.js"
import dogController from "./controllers/dog-controller.js"
import userController from "./controllers/user-controller.js"

dotenv.config()

const app = express()

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // check to see if this is using HTTPS?
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // milliseconds, this is 24 hours
    }
}))

app.use(express.json())

app.use(express.urlencoded({extended: false}))

app.use(methodOverride("_method"))

app.use("/", dogController)
app.use("/", userController)

app.use(errorHandler)

app.listen(3000, () => {
    console.log("Server running on port 3000 ✅")
})

const url = "mongodb://127.0.0.1:27017/"
const dbName = "doggo-db"
mongoose.connect(`${url}${dbName}`)