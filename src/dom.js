import { projectList,deleteProject } from "./project"
import { deleteTask } from "./task"
import deleteImg from "./images/delete.png"
import editImg from "./images/edit.png"

const showForm = function(formContainerId){
    const formContainer = document.querySelector(formContainerId)
    formContainer.classList.remove("hidden")
}

const hideForm = function(formContainerId){
    const formContainer = document.querySelector(formContainerId)
    formContainer.classList.add("hidden")
}

const hideButton = function(button){
    button.hidden = "hidden"
}

const showButton = function(button){
    button.hidden = ""
}

const resetForm = function(form){
    form.reset()
}

let currentProjectId

const displayProject = function(){
    console.log(projectList)
    const projectListSidebar = document.querySelector(".project-list")
    projectListSidebar.innerHTML = ""
    projectList.forEach((project,index)=>{
        const projectSidebar = document.createElement("div");
        projectSidebar.classList.add("project")
        projectSidebar.id = "project" + index
        projectSidebar.innerHTML = `<p>${project.projectName}</p>`

        const deleteProjectBtn = document.createElement("img")
        deleteProjectBtn.src = deleteImg
        

        projectSidebar.childNodes[0].addEventListener("click",(e)=>{
            currentProjectId = e.target.parentElement.id.slice(7,)
            displayTask(currentProjectId)
            showButton(document.querySelector("#add-task"))
        })

        deleteProjectBtn.addEventListener("click",(e)=>{
            deleteProject(e.target.parentElement.id.slice(7,))

        })

        projectListSidebar.appendChild(projectSidebar)
        projectSidebar.appendChild(deleteProjectBtn)
    })
}

let currentTaskId
let isEditTask = false
const setIsEditTask = function(value){
    isEditTask = value
}


const displayTask = function(projectId){
    const projectNameDisplay = document.querySelector(".project-name-display")
    projectNameDisplay.innerHTML=`<p>${projectList[projectId].projectName}</p>`

    document.querySelector(".tasks-content").insertBefore(document.querySelector("#task-form-container"),null)

    const taskListDisplay = document.querySelector(".task-list")
    taskListDisplay.innerHTML = ""

    hideForm("#task-form-container")
    
    projectList[projectId].taskList.forEach((task,index)=>{
        const taskDisplay = document.createElement("div")
        taskDisplay.classList.add("task")
        taskDisplay.id = "task" + index
        taskListDisplay.append(taskDisplay)
        taskDisplay.innerHTML=`<p>Title: ${task.title}</p>
                                <input type="checkbox" id="task-checkbox">
                                <p>Detail: ${task.detail}</p>
                                <p>Due On: ${task.date}</p>`

        const taskCheckbox=taskDisplay.childNodes[2]
        if (task.completed) {
            taskCheckbox.checked = true
            taskDisplay.classList.add("completed")
        }

        const deleteTaskBtn = document.createElement("img")
        deleteTaskBtn.src = deleteImg
        taskDisplay.insertBefore(deleteTaskBtn,taskDisplay.childNodes[3])

        const editTaskBtn = document.createElement("img")
        editTaskBtn.src = editImg
        taskDisplay.insertBefore(editTaskBtn,taskDisplay.childNodes[3])
        
        taskCheckbox.addEventListener("click",()=>{
            if (taskCheckbox.checked){
                task.completed = true
                taskDisplay.classList.add("completed")

            }else{
                task.completed = false
                taskDisplay.classList.remove("completed")
            }
            
        })

        deleteTaskBtn.addEventListener("click",(e)=>{
            deleteTask(e.target.parentElement.id.slice(4,))
        })

        editTaskBtn.addEventListener("click",(e)=>{
            currentTaskId = e.target.parentElement.id.slice(4,)
            setIsEditTask(true)
            const taskFormContainer = document.querySelector("#task-form-container")
            taskListDisplay.insertBefore(taskFormContainer,e.target.parentElement.nextSibling)
            showForm("#task-form-container")
            hideButton(document.querySelector("#add-task"))
            taskDisplay.childNodes[2].style.visibility="hidden"
            taskDisplay.childNodes[3].style.visibility="hidden"
            taskDisplay.childNodes[4].style.visibility="hidden"
            
        })

    })
}




export {showForm,hideForm,resetForm, showButton, hideButton, 
    displayProject,displayTask,currentProjectId,currentTaskId,isEditTask,setIsEditTask}