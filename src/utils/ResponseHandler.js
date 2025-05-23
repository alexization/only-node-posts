class ResponseHandler {
    static jsonReplacer(key, value) {
        if (typeof value === 'bigint') {
            return value.toString();
        }
        return value;
    }

    static success(res, statusCode, message, data = {}) {
        res.end(JSON.stringify({
            status: 'success', message: message, data: data
        }, ResponseHandler.jsonReplacer));
    }

    static fail(res, statusCode, message) {
        res.end(JSON.stringify({
            status: 'fail', message: message,
        }))
    }

    static error(res, error) {
        res.end(JSON.stringify({
            status: 'error', message: error.message,
        }))
    }
}

module.exports = ResponseHandler;