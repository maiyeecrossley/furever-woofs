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


router.get("/dogs", async (req, res, next) => {
    try {

        const allDogs = await Doggie.find()

        res.render("dog/index.ejs", {
            allDogs: allDogs
        })

    } catch (err) {
        next (err)
    }
})


router.get("/dogs/:id", async (req, res, next) => {
    try {

        const id = req.params.id
        const dogId = await Doggie.findById(id)

        res.render("dog/show.ejs", {
            dog: dogId
        })
        
    } catch (err) {
        next (err)
    }
})

export default router