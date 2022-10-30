import {INDEX_STATES} from '/components/index/model.js'
import {renderIndex} from '/components/index/controller.js'

const root = document.getElementById("indexRoot");

renderIndex(root, INDEX_STATES.projectList)