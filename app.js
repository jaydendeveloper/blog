import cors from "cors";
import express, { json } from "express";
import { db } from "./db.js";

const app = express();
app.use(cors());

app.use(json());

const PORT = 5000;

app.listen(PORT, () => {
	console.log("Server is running on port " + PORT);
});

app.get("/blogs", async (req, res) => {
	const blogs = db.prepare("SELECT * FROM blogs").all();

	console.log(blogs);

	res.send(blogs || []);
});

app.get("/blogs/:id", async (req, res) => {
	const { id } = req.params;

	const blog = db.prepare("SELECT * FROM blogs WHERE id = ?").get(id);

	if (!blog) {
		return res.status(404).json({ error: "Blog not found" });
	}

	res.send(blog);
});

app.post("/blogs", async (req, res) => {
	const { title, author, category, content } = req.body;

	if (!title || !author || !category || !content) {
		return res.status(400).json({ error: "Missing required fields" });
	}
	const date = new Date();

	db.prepare(
		"INSERT INTO blogs (title, author, category, content, createdAt, changedAt) VALUES (?, ?, ?, ?, ?, ?)"
	).run(
		title,
		author,
		category,
		content,
		date.toISOString(),
		date.toISOString()
	);
});

app.delete("/blogs/:id", async (req, res) => {
	const { id } = req.params;

	const blog = db.prepare("SELECT * FROM blogs WHERE id = ?").get(id);

	if (!blog) {
		return res.status(404).json({ error: "Blog not found" });
	}

	db.prepare("DELETE FROM blogs WHERE id = ?").run(id);

	res.status(204).send();
});

app.put("/blogs/:id", async (req, res) => {
	const { id } = req.params;
	const { title, author, category, content } = req.body;

	if (!title || !author || !category || !content) {
		return res.status(400).json({ error: "Missing required fields" });
	}

	const blog = db.prepare("SELECT * FROM blogs WHERE id = ?").get(id);

	if (!blog) {
		return res.status(404).json({ error: "Blog not found" });
	}

	const date = new Date();

	db.prepare(
		"UPDATE blogs SET title = ?, author = ?, category = ?, content = ?, changedAt = ? WHERE id = ?"
	).run(title, author, category, content, date.toISOString(), id);

	res.status(204).send();
});
