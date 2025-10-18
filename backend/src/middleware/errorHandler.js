// Contributors: Michelle
// Time: 0.5 hours

/*
  Centralized error handling middleware for Express.js.
  Catches errors and sends a standardized JSON response.
*/
function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
}

module.exports = { errorHandler };