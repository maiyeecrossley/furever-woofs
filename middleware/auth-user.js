export default

    function authenticate(req, res, next) {

    res.locals.name = req.session.user?.first_name
    res.locals.isLoggedIn = req.session.user ? true : false
    next()
}