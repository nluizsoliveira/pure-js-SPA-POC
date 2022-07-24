import {PROJECTS_CONTENT} from '/pages_content/contents.js'

const NAVBAR_SELECTOR = "#navbar"
const navBar = document.querySelector(NAVBAR_SELECTOR)
for(const navItem of navBar.children){
    navItem.addEventListener('click', (e)=>{
        renderContent(e)
    })
}

export const renderContent =  function(clickedNavItem){
    const contentOptionId = clickedNavItem.target.id
    activateNavbar(contentOptionId)
    console.log(PROJECTS_CONTENT)
}

export const activateNavbar = function(optionId){
    const ACTIVE_ITEM_CLASS = "activeNavItem"
    const navBar = document.querySelector(NAVBAR_SELECTOR)
    for (const navItem of navBar.children){
        if(navItem.id === optionId){
            navItem.classList.add(ACTIVE_ITEM_CLASS)
        } else {
            navItem.classList.remove(ACTIVE_ITEM_CLASS)
        }
    }
}