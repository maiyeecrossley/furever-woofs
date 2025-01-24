import express from "express"
import Doggie from "../models/dog-schema.js"
import dogBreeds from "../dog-breeds.js"
import { calculateAge } from "../middleware/age-calculator.js"
import { isCharityUser } from "../middleware/auth-user.js"
import multer from "multer"

const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }
})

const router = express.Router()

router.get("/", async (req, res, next) => {
    try {

        res.render("home.ejs",)

    } catch (err) {
        next(err)
    }
})


router.get("/dogs", async (req, res, next) => {
    try {

        const allDogs = await Doggie.find()

        res.render("dog/index.ejs", {
            allDogs: allDogs
        })

    } catch (err) {
        next(err)
    }
})


router.get("/dogs/:id", async (req, res, next) => {
    try {

        const id = req.params.id
        const dogId = await Doggie.findById(id)
        
        res.render("dog/show.ejs", {
            dog: dogId,
            user: req.session.user,
            relativeAge: calculateAge(dogId.dob)
        })

    } catch (err) {
        next(err)
    }
})


router.delete("/dogs/:id", async (req, res, next) => {
    try {

        const dogId = req.params.id
        const user = req.session.user
        if (!user || user.user_type !== "charity") {
            const error = new Error("Only valid charity users can perform this action")
            error.name = "UnauthorisedError"
            throw error
        }

        const dog = await Doggie.findById(dogId)
        if (dog.charity_number !== user.charity_number) {
            const error = new Error("This dog does not belong to your charity")
            error.name = "ForbiddenError"
            throw error
        }

        req.body.user = req.session.user

        await Doggie.findByIdAndDelete(dogId)
        res.redirect("/dogs")

    } catch (err) {
        next(err)
    }
})


router.get("/new", isCharityUser, async (req, res, next) => {
    try {

        res.render("charity/new.ejs", {
            dogBreeds: dogBreeds
        })
    } catch (err) {
        next(err)
    }
})

router.post("/new", upload.single("image"), async (req, res, next) => {
    try {

        const user = req.session.user

        if (user.user_type !== "charity") {
            const error = new Error("Only valid charity users can perform this action");
            error.name = "UnauthorisedError";
            throw error;
        }

        const base64Image = req.file.buffer.toString("base64")

        req.body.charity_name = user.charity_name
        req.body.charity_number = user.charity_number
        req.body.dob = new Date(req.body.dob)
        req.body.user = req.session.user

        const data = req.body
        data.image = "data:image/jpeg;base64," + base64Image
        const newDog = await Doggie.create(data)
        if (!newDog) {
            const error = new Error("Failed to add new dog. Please check your input")
            error.name = "ValidationError"
            throw error
        }

        res.redirect("/dogs")

    } catch (err) {
        next(err)
    }
})



// router.post("/new", async (req, res, next) => {
//     try {
        
//         const user = req.session.user
//         if (!user || user.user_type !== "charity") {
//             const error = new Error("Only valid charity users can perform this action")
//             error.name = "UnauthorisedError"
//             throw error
//         }

//         req.body.charity_name = user.charity_name
//         req.body.charity_number = user.charity_number
//         req.body.dob = new Date(req.body.dob)
//         req.body.user = req.session.user

//         const newDog = await Doggie.create(req.body)
//         if (!newDog) {
//             const error = new Error("Failed to add new dog. Please check your input")
//             error.name = "ValidationError"
//             throw error
//         }

//         res.redirect("/dogs")

//     } catch (err) {
//         next(err)
//     }
// })


router.get("/dogs/update/:id", async (req, res, next) => {
    try {

        const updateDog = await Doggie.findById(req.params.id).exec()
        if (!updateDog) {
            const error = new Error("Dog not found.")
            error.name = "NotFoundError"
            throw error
        }

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
            const error = new Error("Only valid charity users can perform this action")
            error.name = "UnauthorisedError"
            throw error
        }

        const dog = await Doggie.findById(dogId)
        if (dog.charity_number !== user.charity_number) {
            const error = new Error("This dog does not belong to your charity")
            error.name = "ForbiddenError"
            throw error
        }

        if (req.body.dob) {
        req.body.dob = new Date(req.body.dob)
        }

        const updatedDog = await Doggie.findByIdAndUpdate(dogId, req.body, { new: true })
        if (!updatedDog) {
            const error = new Error("Failed to update the dog. Please check your input.")
            error.name = "ValidationError"
            throw error
        }

        res.redirect("/dogs")

    } catch (err) {
        next(err)
    }
})

export default router