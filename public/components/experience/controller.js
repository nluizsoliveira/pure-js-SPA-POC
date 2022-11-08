import {experience, setExperience} from '/components/experience/model.js'


export const renderExperience = async function(viewRoot, newExperience){
    setExperience(newExperience)
    await renderView(viewRoot)
    setViewState(experience, viewRoot)
}

const renderView = async function(viewRoot){
    const view = await fetch('/components/experience/view.html')
        .then(res =>{ return res.text() })
    viewRoot.innerHTML = view
}

const setViewState = function(experience, viewRoot){
    for (const [className, value] of Object.entries(experience)){
        const elementRoot = viewRoot.querySelector(`.${className}`)
        const elementRootTag = elementRoot.tagName
        if(elementRootTag === 'IMG'){
            elementRoot['src'] = value
        }
        else {
            elementRoot.innerHTML = value
        }
    }
}