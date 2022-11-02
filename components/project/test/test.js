import {renderProject} from '/components/project/controller.js'

const NEW_PROJECT = {    
    title: "Certificate Generator",
    firstParagraph: "Node.js batch script that parses a .csv file and generates .pdf certificates for each line/person",
    firstImage: "components/projectList/images/project_1_1.png",
    secondImage: "components/projectList/images/project_1_2.png",
    sourceCode: "https://github.com/USPCodeLabSanca/Node-Batch-Certificate-Generator",
    secondParagraph: "Mentor of the project, responsible for idealizing, writing requirements, spliting requirements in features divided across team and coding",
    thirdParagraph: "In use for generating USPCodelab certificates."
}

const root = document.getElementById("projectRoot")

renderProject(root, NEW_PROJECT)