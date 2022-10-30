import {EXPERIENCES} from '/components/experienceList/model.js'
import {renderExperience} from '/components/experience/controller.js'

export const renderExperienceList = async function(root){
    for (const experience of EXPERIENCES){
        const experienceRoot = document.createElement('div')
        await renderExperience(experienceRoot, experience)
        root.appendChild(experienceRoot)
    }
}