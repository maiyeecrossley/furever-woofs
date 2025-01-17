import express from "express"
import Doggie from "../models/dog-schema.js"

const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
        res.render("home.ejs")
    } catch (err) {
        next (err)
    }
})


export default router