const db = require('../database');
const Post = require('../domain/Post');

class PostRepository {
    async create(post) {
        const sql = `INSERT INTO posts (title, content, author)
                     VALUES (?, ?, ?);
        `;
        const params = [post.title, post.content, post.author];
        const result = await db.query(sql, params);

        return new Post(result.insertId, post.title, post.content, post.author, new Date(), new Date());
    }

    async findByPostId(id) {
        const sql = `SELECT title, content, author, created_at, updated_at
                     FROM posts
                     WHERE id = ?;
        `;
        const params = [id];
        const rows = await db.query(sql, params);
        if (rows.length === 0) {
            return null;
        }
        return Post.fromDbRow(rows[0]);
    }

    async findAll() {
        const sql = `SELECT id, title, content, author, created_at, updated_at
                     FROM posts
                     ORDER BY created_at DESC;`;
        const rows = await db.query(sql);
        return rows.map(row => Post.fromDbRow(row));
    }

    async update(post) {
        const sql = `UPDATE posts
                     SET title   = ?,
                         content = ? updated_at = NOW()
                     WHERE id = ?;
        `;
        const params = [post.title, post.content, post.id];
        const result = await db.query(sql, params);
        return result.affectedRows > 0;
    }

    async delete(id) {
        const sql = `DELETE
                     FROM posts
                     WHERE id = ?;
        `;
        const params = [id];
        const result = await db.query(sql, params);
        return result.affectedRows > 0;
    }
}

module.exports = PostRepository;