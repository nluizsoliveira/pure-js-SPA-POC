import {CONTENTS} from '/pages_content/contents.js'

/* WHY EVENT LISTENERS INSTEAD OF <div onclick=function(this)> ?  
*   main.js must be a module to import content.js module exported variables. 
*   HTML cannot access module functions. Solutions are:
*       1) binding functions to window object OR
*       2) manually adding event listeners (chosen) 
*/
const NAVBAR_SELECTOR = "#navbar"
const navBar = document.querySelector(NAVBAR_SELECTOR)
for(const navItem of navBar.children){
    navItem.addEventListener("click", e => {renderContent(e.target)})
}

const renderContent =  function(clickedNavItem){
    const contentId = clickedNavItem.id
    activateNavbar(contentId)
    const content = CONTENTS[contentId]
    renderTitle(content)
}

const activateNavbar = function(contentId){
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
/*
const renderTitle = function(content){
    const TITLE_ID = '#title'
    const titleTag = document.querySelector(TITLE_ID)
    titleTag.innerHTML = content[0].title
}*/