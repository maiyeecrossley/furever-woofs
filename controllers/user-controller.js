import express from "express"
import User from "../models/user-schema.js"
import bcrypt from "bcrypt"

const router = express.Router()

router.get("/register", async (req, res, next) => {
    try {

        res.render("user/register.ejs")

    } catch (err) {
        next (err)
    }
})

router.get("/register-form", async (req, res, next) => {    
    try {
        
        res.render("user/register-form.ejs", {
            is_charity: req.query.user_type === "charity"
        })

    } catch(err) {
        next(err)
    }
})

router.post("/register-form", async (req, res, next) => {
    try {

        console.log(req.body)

        // const emailInDatabase = await User.findOne({ email: req.body.email })
        // if (emailInDatabase) {
        //     res.send("There is already an account with this email address")
        // }
        
        let user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            dob: req.body.dob,
            user_type: req.body.user_type === "charity" ? "charity" : "adopter",
            location: req.body.location,
            telephone: req.body.telephone
        }
        
        if (user.user_type === "charity") {
            user.charity_name = req.body.charity_name
            user.charity_number = req.body.charity_number
        }

        await User.create(user)
        res.redirect("/")

    } catch (err) {
        next (err)
    }

})


router.get("/login", async (req, res, next) => {
    try {
        
        res.render("user/login.ejs")

    } catch (err) {
        next (err)
    }
})


router.post("/login", async (req, res, next) => {
    try {
        
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.send({ message: "Log in failed. Please try again" })
        }
        if (!user.isPasswordValid(req.body.password)) {
            return res.status(401).send({ message: "Log in failed. Please try again" })
        }
        req.session.user = user
        res.redirect("/dogs")
        
    } catch (err) {
        next (err) 
    }
})

export default router