import express from "express"
import mongoose from "mongoose"
import methodOverride from "method-override"
import session from "express-session"
import dotenv from "dotenv"
import errorHandler from "./middleware/errorHandler.js"
import dogController from "./controllers/dog-controller.js"

dotenv.config()

const app = express()

app.use(express.json())

app.use(express.urlencoded({extended: false}))

app.use(methodOverride("_method"))

app.use("/", dogController)

app.use(errorHandler)

app.listen(3000, () => {
    console.log("Server running on port 3000 ✅")
})

const url = "mongodb://127.0.0.1:27017/"
const dbName = "doggo-db"
mongoose.connect(`${url}${dbName}`)