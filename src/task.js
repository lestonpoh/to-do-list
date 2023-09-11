import { showForm, hideForm,resetForm, showButton, hideButton,
        currentProjectId, currentTaskId, isEditTask,setIsEditTask, displayTask} from "./dom";
import { projectList } from "./project";



const createTaskListener = function(){
    const addTask = document.querySelector("#add-task");
    const cancelTask = document.querySelector("#cancel-task")
    const taskForm = document.querySelector("#task-form")

    const taskContent = document.querySelector(".tasks-content")
    const taskFormContainer = document.querySelector("#task-form-container")
    addTask.addEventListener("click",()=>{
        setIsEditTask(false)
        taskContent.insertBefore(taskFormContainer,null)
        showForm("#task-form-container")
        hideButton(addTask)
    })

    
    cancelTask.addEventListener("click",(e)=>{
        if (isEditTask){
            document.querySelector("#task"+currentTaskId).childNodes[2].style.visibility="visible"
            document.querySelector("#task"+currentTaskId).childNodes[3].style.visibility="visible"
            document.querySelector("#task"+currentTaskId).childNodes[4].style.visibility="visible"
        }else{
            
        }

        hideForm("#task-form-container")
        resetForm(document.querySelector("#task-form"))
        showButton(addTask)
    })

    
    taskForm.addEventListener("submit",(e)=>{
        e.preventDefault()
        if (isEditTask === false){
            addNewTask()
        }else{
            editTask()
           
        }
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
    localStorage.setItem("projectList",JSON.stringify(projectList))
    displayTask(currentProjectId)
    
}

const deleteTask = function(taskId){
    projectList[currentProjectId].taskList.splice(taskId,1)
    localStorage.setItem("projectList",JSON.stringify(projectList))
    displayTask(currentProjectId)
}

const editTask = function(){
    const editedTaskTitle = document.querySelector("#task-title").value
    const editedTaskDetail = document.querySelector("#task-details").value
    const editedTaskDate = document.querySelector("#task-date").value
    projectList[currentProjectId].taskList[currentTaskId].title = editedTaskTitle
    projectList[currentProjectId].taskList[currentTaskId].detail = editedTaskDetail
    projectList[currentProjectId].taskList[currentTaskId].date = editedTaskDate
    localStorage.setItem("projectList",JSON.stringify(projectList))
    displayTask(currentProjectId)
}

export {createTaskListener, deleteTask, editTask}