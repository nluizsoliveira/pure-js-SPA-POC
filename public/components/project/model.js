let project = null

const setProject = function(newproject){
    project = {
        title: newproject.title, 
        firstParagraph: newproject.firstParagraph,
        firstImage: newproject.firstImage, 
        secondImage: newproject.secondImage, 
        sourceCode: newproject.sourceCode, 
        secondParagraph: newproject.secondParagraph, 
        thirdParagraph: newproject.thirdParagraph
    }
}

export {project, setProject}