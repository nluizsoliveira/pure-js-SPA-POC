import {NAV_STATES, navState, setNavState} from '/components/navbar/model.js'

export const initialRenderNav = function(root){
    renderNav(root, NAV_STATES.blog)
}

const renderNav = async function(root, state){
    setNavState(state)
    await renderView(root)
    setViewState()
    bindControllerToView(root)
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
const bindControllerToView = function(root){
    const navbar = document.querySelector("#navbar")
    for(const navItem of navbar.children){
        navItem.addEventListener("click", e => {
            setNavState(NAV_STATES[e.target.id])
            renderNav(root, navState)
        })
    }
}