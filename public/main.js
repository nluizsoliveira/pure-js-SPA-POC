import {CONTENTS} from '/pages_content/contents.js'
import {renderContent, renderAllProjects} from '/renderer.js'
const initialRender = function(){
    const navBar = document.querySelector("#navbar")
    for(const navItem of navBar.children){
        navItem.addEventListener("click", e => {renderContent(e.target)})
    }

    renderAllProjects(CONTENTS.projects)
}

initialRender()

/* WHY EVENT LISTENERS INSTEAD OF <div onclick=function(this)> ?  
*   main.js must be a module to import content.js and renderer.js modules
*   exported variables. HTML cannot access module functions. Solutions are: 
*       1) binding every function to window object OR
*       2) manually adding event listeners (chosen) 
*/