import {indexState, setIndexState} from '/components/index/model.js'
import {renderNav} from '/components/navbar/controller.js'

export const renderIndex = async function(root, newIndexState){
    setIndexState(newIndexState)
    await renderView(root)
    const navRoot = document.getElementById("navRoot");
    await renderNav(navRoot, newIndexState, navStateLifter, root);
    console.log("index state", indexState)
}

const renderView = async function(root){
    const view = await fetch('components/index/view.html')
        .then(res =>{ return res.text() })
    root.innerHTML = view
}

export const navStateLifter = async function(root, newNavState){
    renderIndex(root, newNavState)
}