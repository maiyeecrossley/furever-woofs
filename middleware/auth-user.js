export default

    function authenticate(req, res, next) {

    res.locals.name = req.session.user?.first_name
    res.locals.isLoggedIn = req.session.user ? true : false
    res.locals.userType = req.session.user?.user_type
    next()
}


export function isCharityUser(req, res, next) {
    try {
        const user = req.session.user
        if (!user || user.user_type !== "charity") {
            const error = new Error("Only valid charity users can access this page.")
            error.name = "UnauthorisedError"
            throw error
        }
        next()
    } catch (err) {
        next(err)   
    }
}