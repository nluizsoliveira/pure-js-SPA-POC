import {PROJECTS} from '/components/projectList/model.js'
import {renderProject} from '/components/project/controller.js'

export const renderProjectList = async function(root){
    for (const project of PROJECTS){
        const projectRoot = document.createElement('div')
        await renderProject(projectRoot, project)
        root.appendChild(projectRoot)
    }
}