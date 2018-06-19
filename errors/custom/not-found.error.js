module.exports = exports = class NotFoundError extends Error {
    constructor(...args) {
        super(...args)

        this._statusCode = 404;
        this._message = args[0] || '';

        Error.captureStackTrace(this, NotFoundError)
    }
}