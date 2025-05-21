const PostRepository = require("../repositories/PostRepository");
const Post = require("../domain/Post");
const AppError = require("../utils/AppError");
const db = require("../database");

class PostService {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }

    async createPost(postData) {
        const { title, content, author } = postData;

        if (!title || !content || !author) {
            throw new AppError("제목, 글 내용, 작성자는 필수입니다 !", 400);
        }

        const newPost = new Post(null, title, content, author);
        const createdPost = await db.transaction(async (conn) => {
            const created = await this.postRepository.create(newPost);
            return created;
        });

        return createdPost;
    }
}

module.exports = new PostService(PostRepository);