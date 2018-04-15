module.exports = (req, res, next) => {
  const header = req.headers["authorization"]
  if(typeof header !== "undefined"){
    req.token = header.split(" ")[1]
  }
  next()
}
