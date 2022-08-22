import {EXPERIENCES} from '/components/experienceList/model.js'
import {renderExperienceList} from '/components/experienceList/controller.js'

const root = document.getElementById("experiencesRoot")

renderExperienceList(root, EXPERIENCES)