import {indexState, CONTENT_RENDERERS, setIndexState} from '/components/index/model.js'
import {renderNav} from '/components/navbar/controller.js'


export const renderIndex = async function(root, newIndexState){
    setIndexState(newIndexState)
    await renderView(root)

    const navRoot = document.getElementById("navRoot");
    await renderNav(navRoot, newIndexState, stateLifter);

    await renderContent()
}

export const renderContent = async function(){
    const contentRoot = document.getElementById("indexContentRoot")
    const contentRenderer = getContentRender()
    contentRoot.innerHTML = ""
    contentRenderer(contentRoot, indexState)
}

const getContentRender = function(){
    return CONTENT_RENDERERS[indexState]
}

const renderView = async function(root){
    const view = await fetch('/components/index/view.html')
        .then(res =>{ return res.text() })
    root.innerHTML = view
}

export const stateLifter = function(newState){
    setIndexState(newState)
    renderContent()
}