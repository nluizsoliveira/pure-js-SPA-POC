let entry = null

const setEntry = function(newEntry){
    entry = {
        id: newEntry.id,
        content: newEntry.content,
        href: newEntry.href
    }
}

export {entry, setEntry}