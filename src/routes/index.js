const url = require("url");
const PostController = require("../controllers/PostController");
const AppError = require("../utils/AppError");
const ResponseHandler = require("../utils/ResponseHandler");

class Router {
    constructor() {
        this.routes = {
            GET: {}, POST: {}, PUT: {}, DELETE: {},
        }
    }

    get(path, handler) {
        this.routes.GET[path] = handler;
    }

    post(path, handler) {
        this.routes.POST[path] = handler;
    }

    put(path, handler) {
        this.routes.PUT[path] = handler;
    }

    delete(path, handler) {
        this.routes.DELETE[path] = handler;
    }

    async handleRequest(req, res) {
        const parsedUrl = url.parse(req.url, true);
        const path = parsedUrl.pathname;
        const method = req.method;

        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        await new Promise((resolve, reject) => {
            req.on('end', () => {
                if (body) {
                    try {
                        req.body = JSON.parse(body);
                    } catch (err) {
                        return reject(new AppError('Invalid JSON body', 400));
                    }
                }
                req.query = parsedUrl.query;
                req.params = {};
                resolve();
            });
            return req.on('error', err => reject(new AppError(`Request body error: ${err.message}`, 400)));
        });

        let handler = null;
        let matchedPath = null;

        if (this.routes[method] && this.routes[method][path]) {
            handler = this.routes[method][path];
        } else {
            for (const routePath in this.routes[method]) {
                const regexPath = routePath.replace(/:([a-zA-Z0-9_]+)/g, '([a-zA-Z0-9_]+)');
                const regex = new RegExp(`^${regexPath}$`);
                const match = path.match(regex);

                if (match) {
                    handler = this.routes[method][routePath];
                    matchedPath = routePath;
                    const paramNames = (routePath.match(/:([a-zA-Z0-9_]+)/g) || [])
                        .map(p => p.slice(1))
                    paramNames.forEach((name, index) => {
                        req.params[name] = match[index + 1];
                    });
                    break;
                }
            }
        }

        if (handler) {
            try {
                await handler(req, res);
            } catch (error) {
                const finalError = error instanceof Error ? error : new AppError('Unhandled Error', 500);
                return ResponseHandler.error(res, finalError);
            }
        } else {
            return ResponseHandler.fail(res, 404, "Not Found");
        }
    }
}

const router = new Router();

router.post('/api/posts', PostController.createPost.bind(PostController));
router.get('/api/post/:id', PostController.findPostByPostId.bind(PostController))

module.exports = router;