function renderBlog(blog){
    return `
     <div class="blog">
            <div class="title-container">
                <h1>${blog.title}</h1>
                <div>${blog.createdAt}</div>
            </div>

            <a href="/blog/${blog.id}">Megtekintés</a>
            <button>Szerkesztés</a>
            <button>Törlés</a>
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