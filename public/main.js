import {CONTENTS} from '/pages_content/contents.js'

const renderContent =  function(clickedNavItem){
    const CONTENTS_HANDLER = {
        'projects': renderAllProjects,
        'experiences': renderAllExperiences,
        'resume': renderResume
    }
    const contentId = clickedNavItem.id
    activateNavbar(contentId)
    const content = CONTENTS[contentId]
    const renderFunction = CONTENTS_HANDLER[contentId]
    renderFunction(content)
}

const activateNavbar = function(contentId){
    const NAVBAR_SELECTOR = "#navbar"
    const ACTIVE_ITEM_CLASS = "activeNavItem"
    const navBar = document.querySelector(NAVBAR_SELECTOR)
    for (const navItem of navBar.children){
        if(navItem.id === contentId){
            navItem.classList.add(ACTIVE_ITEM_CLASS)
        } else {
            navItem.classList.remove(ACTIVE_ITEM_CLASS)
        }
    }
}


const renderAllProjects = function(allProjects){
    document.querySelector("#content").innerHTML = "";
    let projectId = 1; 
    for(const project of allProjects){
        fetch("/views/projects.html")
        .then(response => {
            return response.text()
        })
        .then(data => {
            document.querySelector("#content").innerHTML += `<div id = "project${projectId}"></div>`;
            const projectRoot = document.querySelector(`#project${projectId}`)
            projectRoot.innerHTML = data
            projectId++;
            renderProject(projectRoot, project)
        })
    }
}

const renderProject = function(projectRoot, project){
    projectRoot.querySelector(".title").innerHTML = project.title
    projectRoot.querySelector(".firstParagraph").innerHTML = project.firstParagraph
    const listImages = projectRoot.getElementsByClassName("listImage")
    listImages[0].src = project.firstImgUrl
    listImages[1].src = project.secondImgUrl
    projectRoot.querySelector(".sourceCode").href = project.url
    projectRoot.querySelector(".secondParagraph").innerHTML = project.secondParagraph
    projectRoot.querySelector(".thirdParagraph").innerHTML = project.thirdParagraph
    const paragraphs = projectRoot.getElementsByClassName("paragraph")
    for(const paragraph of paragraphs){
        const text = paragraph.innerHTML
        const firstSpace = text.indexOf(" ")
        const firstWord = text.slice(0, firstSpace)
        const remainingWords = text.slice(firstSpace, text.length)
        
        paragraph.innerHTML = `<span class = "highlight">${firstWord}</span>`
        paragraph.innerHTML += remainingWords
    }
}

const renderAllExperiences = function(allExperiences){
    document.querySelector("#content").innerHTML = "";
    let experienceId = 1; 
    for(const experience of allExperiences){
        fetch("/views/experiences.html")
        .then(response => {
            return response.text()
        })
        .then(data => {
            document.querySelector("#content").innerHTML += `<div id = "experience${experienceId}"></div>`;
            const experienceRoot = document.querySelector(`#experience${experienceId}`)
            experienceRoot.innerHTML = data
            experienceId++;
            renderExperience(experienceRoot, experience)
        })
    }
}

const renderExperience = function(experienceRoot, experience){
    experienceRoot.querySelector(".title").innerHTML = experience.title
    experienceRoot.querySelector(".firstParagraph").innerHTML = experience.firstParagraph
    const experienceImages = experienceRoot.getElementsByClassName("listImage")
    experienceImages[0].src = experience.firstImgUrl
    experienceImages[1].src = experience.secondImgUrl
    experienceRoot.querySelector(".secondParagraph").innerHTML = experience.secondParagraph
    experienceRoot.querySelector(".thirdParagraph").innerHTML = experience.thirdParagraph
    const paragraphs = experienceRoot.getElementsByClassName("paragraph")
    for(const paragraph of paragraphs){
        const text = paragraph.innerHTML
        const firstSpace = text.indexOf(" ")
        const firstWord = text.slice(0, firstSpace)
        const remainingWords = text.slice(firstSpace, text.length)
        
        paragraph.innerHTML = `<span class = "highlight">${firstWord}</span>`
        paragraph.innerHTML += remainingWords
    }
}

const renderResume = function(content){
    document.querySelector("#content").innerHTML = "";
    fetch("/views/resume.html")
        .then(response => {
            return response.text()
        })
        .then(data => {
            document.querySelector("#content").innerHTML = data;
        })
}

/* WHY EVENT LISTENERS INSTEAD OF <div onclick=function(this)> ?  
*   main.js must be a module to import content.js module exported variables. 
*   HTML cannot access module functions. Solutions are:
*       1) binding functions to window object OR
*       2) manually adding event listeners (chosen) 
*/

const initialRender = function(){
    const NAVBAR_SELECTOR = "#navbar"
    const navBar = document.querySelector(NAVBAR_SELECTOR)
    for(const navItem of navBar.children){
        navItem.addEventListener("click", e => {renderContent(e.target)})
    }

    renderAllProjects(CONTENTS.projects)
}

initialRender()