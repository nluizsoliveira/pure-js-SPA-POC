const INDEX_STATES = {
    blog: 'blog', 
    about: 'about',
    experiences: 'experiences',
    projects: 'projects',
    resume: 'resume'
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

export {INDEX_STATES, indexState, setIndexState}