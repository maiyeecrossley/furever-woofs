export default

    function errorHandler(err, req, res, next) {

    if (err.name === "CastError") {
        res.send({ message: "It looks like the ID you have provided is invalid" })
    } else if (
        err.name === "SyntaxError") {
        res.send({ message: "Invalid JSON format in the request body" })
    } else if (
        err.name === "ValidationError") {
        const customErrMessage = {}
        for (const key in e.errors) {
            customErrMessage[key] = err.errors[key].message
        }
        console.log(customErrMessage)
        res.status(422).send({ errors: customErrMessage, message: "There are issues with your data, please check them properly" })

    } else {
        res.send({ message: "Something went wrong, check the request and try again" })
    }
}