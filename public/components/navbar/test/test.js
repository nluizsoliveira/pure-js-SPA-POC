import {NAV_STATES} from '/components/navbar/model.js'
import {renderNav} from '/components/navbar/controller.js'
import {stateLifter} from '/components/index/controller.js'

const root = document.getElementById("navRoot")
renderNav(root, NAV_STATES.experienceList, stateLifter);

