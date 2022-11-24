import { renderEntry } from '../blogEntry/controller'
import {section, setSection} from '/components/blogSection/model.js'


export const renderSection = async function(viewRoot, entryList, parentStateLifter){
    setSection(entryList)
    await renderView(viewRoot)
    setViewState(entry, viewRoot, parentStateLifter)
}

const renderView = async function(viewRoot){
    const view = await fetch('/components/blogSection/view.html')
        .then(res =>{ return res.text() })
    viewRoot.innerHTML = view
}

const setViewState = function(entry, viewRoot, parentStateLifter){
    for(const entry of section){
        renderEntry(entry)
    }
}
