import {entry, setEntry} from '/components/blog/blogNav/blogSection/model.js'


export const renderEntry = async function(viewRoot, newEntry){
    setEntry(newEntry)
    await renderView(viewRoot)
    setViewState(entry, viewRoot)
}

const renderView = async function(viewRoot){
    const view = await fetch('/components/blog/blogNav/blogSection/view.html')
        .then(res =>{ return res.text() })
    viewRoot.innerHTML = view
}

const setViewState = function(experience, viewRoot){
    elementRoot = viewRoot.querySelector('.blogEntry')
    elementRoot.href = experience.href
    elementRoot.innerHTML = `${experience.id} - ${experience.content}`
    elementRoot.id = `entry${experience.id}`
    viewRoot.appendChild(experience)

    element.addEventListener("click", e => {
        element.classList.add('activeBlogEntry');
        const state = NAV_STATES[e.target.id] //arrumar isso
        updateNav(state, parentStateLifter) //arrumar isso
    })
}