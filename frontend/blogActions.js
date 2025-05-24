export async function createBlog(form) {
	const formData = new FormData(form);
	const data = Object.fromEntries(formData.entries());

	const res = await fetch("http://localhost:5000/blogs", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (!res.ok) {
		const error = await res.json();
		console.error(error);
		return;
	}
	window.location.href = "/frontend";
}

export async function deleteBlog() {
	const url = new URL(window.location.href);
	const id = url.searchParams.get("id");

	if (
		!confirm(
			"Biztos benne, hogy törölni szeretné a blogot? Ez a művelet nem visszavonható!"
		)
	) {
		return;
	}

	console.log("Delete blog id", id);
	if (!id) {
		alert("Blog ID not found");
		return;
	}

	const res = await fetch(`http://localhost:5000/blogs/${id}`, {
		method: "DELETE",
	});

	if (!res.ok) {
		const error = await res.json();
		console.error(error);
		return;
	}

	window.location.href = "/frontend";
}

export async function editBlog(e) {
	const url = new URL(window.location.href);
	const id = url.searchParams.get("id");

	if (!id) {
		console.log(url.href);
		alert("Blog ID not found");
		return;
	}

	const form = document.querySelector(".form");
	const formData = new FormData(form);
	const data = Object.fromEntries(formData.entries());

	const res = await fetch("http://localhost:5000/blogs/" + id, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (!res.ok) {
		const error = await res.json();
		console.error(error);
		alert("Hiba történt a blog frissítésekor: " + error.message);
		return;
	}

	window.location.href = "/frontend/blog/index.html?id=" + id;
}
