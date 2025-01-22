export default

    function authenticate(req, res, next) {

    res.locals.name = req.session.user?.first_name
    next()
}