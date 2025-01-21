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
        if (dog.charity_number !== user.charity_number) {
            res.status(403).send({ message: "This dog does not belong to your charity" })
        }

        await Doggie.findByIdAndDelete(dogId)
        res.status(200).send({ message: "Dog has found their furever sofa ❤️" })

    } catch (err) {
        next(err)
    }
})


router.get("/new", async (req,res,next) => {
    try {
        const dogBreeds = {
            akita: "Akita",
            border_terrier: "Border Terrier",
            boxer: "Boxer",
            bulldog: "Bulldog",
            cavalier_king_charles: "Cavalier King Charles",
            cocker_spaniel: "Cocker Spaniel",
            dachshund: "Dachshund",
            english_springer_spaniel: "English Springer Spaniel",
            french_bulldog: "French Bulldog",
            german_shepherd_dog: "German Shepherd Dog",
            golden_retriever: "Golden Retriever",
            labrador: "Labrador",
            miniature_schnauzer: "Miniature Schnauzer",
            pomeranian: "Pomeranian",
            poodle: "Poodle",
            pug: "Pug",
            rottweiler: "Rottweiler",
            staffordshire_bull_terrier: "Staffordshire Bull Terrier",
            whippet: "Whippet",
            yorkshire_terrier: "Yorkshire Terrier",
            shih_tzu: "Shih Tzu"
          }
          
        res.render("charity/new.ejs", {
            dogBreeds: dogBreeds
        })
    } catch (err) {
        next(err)
    }
})


router.post("/dogs", async (req, res, next) => {
    try {

        const user = req.session.user
        if (!user || user.user_type !== "charity") {
            return res.status(401).send({ message: "Only valid charity users can perform this" })
        }
        
        req.body.user = req.session.user
        await Doggie.create(req.body)

    } catch (err) {
        next(err)
    }
})


export default router