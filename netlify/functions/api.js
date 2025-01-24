import express from "express"
import mongoose from "mongoose"
import methodOverride from "method-override"
import session from "express-session"
import dotenv from "dotenv"
import MongoStore from "connect-mongo"
import serverless from "serverless-http"

import authenticate from "../../middleware/auth-user.js"
import errorHandler from "../../middleware/errorHandler.js"
import dogController from "../../controllers/dog-controller.js"
import userController from "../../controllers/user-controller.js"

dotenv.config()
mongoose.connect(process.env.MONGODB_URI)

const app = express()
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

app.use(express.json())

app.set("view engine", "ejs")

app.use(express.static("public"))

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

export const handler = serverless(app)

