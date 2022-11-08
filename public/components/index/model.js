import {renderAbout} from '/components/about/controller.js'
// import {renderBlog} from '/components/blog/controller.js'
import {renderExperienceList} from '/components/experienceList/controller.js'
import {renderProjectList} from '/components/projectList/controller.js'
import {renderResume} from '/components/resume/controller.js'


// blog: 'blog', 
const INDEX_STATES = {   
    about: 'about',
    experienceList: 'experienceList',
    projectList: 'projectList',
    resume: 'resume'
}

// blog: renderBlog,
const CONTENT_RENDERERS = {
    about: renderAbout,
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