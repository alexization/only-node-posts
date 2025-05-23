const PostService = require('../services/PostService');
const ResponseHandler = require('../utils/ResponseHandler');
const AppError = require('../utils/AppError');

class PostController {
    constructor(postService) {
        this.postService = postService;
    }

    async createPost(req, res) {
        try {
            const {title, content, author} = req.body;
            if (!title || !content || !author) {
                throw new AppError('title and content must be provided');
            }

            const newPost = await this.postService.createPost({title, content, author});
            return ResponseHandler.success(res, 200, "성공적으로 글을 생성했습니다.", newPost);
        } catch (error) {
            return ResponseHandler.error(res, error);
        }
    }

    async findPostByPostId(req, res) {
        try {
            const postId = parseInt(req.params["id"], 10);

            if (isNaN(postId)) {
                throw new AppError("유효하지 않은 게시물 ID 입니다.", 400);
            }

            const post = await this.postService.findPostByPostId(postId);
            return ResponseHandler.success(res, 200, "성공적으로 글을 가져왔습니다.", post);
        } catch (error) {
            return ResponseHandler.error(res, error);
        }
    }
}

module.exports = new PostController(PostService);