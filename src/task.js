import { showForm, hideForm,resetForm, showButton, hideButton,
        currentProjectId, displayTask} from "./dom";
import { projectList } from "./project";

const taskList = []

const createTaskListener = function(){
    const addTask = document.querySelector("#add-task");
    addTask.addEventListener("click",()=>{
        showForm("#task-form-container")
        hideButton(addTask)
    })

    const cancelTask = document.querySelector("#cancel-task")
    cancelTask.addEventListener("click",()=>{
        hideForm("#task-form-container")
        resetForm(document.querySelector("#task-form"))
        showButton(addTask)
    })

    const taskForm = document.querySelector("#task-form")
    taskForm.addEventListener("submit",(e)=>{
        e.preventDefault()
        console.log(projectList)
        addNewTask()
        resetForm(document.querySelector("#task-form"))
        showButton(addTask)
    })
}

const createTask = function(title,detail,date,completed){
    return {title,detail,date,completed}
}

const addNewTask = function(){
    const taskTitle = document.querySelector("#task-title").value
    const taskDetail = document.querySelector("#task-details").value
    const taskDate = document.querySelector("#task-date").value
    const newTask =  createTask(taskTitle,taskDetail,taskDate,false)
    projectList[currentProjectId].taskList.push(newTask)
    hideForm("#task-form-container")
    localStorage.setItem("projectList",JSON.stringify(projectList))
    displayTask(currentProjectId)
    
}

export {createTaskListener}