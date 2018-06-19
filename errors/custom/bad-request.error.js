module.exports = exports = class BadRequestError extends Error {

    constructor(...args) {
        super(...args)

        this._statusCode = 400;
        this._message = args[0] || '';

        Error.captureStackTrace(this, BadRequestError)
    }
}