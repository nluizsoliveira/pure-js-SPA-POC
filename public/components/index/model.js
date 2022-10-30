import {renderProjectList} from '/components/projectList/controller.js'
import {renderResume} from '/components/resume/controller.js'
import {renderExperienceList} from '/components/experienceList/controller.js'

const INDEX_STATES = {
    blog: 'blog', 
    about: 'about',
    experienceList: 'experienceList',
    projectList: 'projectList',
    resume: 'resume'
}

const CONTENT_RENDERERS = {
    blog: '',
    about: '',
    experienceList: renderExperienceList,
    projectList: renderProjectList,
    resume: renderResume
}


let indexState = null

const setIndexState = function(newState){
    if (newState in INDEX_STATES) {
        indexState = newState
    }
    else{
        console.log(newState, 'Is not a valid index State.')
    }
}

export {INDEX_STATES, CONTENT_RENDERERS, indexState, setIndexState}