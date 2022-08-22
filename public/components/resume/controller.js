import {resume} from '/components/resume/model.js'


export const renderResume = async function(viewRoot){
    await renderView(viewRoot)
    setViewState(resume, viewRoot)
}

const renderView = async function(viewRoot){
    const view = await fetch('components/resume/view.html')
        .then(res =>{ return res.text() })
    viewRoot.innerHTML = view
}

const setViewState = function(resume){
    const elementRoot = document.getElementById('resume')
    console.log(elementRoot)
    elementRoot['src'] = resume
}