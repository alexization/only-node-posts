class ResponseHandler {
    static success(res, statusCode, message, data = {}) {
        res.writeHead(statusCode, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({
            status: 'success', message: message, data: data
        }));
    }

    static fail(res, statusCode, message) {
        res.writeHead(statusCode, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({
            status: 'fail', message: message,
        }))
    }

    static error(res, error) {
        const statusCode = error.statusCode || 500;
        const message = error.isOperational ? error.message : 'Server Error';

        res.writeHead(statusCode, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({
            status: 'error', message: message,
        }))
    }
}

module.exports = ResponseHandler;