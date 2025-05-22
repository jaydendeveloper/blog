function renderBlog(blog){
    return `
     <div class="blog">
            <div class="title-container">
                <h1>${blog.title}</h1>
                <div>${blog.createdAt}</div>
            </div>

            <a href="/blog/${blog.id}">Megtekintés</a>
            <button onclick={editBlog(${blog.id})}>Szerkesztés</a>
            <buttononclick={deleteBlog(${blog.id})}>Törlés</a>
     </div>
    `;
}


async function getBlogs(){
    const res = await fetch("http://localhost:5000/blogs");

    if(!res.ok){
        const error = await res.json();
        console.error(error);
        return;
    }

    const blogs = await res.json();
    console.log(blogs);
    return blogs;
}

getBlogs();


async function editBlog(id){
    console.log("Edit blog");
}

async function deleteBlog(id){
    console.log("Delete blog");
    const res = await fetch(`http://localhost:5000/blogs/${id}`, {
        method: 'DELETE',
    });

    if(!res.ok){
        const error = await res.json();
        console.error(error);
        return;
    }

    const blogs = await getBlogs();
    renderBlogs(blogs);
}

async function renderBlogs(blogs){
    const blogContainer = document.querySelector(".blogs");
    blogContainer.innerHTML = "";

    for(const blog of blogs){
        const blogHTML = renderBlog(blog);
        blogContainer.innerHTML += blogHTML;
    }
}

(async function initialize() {
    const blogs = await getBlogs();
    renderBlogs(blogs);
})();