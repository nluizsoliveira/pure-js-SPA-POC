export const renderBlog = async function(root){
    await renderView(root)
    await renderPost()
}

const renderView = async function(root){
    const view = await fetch('/components/blog/view.html')
        .then(res =>{ return res.text() })
    root.innerHTML = view
}

const renderPost = async function(){
    const postRoot = document.getElementById("blogPost")
    const post = await fetch('/components/blog/blog_posts/server_setup.html')
        .then(res =>{ return res.text() })
    postRoot.innerHTML = post
}