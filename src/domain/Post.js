class Post {
    constructor(id, title, content, author, createdAt, updatedAt) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromDbRow(row) {
        if (!row) return null;
        return new Post(
            row.id,
            row.title,
            row.content,
            row.author,
            row.createdAt,
            row.updatedAt,
        );
    }

    toDbObject() {
        return {
            id: this.id,
            title: this.title,
            content: this.content,
            author: this.author,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        }
    }
}

module.exports = Post;