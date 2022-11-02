export const renderAbout = async function(root){
    const view = await fetch('components/about/view.html')
        .then(res =>{ return res.text() })
    root.innerHTML = view
}