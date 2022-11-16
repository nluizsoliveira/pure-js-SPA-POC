import {entry, setEntry} from '/components/blogEntry/model.js'


export const renderEntry = async function(viewRoot, newEntry, parentStateLifter){
    setEntry(newEntry)
    await renderView(viewRoot)
    setViewState(entry, viewRoot, parentStateLifter)
}

const renderView = async function(viewRoot){
    const view = await fetch('/components/blogEntry/view.html')
        .then(res =>{ return res.text() })
    viewRoot.innerHTML = view
}

const setViewState = function(entry, viewRoot, parentStateLifter){
    const element = viewRoot.querySelector('.blogEntry')
    element.href = entry.href
    element.innerHTML = `${entry.id} - ${entry.content}`
    element.id = entry.id
    element.addEventListener("click", e => {
        e.preventDefault()
        e.target.classList.add("activeBlogEntry")
        parentStateLifter(e.target)
    })
    viewRoot.appendChild(element)
}
