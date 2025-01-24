import express from "express"
import mongoose from "mongoose"
import methodOverride from "method-override"
import session from "express-session"
import dotenv from "dotenv"
import errorHandler from "./middleware/errorHandler.js"
import dogController from "./controllers/dog-controller.js"
import userController from "./controllers/user-controller.js"
import path from "path"
import { fileURLToPath } from "url"
import authenticate from "./middleware/auth-user.js"
import multer from "multer"
import MongoStore from "connect-mongo"

dotenv.config()

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.json())

app.set("view engine", "ejs")

app.use(express.static(path.join(__dirname, "public")))

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        collectionName: "sessions",
    }),
    cookie: {
        secure: false, 
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

app.use(authenticate)

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