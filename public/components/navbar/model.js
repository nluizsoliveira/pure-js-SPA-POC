const NAV_STATES = {
    blog: 'blog', 
    about: 'about',
    experiences: 'experiences',
    projects: 'projects',
    resume: 'resume'
}

let navState = null

const setNavState = function(newState){
    if (newState in NAV_STATES) {
        navState = newState
    }
    else{
        console.log(newState, 'Is not a valid State.')
    }
}

export {NAV_STATES, navState, setNavState}