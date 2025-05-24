import { createBlog } from "../blogActions.js";

const form = document.querySelector(".form");

form.addEventListener("submit", async (e) => {
	e.preventDefault();
	createBlog(form);
});
