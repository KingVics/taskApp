class CustomAPIError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

const CustomError = (message, statusCode) => {
    return new CustomAPIError(message, statusCode)
}

module.exports = {
    CustomAPIError,
    CustomError
}