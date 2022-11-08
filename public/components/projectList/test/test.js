import {PROJECTS} from '/components/projectList/model.js'
import {renderProjectList} from '/components/projectList/controller.js'

const root = document.getElementById("projectsRoot")

renderProjectList(root, PROJECTS)