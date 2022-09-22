import {NAV_STATES, navState, setNavState} from '/components/navbar/model.js'

export const renderNav = async function(root, state, stateLifter, parent){
    setNavState(state)
    await renderView(root)
    setViewState()
    bindControllerToView(root, stateLifter, parent)
}

const renderView = async function(root){
    const view = await fetch('components/navbar/view.html')
        .then(res =>{ return res.text() })
    root.innerHTML = view
}

const setViewState = function(){
    const navbar = document.getElementById("navbar")
    for (const navItem of navbar.children){
        navItem.id == navState
            ? navItem.classList.add("activeNavItem")
            : navItem.classList.remove("activeNavItem")
    }
}
const bindControllerToView = function(root, stateLifter, parent){
    const navbar = document.querySelector("#navbar")
    for(const navItem of navbar.children){
        navItem.addEventListener("click", e => {
            const state = NAV_STATES[e.target.id]
            updateNav(state, stateLifter, parent)
        })
    }
}

const updateNav = function(state, stateLifter, parent){
    setNavState(state)
    setViewState()
    stateLifter(parent, state)
}