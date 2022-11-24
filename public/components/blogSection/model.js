let section = null

const setSection = function(entryList){

    for(const newEntry of entryList){
        entry = {
            id: newEntry.id,
            content: newEntry.content,
            href: newEntry.href
        }

        section.push(entry)
    }
    
}

export {section, setSection}