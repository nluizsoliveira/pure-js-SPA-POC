// '<link rel="stylesheet" href="/components/blogEntry/view.css">'
const getEntryCSS = function(){
    const link = document.createElement('link')
    link.rel = "stylesheet"
    link.href = "/components/blogEntry/view.css"
    return link
}

// '<a class = "blogEntry" ></a>'
const getEntryView = function(){
    const a = document.createElement('a')
    a.className = 'bloEntry'
    return a
} 

const entryCSS = getEntryCSS()
const entryView = getEntryView()

export{
    entryCSS,
    entryView
}