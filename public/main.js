import {INDEX_STATES} from '/components/index/model.js'
import {renderIndex} from '/components/index/controller.js'

const root = document.getElementById("indexRoot");
const path = window.location.pathname
let state = INDEX_STATES.about

if(path.includes("blog")){
    state = INDEX_STATES.blog
}
renderIndex(root, state)