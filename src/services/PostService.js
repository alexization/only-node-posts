const PostRepository = require("../repositories/PostRepository");
const Post = require("../domain/Post");
const AppError = require("../utils/AppError");
const db = require("../database");

class PostService {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
}