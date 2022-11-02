let experience = null

const setExperience = function(newExperience){
    experience = {
        title: newExperience.title, 
        companyInfo: newExperience.companyInfo, 
        firstParagraph: newExperience.firstParagraph,
        firstImage: newExperience.firstImage, 
        secondImage: newExperience.secondImage, 
        secondParagraph: newExperience.secondParagraph, 
        thirdParagraph: newExperience.thirdParagraph
    }
}

export {experience, setExperience}