import {project, setProject} from '/components/project/model.js'


export const renderProject = async function(viewRoot, newProject){
    setProject(newProject)
    await renderView(viewRoot)
    setViewState(project, viewRoot)
}

const renderView = async function(viewRoot){
    const view = await fetch('/components/project/view.html')
        .then(res =>{ return res.text() })
    viewRoot.innerHTML = view
}

const setViewState = function(project, viewRoot){
    for (const [className, value] of Object.entries(project)){
        const elementRoot = viewRoot.querySelector(`.${className}`)
        const elementRootTag = elementRoot.tagName
        if(elementRootTag === 'IMG'){
            elementRoot['src'] = value
        }
        else if(elementRootTag === 'A'){
            elementRoot['href'] =  value
        }
        else {
            elementRoot.innerHTML = value
        }
    }
}