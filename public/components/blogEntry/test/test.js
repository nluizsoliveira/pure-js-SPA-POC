import {renderEntry} from '/components/blogEntry/controller.js'
// import {stateLifter} from '/components/blogEntry/controller.js'

const entryRoot = document.getElementById("entryRoot")

const entry = {
    id: 1,
    content: "testing your first component",
    href: "/blog/infra_devops/1"
}

const stateLifter = function(target){
    console.log(target)
}

renderEntry(entryRoot, entry, stateLifter);

