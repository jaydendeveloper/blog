import { deleteBlog } from "../blogActions.js";

document.addEventListener("DOMContentLoaded", function () {
	const blogTitle = document.getElementById("blog-title");
	const blogAuthor = document.getElementById("blog-author");
	const blogContent = document.getElementById("blog-content");
	const blogCategory = document.getElementById("blog-category");
	const blogPublished = document.getElementById("blog-created");
	const blogChanged = document.getElementById("blog-changed");
	const deleteButton = document.getElementById("delete-button");
	const editButton = document.getElementById("edit-button");
	editButton.addEventListener("click", redirectToEdit);
	deleteButton.addEventListener("click", deleteBlog);

	const url = new URL(window.location.href);
	const blogId = url.searchParams.get("id");
	console.log(url);
	console.log("Blog ID:", blogId);

	if (!blogId) {
		alert("Blog ID not found in URL.");
		window.location.href = "/frontend";
		return;
	}
	const dateOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		day: "2-digit",
	};

	fetch(`http://localhost:5000/blogs/${blogId}`)
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		})
		.then((data) => {
			console.log("Blog data:", data);
			blogTitle.textContent = data.title;
			blogAuthor.textContent = "By: " + data.author;
			blogContent.textContent = data.content;
			blogCategory.textContent = "Kategória: " + data.category;
			blogPublished.textContent = new Date(data.createdAt).toLocaleDateString(
				"hu-HU",
				dateOptions
			);
			blogChanged.textContent =
				"Frissítve: " +
				new Date(data.changedAt).toLocaleDateString("hu-HU", dateOptions);
			document.title = "Volánbusz | " + data.title;
		})
		.catch((error) => {
			console.error("Error fetching blog data:", error);
		});
});

function redirectToEdit() {
	const url = new URL(window.location.href);
	const blogId = url.searchParams.get("id");
	if (!blogId) {
		alert("Blog ID not found in URL.");
		return;
	}
	window.location.href = `/frontend/edit/index.html?id=${blogId}`;
}
