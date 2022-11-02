import {renderExperience} from '/components/experience/controller.js'

const NEW_EXPERIENCE = {
    title: "Backend Intern - Amdocs (Nov 2021 - Current)",
    companyInfo: "World leading Software provider for Telecoms",
    firstParagraph: "Worked with data migration and backend of Claro, a telecom company with over 90.000.000 clients", 
    firstImage: "components/experience/test/images/experience_1_1.png",
    secondImage: "components/experience/test/images/experience_1_2.gif",
    secondParagraph: "Implemented Bash, Pro*C and SQL scripts for OI-CLARO clients database migration.",
    thirdParagraph: "Manteined and tested Java Web applications (Oracle Weblogic stack: EJBs, JSPs; Junit)"
}

const root = document.getElementById("experienceRoot")

renderExperience(root, NEW_EXPERIENCE)