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


router.delete("/dogs/:id", async (req, res, next) => {
    try {

        const dogId = req.params.id
        const user = req.session.user
        if (!user || user.user_type !== "charity") {
            return res.status(401).send ({ message: "Only valid charity users can perform this" })
        }
        
        const dog = await Doggie.findById(dogId)
        if (dog.charity_name !== user.charity_name) {
            res.status(403).send({ message: "This dog does not belong to your charity" })
        }

        await Doggie.findByIdAndDelete(dogId)
        res.status(200).send({ message: "Dog has found their furever sofa ❤️" })

    } catch (err) {
        next(err)
    }
})

export default router