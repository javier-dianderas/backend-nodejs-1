const errorMiddleware = (err, req, res, next) => {
    console.log("Error", err);

    res.status(500).json({
        success: false,
        error: err.message
    });
};

module.exports = errorMiddleware;