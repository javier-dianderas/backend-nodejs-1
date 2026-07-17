export const errorMiddleware = (err, req, res, next) => {
    console.log("Error", err);

    // Error de negocio
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message
        });
    }

    // Error de validación de Mongoose
    if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({
            status: "error",
            message: err.message
        });
    }

    // Id con formato inválido
    if (err instanceof mongoose.Error.CastError) {
        return res.status(400).json({
            status: "error",
            message: `Id inválido: ${err.message}`
        });
    }

    // Error inesperado
    return res.status(500).json({
        status: "error",
        message: err.message
    });
};