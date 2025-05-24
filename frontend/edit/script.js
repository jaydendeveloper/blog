import { editBlog } from "../blogActions.js";

const form = document.querySelector(".form");

document.addEventListener("DOMContentLoaded", function () {
	const url = new URL(window.location.href);
	const blogId = url.searchParams.get("id");
	console.log(url);
	console.log("Blog ID:", blogId);

	if (!blogId) {
		alert("Blog ID not found in URL.");
		window.location.href = "/frontend";
		return;
	}

	fetch(`http://localhost:5000/blogs/${blogId}`)
		.then((response) => {
			if (!response.ok) {
				alert("Ez a blog nem található.");
				window.location.href = "/frontend";
			}
			return response.json();
		})
		.then((data) => {
			console.log("Blog data:", data);
			form["title"].value = data.title;
			form["author"].value = data.author;
			form["content"].value = data.content;
			form["category"].value = data.category;
		})
		.catch((error) => {
			console.error("Error fetching blog data:", error);
		});
});

form.addEventListener("submit", async (event) => {
	event.preventDefault();

	editBlog();
});
