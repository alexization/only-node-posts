const http = require('http');
const config = require("./config");
const router = require("./routes");
const AppError = require("./utils/AppError");
const ResponseHandler = require("./utils/ResponseHandler");

const server = http.createServer(async (req, res) => {
    try {
        await router.handleRequest(req, res);
    } catch (error) {
        return ResponseHandler.error(res, new AppError('알 수 없는 서버 오류가 발생했습니다.', 500));
    }
});

const PORT = config.server.port;

server.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})

process.on('SIGINT', () => {
    process.exit(0);
});

