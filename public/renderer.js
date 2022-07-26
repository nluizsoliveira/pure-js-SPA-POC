import {CONTENTS} from '/pages_content/contents.js'

const activateNavbar = function(contentId){
    const navBar = document.querySelector("#navbar")
    for (const navItem of navBar.children){
        navItem.id == contentId? navItem.classList.add("activeNavItem") : navItem.classList.remove("activeNavItem")
    }
}

export const renderAllContents =  function(clickedNavItem){
    const contentId = clickedNavItem.id
    activateNavbar(contentId)
    document.querySelector("#content").innerHTML = "";
    const viewPath = `/views/${contentId}.html`
    const allContents = CONTENTS[contentId]
    fetch(viewPath)
        .then(response => {
            return response.text()
        })
        .then(view => {
            console.log(allContents)
            const allContentsRoot = document.querySelector("#content")
            for(const content of allContents){
                const contentRoot = document.createElement('div')
                contentRoot.innerHTML = view
                allContentsRoot.appendChild(contentRoot)
                renderContent(content, contentRoot)
            }
        }).catch((err)=>{
            console.log(err)
        })
}

const renderContent = function(content, contentRoot){
    const SPECIAL_TAGS_HANDLER = {
        'IMG': 'src',
        'A': 'href',
        'EMBED': 'src'
    }
    for (const [className, value] of Object.entries(content)){
        const elementRoot = contentRoot.querySelector(`.${className}`)
        const specialContent = SPECIAL_TAGS_HANDLER[elementRoot.tagName]
        console.log(specialContent)
        if(specialContent){
            elementRoot[specialContent] = value
        } else{
            elementRoot.innerHTML = value
        }
    }
}