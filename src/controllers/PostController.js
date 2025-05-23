const PostService = require('../services/PostService');
const ResponseHandler = require('../utils/ResponseHandler');
const AppError = require('../utils/AppError');

class PostController {
    constructor(postService) {
        this.postService = postService;
    }

    async createPost(req, res) {
        try {
            console.log(req.body);
            console.log(typeof req.body);
            const { title, content, author } = req.body;
            console.log(title, content, author);
            if (!title || !content || !author) {
                throw new AppError('title and content must be provided');
            }

            const newPost = await this.postService.createPost({title, content, author});
            return ResponseHandler.success(res, 200, "성공적으로 글을 생성했습니다.", newPost);
        } catch (error) {
            return ResponseHandler.error(res, error);
        }
    }
}

module.exports = new PostController(PostService);