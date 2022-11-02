export const renderBlog = async function(viewRoot){
    const view = await fetch('components/blog/view.html')
        .then(res =>{ return res.text() })
    viewRoot.innerHTML = view
}