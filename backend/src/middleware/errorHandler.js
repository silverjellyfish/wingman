function errorHandler(err, req, res, next) {
    // Log the error
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
}

module.exports = { errorHandler };