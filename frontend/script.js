function renderBlog(blog) {
	const date = new Date(blog.createdAt);
	const options = { year: "numeric", month: "long", day: "numeric" };
	blog.createdAt = date.toLocaleDateString("hu-HU", options);

	return `
     <div class="blog">
            <div class="title-container">
                <h1>${blog.title}</h1>
                <div>${blog.createdAt}</div>
            </div>

            <div class="card-footer">
                <a href="./blog/index.html?id=${blog.id}"><button>Megtekintés</button></a>
            </div>
     </div>
    `;
}

async function getBlogs() {
	const res = await fetch("http://localhost:5000/blogs");

	if (!res.ok) {
		const error = await res.json();
		console.error(error);
		return;
	}

	const blogs = await res.json();
	return blogs.reverse();
}

async function renderBlogs(blogs) {
	const blogContainer = document.querySelector(".blogs");
	blogContainer.innerHTML = "";

	blogs.forEach((blog) => {
		const blogHTML = renderBlog(blog);
		blogContainer.innerHTML += blogHTML;
	});
}

(async function initialize() {
	const blogs = await getBlogs();
	renderBlogs(blogs);
})();
