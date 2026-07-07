class ValidationError extends Error {
    constructor(message = "Error de validación") {
        super(message, 400);
    }
}

export default ValidationError;