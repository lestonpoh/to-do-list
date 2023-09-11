/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   currentProjectId: () => (/* binding */ currentProjectId),
/* harmony export */   currentTaskId: () => (/* binding */ currentTaskId),
/* harmony export */   displayProject: () => (/* binding */ displayProject),
/* harmony export */   displayTask: () => (/* binding */ displayTask),
/* harmony export */   hideButton: () => (/* binding */ hideButton),
/* harmony export */   hideForm: () => (/* binding */ hideForm),
/* harmony export */   isEditTask: () => (/* binding */ isEditTask),
/* harmony export */   resetForm: () => (/* binding */ resetForm),
/* harmony export */   setIsEditTask: () => (/* binding */ setIsEditTask),
/* harmony export */   showButton: () => (/* binding */ showButton),
/* harmony export */   showForm: () => (/* binding */ showForm)
/* harmony export */ });
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project */ "./src/project.js");
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task */ "./src/task.js");
/* harmony import */ var _images_delete_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./images/delete.png */ "./src/images/delete.png");
/* harmony import */ var _images_edit_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./images/edit.png */ "./src/images/edit.png");





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
    console.log(_project__WEBPACK_IMPORTED_MODULE_0__.projectList)
    const projectListSidebar = document.querySelector(".project-list")
    projectListSidebar.innerHTML = ""
    _project__WEBPACK_IMPORTED_MODULE_0__.projectList.forEach((project,index)=>{
        const projectSidebar = document.createElement("div");
        projectSidebar.classList.add("project")
        projectSidebar.id = "project" + index
        projectSidebar.innerHTML = `<p>${project.projectName}</p>`

        const deleteProjectBtn = document.createElement("img")
        deleteProjectBtn.src = _images_delete_png__WEBPACK_IMPORTED_MODULE_2__
        

        projectSidebar.childNodes[0].addEventListener("click",(e)=>{
            currentProjectId = e.target.parentElement.id.slice(7,)
            displayTask(currentProjectId)
            showButton(document.querySelector("#add-task"))
        })

        deleteProjectBtn.addEventListener("click",(e)=>{
            ;(0,_project__WEBPACK_IMPORTED_MODULE_0__.deleteProject)(e.target.parentElement.id.slice(7,))

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
    projectNameDisplay.innerHTML=`<p>${_project__WEBPACK_IMPORTED_MODULE_0__.projectList[projectId].projectName}</p>`

    document.querySelector(".tasks-content").insertBefore(document.querySelector("#task-form-container"),null)

    const taskListDisplay = document.querySelector(".task-list")
    taskListDisplay.innerHTML = ""

    hideForm("#task-form-container")
    
    _project__WEBPACK_IMPORTED_MODULE_0__.projectList[projectId].taskList.forEach((task,index)=>{
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
        deleteTaskBtn.src = _images_delete_png__WEBPACK_IMPORTED_MODULE_2__
        taskDisplay.insertBefore(deleteTaskBtn,taskDisplay.childNodes[3])

        const editTaskBtn = document.createElement("img")
        editTaskBtn.src = _images_edit_png__WEBPACK_IMPORTED_MODULE_3__
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
            ;(0,_task__WEBPACK_IMPORTED_MODULE_1__.deleteTask)(e.target.parentElement.id.slice(4,))
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






/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createProjectListener: () => (/* binding */ createProjectListener),
/* harmony export */   deleteProject: () => (/* binding */ deleteProject),
/* harmony export */   projectList: () => (/* binding */ projectList)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");



let projectList = JSON.parse(localStorage.getItem("projectList"))
if (projectList === null){
    projectList = []
}


const createProjectListener = function(){
    const addProject = document.querySelector("#add-project");
    addProject.addEventListener("click",()=>{
        (0,_dom__WEBPACK_IMPORTED_MODULE_0__.showForm)("#project-form-container")
        ;(0,_dom__WEBPACK_IMPORTED_MODULE_0__.hideButton)(addProject)
    })

    const cancelProject = document.querySelector("#cancel-project-name")
    cancelProject.addEventListener("click",()=>{
        ;(0,_dom__WEBPACK_IMPORTED_MODULE_0__.hideForm)("#project-form-container")
        ;(0,_dom__WEBPACK_IMPORTED_MODULE_0__.resetForm)(document.querySelector("#project-form"))
        ;(0,_dom__WEBPACK_IMPORTED_MODULE_0__.showButton)(addProject)
    })

    const projectForm = document.querySelector("#project-form")
    projectForm.addEventListener("submit",(e)=>{
        e.preventDefault()
        addNewProject()
        ;(0,_dom__WEBPACK_IMPORTED_MODULE_0__.resetForm)(document.querySelector("#project-form"))
        ;(0,_dom__WEBPACK_IMPORTED_MODULE_0__.showButton)(addProject)
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
    ;(0,_dom__WEBPACK_IMPORTED_MODULE_0__.hideForm)("#project-form-container")
    localStorage.setItem("projectList",JSON.stringify(projectList))
    ;(0,_dom__WEBPACK_IMPORTED_MODULE_0__.displayProject)()
    
}

const deleteProject = function(projectId){
    projectList.splice(projectId,1)
    localStorage.setItem("projectList",JSON.stringify(projectList))
    ;(0,_dom__WEBPACK_IMPORTED_MODULE_0__.displayProject)()
}






/***/ }),

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createTaskListener: () => (/* binding */ createTaskListener),
/* harmony export */   deleteTask: () => (/* binding */ deleteTask),
/* harmony export */   editTask: () => (/* binding */ editTask)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project */ "./src/project.js");





const createTaskListener = function(){
    const addTask = document.querySelector("#add-task");
    const cancelTask = document.querySelector("#cancel-task")
    const taskForm = document.querySelector("#task-form")

    const taskContent = document.querySelector(".tasks-content")
    const taskFormContainer = document.querySelector("#task-form-container")
    addTask.addEventListener("click",()=>{
        ;(0,_dom__WEBPACK_IMPORTED_MODULE_0__.setIsEditTask)(false)
        taskContent.insertBefore(taskFormContainer,null)
        ;(0,_dom__WEBPACK_IMPORTED_MODULE_0__.showForm)("#task-form-container")
        ;(0,_dom__WEBPACK_IMPORTED_MODULE_0__.hideButton)(addTask)
    })

    
    cancelTask.addEventListener("click",(e)=>{
        if (_dom__WEBPACK_IMPORTED_MODULE_0__.isEditTask){
            document.querySelector("#task"+_dom__WEBPACK_IMPORTED_MODULE_0__.currentTaskId).childNodes[2].style.visibility="visible"
            document.querySelector("#task"+_dom__WEBPACK_IMPORTED_MODULE_0__.currentTaskId).childNodes[3].style.visibility="visible"
            document.querySelector("#task"+_dom__WEBPACK_IMPORTED_MODULE_0__.currentTaskId).childNodes[4].style.visibility="visible"
        }else{
            
        }

        (0,_dom__WEBPACK_IMPORTED_MODULE_0__.hideForm)("#task-form-container")
        ;(0,_dom__WEBPACK_IMPORTED_MODULE_0__.resetForm)(document.querySelector("#task-form"))
        ;(0,_dom__WEBPACK_IMPORTED_MODULE_0__.showButton)(addTask)
    })

    
    taskForm.addEventListener("submit",(e)=>{
        e.preventDefault()
        if (_dom__WEBPACK_IMPORTED_MODULE_0__.isEditTask === false){
            addNewTask()
        }else{
            editTask()
           
        }
        (0,_dom__WEBPACK_IMPORTED_MODULE_0__.resetForm)(document.querySelector("#task-form"))
        ;(0,_dom__WEBPACK_IMPORTED_MODULE_0__.showButton)(addTask)
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
    _project__WEBPACK_IMPORTED_MODULE_1__.projectList[_dom__WEBPACK_IMPORTED_MODULE_0__.currentProjectId].taskList.push(newTask)
    localStorage.setItem("projectList",JSON.stringify(_project__WEBPACK_IMPORTED_MODULE_1__.projectList))
    ;(0,_dom__WEBPACK_IMPORTED_MODULE_0__.displayTask)(_dom__WEBPACK_IMPORTED_MODULE_0__.currentProjectId)
    
}

const deleteTask = function(taskId){
    _project__WEBPACK_IMPORTED_MODULE_1__.projectList[_dom__WEBPACK_IMPORTED_MODULE_0__.currentProjectId].taskList.splice(taskId,1)
    localStorage.setItem("projectList",JSON.stringify(_project__WEBPACK_IMPORTED_MODULE_1__.projectList))
    ;(0,_dom__WEBPACK_IMPORTED_MODULE_0__.displayTask)(_dom__WEBPACK_IMPORTED_MODULE_0__.currentProjectId)
}

const editTask = function(){
    const editedTaskTitle = document.querySelector("#task-title").value
    const editedTaskDetail = document.querySelector("#task-details").value
    const editedTaskDate = document.querySelector("#task-date").value
    _project__WEBPACK_IMPORTED_MODULE_1__.projectList[_dom__WEBPACK_IMPORTED_MODULE_0__.currentProjectId].taskList[_dom__WEBPACK_IMPORTED_MODULE_0__.currentTaskId].title = editedTaskTitle
    _project__WEBPACK_IMPORTED_MODULE_1__.projectList[_dom__WEBPACK_IMPORTED_MODULE_0__.currentProjectId].taskList[_dom__WEBPACK_IMPORTED_MODULE_0__.currentTaskId].detail = editedTaskDetail
    _project__WEBPACK_IMPORTED_MODULE_1__.projectList[_dom__WEBPACK_IMPORTED_MODULE_0__.currentProjectId].taskList[_dom__WEBPACK_IMPORTED_MODULE_0__.currentTaskId].date = editedTaskDate
    localStorage.setItem("projectList",JSON.stringify(_project__WEBPACK_IMPORTED_MODULE_1__.projectList))
    ;(0,_dom__WEBPACK_IMPORTED_MODULE_0__.displayTask)(_dom__WEBPACK_IMPORTED_MODULE_0__.currentProjectId)
}



/***/ }),

/***/ "./src/images/delete.png":
/*!*******************************!*\
  !*** ./src/images/delete.png ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "1ce1f523c16f7af7ecc0.png";

/***/ }),

/***/ "./src/images/edit.png":
/*!*****************************!*\
  !*** ./src/images/edit.png ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "0f46e2728eb984e21ce8.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project */ "./src/project.js");
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task */ "./src/task.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom */ "./src/dom.js");




(0,_project__WEBPACK_IMPORTED_MODULE_0__.createProjectListener)()
;(0,_task__WEBPACK_IMPORTED_MODULE_1__.createTaskListener)()
;(0,_dom__WEBPACK_IMPORTED_MODULE_2__.displayProject)()
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUVBO0FBQ0EsSUFBSSxpREFBVyxDQUFDLGtEQUFnQjtBQUNoQyxzREFBc0QsaURBQVc7QUFDakUsSUFBSSxrREFBVyxDQUFDLGtEQUFnQjtBQUNoQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksaURBQVcsQ0FBQyxrREFBZ0IsV0FBVywrQ0FBYTtBQUN4RCxJQUFJLGlEQUFXLENBQUMsa0RBQWdCLFdBQVcsK0NBQWE7QUFDeEQsSUFBSSxpREFBVyxDQUFDLGtEQUFnQixXQUFXLCtDQUFhO0FBQ3hELHNEQUFzRCxpREFBVztBQUNqRSxJQUFJLGtEQUFXLENBQUMsa0RBQWdCO0FBQ2hDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDbEZBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7Ozs7Ozs7Ozs7OztBQ2xCOEQ7QUFDbEI7QUFDTDs7QUFFdkMsK0RBQXFCO0FBQ3JCLDBEQUFrQjtBQUNsQixxREFBYyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9wcm9qZWN0LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvdGFzay5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwcm9qZWN0TGlzdCxkZWxldGVQcm9qZWN0IH0gZnJvbSBcIi4vcHJvamVjdFwiXG5pbXBvcnQgeyBkZWxldGVUYXNrIH0gZnJvbSBcIi4vdGFza1wiXG5pbXBvcnQgZGVsZXRlSW1nIGZyb20gXCIuL2ltYWdlcy9kZWxldGUucG5nXCJcbmltcG9ydCBlZGl0SW1nIGZyb20gXCIuL2ltYWdlcy9lZGl0LnBuZ1wiXG5cbmNvbnN0IHNob3dGb3JtID0gZnVuY3Rpb24oZm9ybUNvbnRhaW5lcklkKXtcbiAgICBjb25zdCBmb3JtQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihmb3JtQ29udGFpbmVySWQpXG4gICAgZm9ybUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpXG59XG5cbmNvbnN0IGhpZGVGb3JtID0gZnVuY3Rpb24oZm9ybUNvbnRhaW5lcklkKXtcbiAgICBjb25zdCBmb3JtQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihmb3JtQ29udGFpbmVySWQpXG4gICAgZm9ybUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpXG59XG5cbmNvbnN0IGhpZGVCdXR0b24gPSBmdW5jdGlvbihidXR0b24pe1xuICAgIGJ1dHRvbi5oaWRkZW4gPSBcImhpZGRlblwiXG59XG5cbmNvbnN0IHNob3dCdXR0b24gPSBmdW5jdGlvbihidXR0b24pe1xuICAgIGJ1dHRvbi5oaWRkZW4gPSBcIlwiXG59XG5cbmNvbnN0IHJlc2V0Rm9ybSA9IGZ1bmN0aW9uKGZvcm0pe1xuICAgIGZvcm0ucmVzZXQoKVxufVxuXG5sZXQgY3VycmVudFByb2plY3RJZFxuXG5jb25zdCBkaXNwbGF5UHJvamVjdCA9IGZ1bmN0aW9uKCl7XG4gICAgY29uc29sZS5sb2cocHJvamVjdExpc3QpXG4gICAgY29uc3QgcHJvamVjdExpc3RTaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LWxpc3RcIilcbiAgICBwcm9qZWN0TGlzdFNpZGViYXIuaW5uZXJIVE1MID0gXCJcIlxuICAgIHByb2plY3RMaXN0LmZvckVhY2goKHByb2plY3QsaW5kZXgpPT57XG4gICAgICAgIGNvbnN0IHByb2plY3RTaWRlYmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgcHJvamVjdFNpZGViYXIuY2xhc3NMaXN0LmFkZChcInByb2plY3RcIilcbiAgICAgICAgcHJvamVjdFNpZGViYXIuaWQgPSBcInByb2plY3RcIiArIGluZGV4XG4gICAgICAgIHByb2plY3RTaWRlYmFyLmlubmVySFRNTCA9IGA8cD4ke3Byb2plY3QucHJvamVjdE5hbWV9PC9wPmBcblxuICAgICAgICBjb25zdCBkZWxldGVQcm9qZWN0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKVxuICAgICAgICBkZWxldGVQcm9qZWN0QnRuLnNyYyA9IGRlbGV0ZUltZ1xuICAgICAgICBcblxuICAgICAgICBwcm9qZWN0U2lkZWJhci5jaGlsZE5vZGVzWzBdLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLChlKT0+e1xuICAgICAgICAgICAgY3VycmVudFByb2plY3RJZCA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuaWQuc2xpY2UoNywpXG4gICAgICAgICAgICBkaXNwbGF5VGFzayhjdXJyZW50UHJvamVjdElkKVxuICAgICAgICAgICAgc2hvd0J1dHRvbihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZC10YXNrXCIpKVxuICAgICAgICB9KVxuXG4gICAgICAgIGRlbGV0ZVByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsKGUpPT57XG4gICAgICAgICAgICBkZWxldGVQcm9qZWN0KGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuaWQuc2xpY2UoNywpKVxuXG4gICAgICAgIH0pXG5cbiAgICAgICAgcHJvamVjdExpc3RTaWRlYmFyLmFwcGVuZENoaWxkKHByb2plY3RTaWRlYmFyKVxuICAgICAgICBwcm9qZWN0U2lkZWJhci5hcHBlbmRDaGlsZChkZWxldGVQcm9qZWN0QnRuKVxuICAgIH0pXG59XG5cbmxldCBjdXJyZW50VGFza0lkXG5sZXQgaXNFZGl0VGFzayA9IGZhbHNlXG5jb25zdCBzZXRJc0VkaXRUYXNrID0gZnVuY3Rpb24odmFsdWUpe1xuICAgIGlzRWRpdFRhc2sgPSB2YWx1ZVxufVxuXG5cbmNvbnN0IGRpc3BsYXlUYXNrID0gZnVuY3Rpb24ocHJvamVjdElkKXtcbiAgICBjb25zdCBwcm9qZWN0TmFtZURpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtbmFtZS1kaXNwbGF5XCIpXG4gICAgcHJvamVjdE5hbWVEaXNwbGF5LmlubmVySFRNTD1gPHA+JHtwcm9qZWN0TGlzdFtwcm9qZWN0SWRdLnByb2plY3ROYW1lfTwvcD5gXG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2tzLWNvbnRlbnRcIikuaW5zZXJ0QmVmb3JlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1mb3JtLWNvbnRhaW5lclwiKSxudWxsKVxuXG4gICAgY29uc3QgdGFza0xpc3REaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWxpc3RcIilcbiAgICB0YXNrTGlzdERpc3BsYXkuaW5uZXJIVE1MID0gXCJcIlxuXG4gICAgaGlkZUZvcm0oXCIjdGFzay1mb3JtLWNvbnRhaW5lclwiKVxuICAgIFxuICAgIHByb2plY3RMaXN0W3Byb2plY3RJZF0udGFza0xpc3QuZm9yRWFjaCgodGFzayxpbmRleCk9PntcbiAgICAgICAgY29uc3QgdGFza0Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgICAgIHRhc2tEaXNwbGF5LmNsYXNzTGlzdC5hZGQoXCJ0YXNrXCIpXG4gICAgICAgIHRhc2tEaXNwbGF5LmlkID0gXCJ0YXNrXCIgKyBpbmRleFxuICAgICAgICB0YXNrTGlzdERpc3BsYXkuYXBwZW5kKHRhc2tEaXNwbGF5KVxuICAgICAgICB0YXNrRGlzcGxheS5pbm5lckhUTUw9YDxwPlRpdGxlOiAke3Rhc2sudGl0bGV9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJ0YXNrLWNoZWNrYm94XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPkRldGFpbDogJHt0YXNrLmRldGFpbH08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPkR1ZSBPbjogJHt0YXNrLmRhdGV9PC9wPmBcblxuICAgICAgICBjb25zdCB0YXNrQ2hlY2tib3g9dGFza0Rpc3BsYXkuY2hpbGROb2Rlc1syXVxuICAgICAgICBpZiAodGFzay5jb21wbGV0ZWQpIHtcbiAgICAgICAgICAgIHRhc2tDaGVja2JveC5jaGVja2VkID0gdHJ1ZVxuICAgICAgICAgICAgdGFza0Rpc3BsYXkuY2xhc3NMaXN0LmFkZChcImNvbXBsZXRlZFwiKVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZGVsZXRlVGFza0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIilcbiAgICAgICAgZGVsZXRlVGFza0J0bi5zcmMgPSBkZWxldGVJbWdcbiAgICAgICAgdGFza0Rpc3BsYXkuaW5zZXJ0QmVmb3JlKGRlbGV0ZVRhc2tCdG4sdGFza0Rpc3BsYXkuY2hpbGROb2Rlc1szXSlcblxuICAgICAgICBjb25zdCBlZGl0VGFza0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIilcbiAgICAgICAgZWRpdFRhc2tCdG4uc3JjID0gZWRpdEltZ1xuICAgICAgICB0YXNrRGlzcGxheS5pbnNlcnRCZWZvcmUoZWRpdFRhc2tCdG4sdGFza0Rpc3BsYXkuY2hpbGROb2Rlc1szXSlcbiAgICAgICAgXG4gICAgICAgIHRhc2tDaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwoKT0+e1xuICAgICAgICAgICAgaWYgKHRhc2tDaGVja2JveC5jaGVja2VkKXtcbiAgICAgICAgICAgICAgICB0YXNrLmNvbXBsZXRlZCA9IHRydWVcbiAgICAgICAgICAgICAgICB0YXNrRGlzcGxheS5jbGFzc0xpc3QuYWRkKFwiY29tcGxldGVkXCIpXG5cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRhc2suY29tcGxldGVkID0gZmFsc2VcbiAgICAgICAgICAgICAgICB0YXNrRGlzcGxheS5jbGFzc0xpc3QucmVtb3ZlKFwiY29tcGxldGVkXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfSlcblxuICAgICAgICBkZWxldGVUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLChlKT0+e1xuICAgICAgICAgICAgZGVsZXRlVGFzayhlLnRhcmdldC5wYXJlbnRFbGVtZW50LmlkLnNsaWNlKDQsKSlcbiAgICAgICAgfSlcblxuICAgICAgICBlZGl0VGFza0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwoZSk9PntcbiAgICAgICAgICAgIGN1cnJlbnRUYXNrSWQgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmlkLnNsaWNlKDQsKVxuICAgICAgICAgICAgc2V0SXNFZGl0VGFzayh0cnVlKVxuICAgICAgICAgICAgY29uc3QgdGFza0Zvcm1Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stZm9ybS1jb250YWluZXJcIilcbiAgICAgICAgICAgIHRhc2tMaXN0RGlzcGxheS5pbnNlcnRCZWZvcmUodGFza0Zvcm1Db250YWluZXIsZS50YXJnZXQucGFyZW50RWxlbWVudC5uZXh0U2libGluZylcbiAgICAgICAgICAgIHNob3dGb3JtKFwiI3Rhc2stZm9ybS1jb250YWluZXJcIilcbiAgICAgICAgICAgIGhpZGVCdXR0b24oZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGQtdGFza1wiKSlcbiAgICAgICAgICAgIHRhc2tEaXNwbGF5LmNoaWxkTm9kZXNbMl0uc3R5bGUudmlzaWJpbGl0eT1cImhpZGRlblwiXG4gICAgICAgICAgICB0YXNrRGlzcGxheS5jaGlsZE5vZGVzWzNdLnN0eWxlLnZpc2liaWxpdHk9XCJoaWRkZW5cIlxuICAgICAgICAgICAgdGFza0Rpc3BsYXkuY2hpbGROb2Rlc1s0XS5zdHlsZS52aXNpYmlsaXR5PVwiaGlkZGVuXCJcbiAgICAgICAgICAgIFxuICAgICAgICB9KVxuXG4gICAgfSlcbn1cblxuXG5cblxuZXhwb3J0IHtzaG93Rm9ybSxoaWRlRm9ybSxyZXNldEZvcm0sIHNob3dCdXR0b24sIGhpZGVCdXR0b24sIFxuICAgIGRpc3BsYXlQcm9qZWN0LGRpc3BsYXlUYXNrLGN1cnJlbnRQcm9qZWN0SWQsY3VycmVudFRhc2tJZCxpc0VkaXRUYXNrLHNldElzRWRpdFRhc2t9IiwiaW1wb3J0IHsgc2hvd0Zvcm0sIGhpZGVGb3JtLHJlc2V0Rm9ybSxcbiAgICAgICAgc2hvd0J1dHRvbiwgaGlkZUJ1dHRvbiwgZGlzcGxheVByb2plY3R9IGZyb20gXCIuL2RvbVwiO1xuXG5cbmxldCBwcm9qZWN0TGlzdCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcm9qZWN0TGlzdFwiKSlcbmlmIChwcm9qZWN0TGlzdCA9PT0gbnVsbCl7XG4gICAgcHJvamVjdExpc3QgPSBbXVxufVxuXG5cbmNvbnN0IGNyZWF0ZVByb2plY3RMaXN0ZW5lciA9IGZ1bmN0aW9uKCl7XG4gICAgY29uc3QgYWRkUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLXByb2plY3RcIik7XG4gICAgYWRkUHJvamVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwoKT0+e1xuICAgICAgICBzaG93Rm9ybShcIiNwcm9qZWN0LWZvcm0tY29udGFpbmVyXCIpXG4gICAgICAgIGhpZGVCdXR0b24oYWRkUHJvamVjdClcbiAgICB9KVxuXG4gICAgY29uc3QgY2FuY2VsUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2FuY2VsLXByb2plY3QtbmFtZVwiKVxuICAgIGNhbmNlbFByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsKCk9PntcbiAgICAgICAgaGlkZUZvcm0oXCIjcHJvamVjdC1mb3JtLWNvbnRhaW5lclwiKVxuICAgICAgICByZXNldEZvcm0oZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0LWZvcm1cIikpXG4gICAgICAgIHNob3dCdXR0b24oYWRkUHJvamVjdClcbiAgICB9KVxuXG4gICAgY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3QtZm9ybVwiKVxuICAgIHByb2plY3RGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwoZSk9PntcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGFkZE5ld1Byb2plY3QoKVxuICAgICAgICByZXNldEZvcm0oZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0LWZvcm1cIikpXG4gICAgICAgIHNob3dCdXR0b24oYWRkUHJvamVjdClcbiAgICB9KVxufVxuXG5jb25zdCBjcmVhdGVQcm9qZWN0ID0gZnVuY3Rpb24ocHJvamVjdE5hbWUpe1xuICAgIGNvbnN0IHRhc2tMaXN0ID0gW11cbiAgICByZXR1cm4ge3Byb2plY3ROYW1lLHRhc2tMaXN0fVxufVxuXG5jb25zdCBhZGROZXdQcm9qZWN0ID0gZnVuY3Rpb24oKXtcbiAgICBjb25zdCBwcm9qZWN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC1uYW1lXCIpLnZhbHVlO1xuICAgIGNvbnN0IG5ld1Byb2plY3QgPSBjcmVhdGVQcm9qZWN0KHByb2plY3ROYW1lKVxuICAgIHByb2plY3RMaXN0LnB1c2gobmV3UHJvamVjdClcbiAgICBoaWRlRm9ybShcIiNwcm9qZWN0LWZvcm0tY29udGFpbmVyXCIpXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0TGlzdFwiLEpTT04uc3RyaW5naWZ5KHByb2plY3RMaXN0KSlcbiAgICBkaXNwbGF5UHJvamVjdCgpXG4gICAgXG59XG5cbmNvbnN0IGRlbGV0ZVByb2plY3QgPSBmdW5jdGlvbihwcm9qZWN0SWQpe1xuICAgIHByb2plY3RMaXN0LnNwbGljZShwcm9qZWN0SWQsMSlcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RMaXN0XCIsSlNPTi5zdHJpbmdpZnkocHJvamVjdExpc3QpKVxuICAgIGRpc3BsYXlQcm9qZWN0KClcbn1cblxuXG5cblxuZXhwb3J0IHtwcm9qZWN0TGlzdCwgY3JlYXRlUHJvamVjdExpc3RlbmVyLCBkZWxldGVQcm9qZWN0fSIsImltcG9ydCB7IHNob3dGb3JtLCBoaWRlRm9ybSxyZXNldEZvcm0sIHNob3dCdXR0b24sIGhpZGVCdXR0b24sXG4gICAgICAgIGN1cnJlbnRQcm9qZWN0SWQsIGN1cnJlbnRUYXNrSWQsIGlzRWRpdFRhc2ssc2V0SXNFZGl0VGFzaywgZGlzcGxheVRhc2t9IGZyb20gXCIuL2RvbVwiO1xuaW1wb3J0IHsgcHJvamVjdExpc3QgfSBmcm9tIFwiLi9wcm9qZWN0XCI7XG5cblxuXG5jb25zdCBjcmVhdGVUYXNrTGlzdGVuZXIgPSBmdW5jdGlvbigpe1xuICAgIGNvbnN0IGFkZFRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZC10YXNrXCIpO1xuICAgIGNvbnN0IGNhbmNlbFRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NhbmNlbC10YXNrXCIpXG4gICAgY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stZm9ybVwiKVxuXG4gICAgY29uc3QgdGFza0NvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2tzLWNvbnRlbnRcIilcbiAgICBjb25zdCB0YXNrRm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1mb3JtLWNvbnRhaW5lclwiKVxuICAgIGFkZFRhc2suYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsKCk9PntcbiAgICAgICAgc2V0SXNFZGl0VGFzayhmYWxzZSlcbiAgICAgICAgdGFza0NvbnRlbnQuaW5zZXJ0QmVmb3JlKHRhc2tGb3JtQ29udGFpbmVyLG51bGwpXG4gICAgICAgIHNob3dGb3JtKFwiI3Rhc2stZm9ybS1jb250YWluZXJcIilcbiAgICAgICAgaGlkZUJ1dHRvbihhZGRUYXNrKVxuICAgIH0pXG5cbiAgICBcbiAgICBjYW5jZWxUYXNrLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLChlKT0+e1xuICAgICAgICBpZiAoaXNFZGl0VGFzayl7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2tcIitjdXJyZW50VGFza0lkKS5jaGlsZE5vZGVzWzJdLnN0eWxlLnZpc2liaWxpdHk9XCJ2aXNpYmxlXCJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFza1wiK2N1cnJlbnRUYXNrSWQpLmNoaWxkTm9kZXNbM10uc3R5bGUudmlzaWJpbGl0eT1cInZpc2libGVcIlxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrXCIrY3VycmVudFRhc2tJZCkuY2hpbGROb2Rlc1s0XS5zdHlsZS52aXNpYmlsaXR5PVwidmlzaWJsZVwiXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICBoaWRlRm9ybShcIiN0YXNrLWZvcm0tY29udGFpbmVyXCIpXG4gICAgICAgIHJlc2V0Rm9ybShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stZm9ybVwiKSlcbiAgICAgICAgc2hvd0J1dHRvbihhZGRUYXNrKVxuICAgIH0pXG5cbiAgICBcbiAgICB0YXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsKGUpPT57XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBpZiAoaXNFZGl0VGFzayA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgYWRkTmV3VGFzaygpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgZWRpdFRhc2soKVxuICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICByZXNldEZvcm0oZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLWZvcm1cIikpXG4gICAgICAgIHNob3dCdXR0b24oYWRkVGFzaylcbiAgICB9KVxuXG5cbiAgICBcbn1cblxuY29uc3QgY3JlYXRlVGFzayA9IGZ1bmN0aW9uKHRpdGxlLGRldGFpbCxkYXRlLGNvbXBsZXRlZCl7XG4gICAgcmV0dXJuIHt0aXRsZSxkZXRhaWwsZGF0ZSxjb21wbGV0ZWR9XG59XG5cbmNvbnN0IGFkZE5ld1Rhc2sgPSBmdW5jdGlvbigpe1xuICAgIGNvbnN0IHRhc2tUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay10aXRsZVwiKS52YWx1ZVxuICAgIGNvbnN0IHRhc2tEZXRhaWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stZGV0YWlsc1wiKS52YWx1ZVxuICAgIGNvbnN0IHRhc2tEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLWRhdGVcIikudmFsdWVcbiAgICBjb25zdCBuZXdUYXNrID0gIGNyZWF0ZVRhc2sodGFza1RpdGxlLHRhc2tEZXRhaWwsdGFza0RhdGUsZmFsc2UpXG4gICAgcHJvamVjdExpc3RbY3VycmVudFByb2plY3RJZF0udGFza0xpc3QucHVzaChuZXdUYXNrKVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdExpc3RcIixKU09OLnN0cmluZ2lmeShwcm9qZWN0TGlzdCkpXG4gICAgZGlzcGxheVRhc2soY3VycmVudFByb2plY3RJZClcbiAgICBcbn1cblxuY29uc3QgZGVsZXRlVGFzayA9IGZ1bmN0aW9uKHRhc2tJZCl7XG4gICAgcHJvamVjdExpc3RbY3VycmVudFByb2plY3RJZF0udGFza0xpc3Quc3BsaWNlKHRhc2tJZCwxKVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdExpc3RcIixKU09OLnN0cmluZ2lmeShwcm9qZWN0TGlzdCkpXG4gICAgZGlzcGxheVRhc2soY3VycmVudFByb2plY3RJZClcbn1cblxuY29uc3QgZWRpdFRhc2sgPSBmdW5jdGlvbigpe1xuICAgIGNvbnN0IGVkaXRlZFRhc2tUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay10aXRsZVwiKS52YWx1ZVxuICAgIGNvbnN0IGVkaXRlZFRhc2tEZXRhaWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stZGV0YWlsc1wiKS52YWx1ZVxuICAgIGNvbnN0IGVkaXRlZFRhc2tEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLWRhdGVcIikudmFsdWVcbiAgICBwcm9qZWN0TGlzdFtjdXJyZW50UHJvamVjdElkXS50YXNrTGlzdFtjdXJyZW50VGFza0lkXS50aXRsZSA9IGVkaXRlZFRhc2tUaXRsZVxuICAgIHByb2plY3RMaXN0W2N1cnJlbnRQcm9qZWN0SWRdLnRhc2tMaXN0W2N1cnJlbnRUYXNrSWRdLmRldGFpbCA9IGVkaXRlZFRhc2tEZXRhaWxcbiAgICBwcm9qZWN0TGlzdFtjdXJyZW50UHJvamVjdElkXS50YXNrTGlzdFtjdXJyZW50VGFza0lkXS5kYXRlID0gZWRpdGVkVGFza0RhdGVcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RMaXN0XCIsSlNPTi5zdHJpbmdpZnkocHJvamVjdExpc3QpKVxuICAgIGRpc3BsYXlUYXNrKGN1cnJlbnRQcm9qZWN0SWQpXG59XG5cbmV4cG9ydCB7Y3JlYXRlVGFza0xpc3RlbmVyLCBkZWxldGVUYXNrLCBlZGl0VGFza30iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAhc2NyaXB0VXJsKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiaW1wb3J0IHsgcHJvamVjdExpc3QsY3JlYXRlUHJvamVjdExpc3RlbmVyIH0gZnJvbSBcIi4vcHJvamVjdFwiO1xuaW1wb3J0IHsgY3JlYXRlVGFza0xpc3RlbmVyIH0gZnJvbSBcIi4vdGFza1wiO1xuaW1wb3J0IHsgZGlzcGxheVByb2plY3QgfSBmcm9tIFwiLi9kb21cIjtcblxuY3JlYXRlUHJvamVjdExpc3RlbmVyKClcbmNyZWF0ZVRhc2tMaXN0ZW5lcigpXG5kaXNwbGF5UHJvamVjdCgpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9