import { showForm, hideForm,resetForm,
        showButton, hideButton, displayProject} from "./dom";


let projectList = JSON.parse(localStorage.getItem("projectList"))
if (projectList === null){
    projectList = []
}


const createProjectListener = function(){
    const addProject = document.querySelector("#add-project");
    addProject.addEventListener("click",()=>{
        showForm("#project-form-container")
        hideButton(addProject)
    })

    const cancelProject = document.querySelector("#cancel-project-name")
    cancelProject.addEventListener("click",()=>{
        hideForm("#project-form-container")
        resetForm(document.querySelector("#project-form"))
        showButton(addProject)
    })

    const projectForm = document.querySelector("#project-form")
    projectForm.addEventListener("submit",(e)=>{
        e.preventDefault()
        addNewProject()
        resetForm(document.querySelector("#project-form"))
        showButton(addProject)
    })
}

const createProject = function(projectName){
    const taskList = []
    return {projectName,taskList}
}

const addNewProject = function(){
    const projectName = document.querySelector("#project-name").value;
    const newProject = createProject(projectName)
    projectList.push(newProject)
    hideForm("#project-form-container")
    localStorage.setItem("projectList",JSON.stringify(projectList))
    displayProject()
    
}

const deleteProject = function(projectId){
    projectList.splice(projectId,1)
    localStorage.setItem("projectList",JSON.stringify(projectList))
    displayProject()
}




export {projectList, createProjectListener, deleteProject}