const request = require("supertest");
const app = require("../server");

describe("Books API", () => {

    test("GET /api/books returns all books", async () => {
        const res = await request(app).get("/api/books");

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    test("GET /api/books/:id returns a single book", async () => {
        const res = await request(app).get("/api/books/1");

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("id", 1);
    });

    test("GET /api/books/:id returns 404 if not found", async () => {
        const res = await request(app).get("/api/books/999");

        expect(res.statusCode).toBe(404);
    });

    test("POST /api/books creates a new book", async () => {
        const newBook = {
            title: "Test Book",
            author: "Test Author",
            genre: "Test Genre",
            copiesAvailable: 4
        };

        const res = await request(app)
            .post("/api/books")
            .send(newBook);

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("id");
        expect(res.body.title).toBe("Test Book");
    });

    test("PUT /api/books/:id updates an existing book", async () => {
        const updatedBook = {
            title: "Updated Title",
            author: "Updated Author",
            genre: "Updated Genre",
            copiesAvailable: 10
        };

        const res = await request(app)
            .put("/api/books/1")
            .send(updatedBook);

        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe("Updated Title");
    });

    test("PUT /api/books/:id returns 404 if not found", async () => {
        const res = await request(app)
            .put("/api/books/999")
            .send({ title: "No Book" });

        expect(res.statusCode).toBe(404);
    });

    test("DELETE /api/books/:id deletes a book", async () => {
        const res = await request(app).delete("/api/books/1");

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("id", 1);
    });

    test("DELETE /api/books/:id returns 404 if not found", async () => {
        const res = await request(app).delete("/api/books/999");

        expect(res.statusCode).toBe(404);
    });

});
