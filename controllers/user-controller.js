import express from "express"
import User from "../models/user-schema.js"

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

        const emailInDatabase = await User.findOne({ email: req.body.email })
        if (emailInDatabase) {
            const error = new Error("There is already an account with this email address")
            error.name = "ValidationError"
            throw error
        }
        
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
        res.redirect("/login")

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
            const error = new Error("Log in failed. No account found with this email.")
            error.name = "AuthenticationError"
            throw error
        }
        if (!user.isPasswordValid(req.body.password)) {
            const error = new Error("Log in failed. Incorrect password")
            error.name = "AuthenticationError"
            throw error
        }
        req.session.user = user
        
        res.redirect("/dogs")
        
    } catch (err) {
        next(err) 
    }
})


router.get("/logout", async (req, res, next) => {
    try {

        req.session.destroy()
        res.redirect("/")

    } catch(err) {
        next(err)
    }    
})

export default router