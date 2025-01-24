export default

  function errorHandler(err, req, res, next) {

  if (err.name === "CastError") {
    res.status(400).render("error.ejs", {
      title: "Invalid ID",
      message: "It looks like the ID you have provided is invalid"
    })
  } else if (
    err.name === "AuthenticationError") {
    res.status(401).render("error.ejs", {
      title: "Authentication Failed",
      message: err.message,
      details: null
    })
  } else if (
    err.name === "UnauthorisedError") {
      res.status(401).render("error.ejs", {
        title: "Unauthorised",
        message: err.message,
        details: null
      })
  } else if (
    err.name === "ForbiddenError") {
      res.status(403).render("error.ejs", {
        title: "Forbidden",
        message: err.message,
        details: null
      })
  } else if (
    err.name === "SyntaxError") {
    res.status(400).render("error.ejs", {
      title: "Invalid JSON",
      message: "Invalid JSON format in the request body"
    })
  } else if (
    err.name === "ValidationError") {
    const customErrMessage = {}
    for (const key in err.errors) {
      customErrMessage[key] = err.errors[key].message
    }
    res.status(422).render("error.ejs", {
      title: "Validation Error",
      message: "There are issues with your data, please check them properly",
      details: customErrMessage,
    })
  } else {
    res.status(500).render("error.ejs", {
      title: "Server Error",
      message: "Something went wrong, check the request and try again",
      details: null
    })
  }
}