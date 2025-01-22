import express from "express"
import Doggie from "../models/dog-schema.js"
import dogBreeds from "../dog-breeds.js"

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
        if (dog.charity_number !== user.charity_number) {
            return res.status(403).send({ message: "This dog does not belong to your charity" })
            
        }

        req.body.user = req.session.user

        await Doggie.findByIdAndDelete(dogId)
        res.redirect("/dogs")

    } catch (err) {
        next(err)
    }
})


router.get("/new", async (req,res,next) => {
    try {
          
        res.render("charity/new.ejs", {
            dogBreeds: dogBreeds
        })
    } catch (err) {
        next(err)
    }
})


router.post("/new", async (req, res, next) => {
    try {

        const user = req.session.user
        if (!user || user.user_type !== "charity") {
            return res.status(401).send({ message: "Only valid charity users can perform this" })
        }
        
        req.body.charity_name = user.charity_name
        req.body.charity_number = user.charity_number

        req.body.user = req.session.user
        await Doggie.create(req.body)
        res.redirect("/dogs")

    } catch (err) {
        next(err)
    }
})


router.get("/dogs/update/:id", async (req, res, next) => {
    try {

        const updateDog = await Doggie.findById(req.params.id).exec()
        res.render("charity/update.ejs", {
            dog: updateDog,
            dogBreeds: dogBreeds
        })

    } catch (err) {
        next(err)
    }
})


router.put("/dogs/:id", async (req, res, next) => {
    try {

        const dogId = req.params.id
        const user = req.session.user
        if (!user || user.user_type !== "charity") {
            return res.status(401).send ({ message: "Only valid charity users can perform this" })
        }
        
        const dog = await Doggie.findById(dogId)
        if (dog.charity_number !== user.charity_number) {
            return res.status(403).send({ message: "This dog does not belong to your charity" })
        }

        await Doggie.findByIdAndUpdate(dogId, req.body, { new: true })
        res.redirect("/dogs")

    } catch (err) {
        next(err)
    }
})

export default router