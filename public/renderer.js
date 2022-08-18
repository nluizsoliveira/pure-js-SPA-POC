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
            const allContentsRoot = document.querySelector("#content")
            for(const content of allContents){
                const contentRoot = document.createElement('div')
                contentRoot.innerHTML = view
                allContentsRoot.appendChild(contentRoot)
                renderContent(content, contentRoot)
            }
        })
}

const renderContent = async function(content, contentRoot){
    const PATH_TAGS = {
        'IMG': 'src',
        'A': 'href',
        'EMBED': 'src'
    }
    for (const [className, value] of Object.entries(content)){
        const elementRoot = contentRoot.querySelector(`.${className}`)
        const rootTag = elementRoot.tagName
        const isPathElement = (rootTag in PATH_TAGS)
        if(isPathElement){
            const pathKind = PATH_TAGS[rootTag]
            elementRoot[pathKind] = value
        } 
        else {
            if(elementRoot.classList.contains("processedHTML")){
                elementRoot.innerHTML = await readHTML(value)
            }
            else{
                elementRoot.innerHTML = value
            }
        }
    }
}

const readHTML = async function(path) {
    const HTML = await fetch(path)
        .then(res => {return res.text()})
        .then(html=>{return html})

    return HTML
}