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


const projectList = JSON.parse(localStorage.getItem("projectList"))

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
    console.log(typeof projectList)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ2hDLHNEQUFzRCxpREFBVztBQUNqRSxJQUFJLGtEQUFXLENBQUMsa0RBQWdCO0FBQ2hDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxpREFBVyxDQUFDLGtEQUFnQixXQUFXLCtDQUFhO0FBQ3hELElBQUksaURBQVcsQ0FBQyxrREFBZ0IsV0FBVywrQ0FBYTtBQUN4RCxJQUFJLGlEQUFXLENBQUMsa0RBQWdCLFdBQVcsK0NBQWE7QUFDeEQsc0RBQXNELGlEQUFXO0FBQ2pFLElBQUksa0RBQVcsQ0FBQyxrREFBZ0I7QUFDaEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUNsRkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDbEI4RDtBQUNsQjtBQUNMOztBQUV2QywrREFBcUI7QUFDckIsMERBQWtCO0FBQ2xCLHFEQUFjLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy90YXNrLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHByb2plY3RMaXN0LGRlbGV0ZVByb2plY3QgfSBmcm9tIFwiLi9wcm9qZWN0XCJcbmltcG9ydCB7IGRlbGV0ZVRhc2sgfSBmcm9tIFwiLi90YXNrXCJcbmltcG9ydCBkZWxldGVJbWcgZnJvbSBcIi4vaW1hZ2VzL2RlbGV0ZS5wbmdcIlxuaW1wb3J0IGVkaXRJbWcgZnJvbSBcIi4vaW1hZ2VzL2VkaXQucG5nXCJcblxuY29uc3Qgc2hvd0Zvcm0gPSBmdW5jdGlvbihmb3JtQ29udGFpbmVySWQpe1xuICAgIGNvbnN0IGZvcm1Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGZvcm1Db250YWluZXJJZClcbiAgICBmb3JtQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIilcbn1cblxuY29uc3QgaGlkZUZvcm0gPSBmdW5jdGlvbihmb3JtQ29udGFpbmVySWQpe1xuICAgIGNvbnN0IGZvcm1Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGZvcm1Db250YWluZXJJZClcbiAgICBmb3JtQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIilcbn1cblxuY29uc3QgaGlkZUJ1dHRvbiA9IGZ1bmN0aW9uKGJ1dHRvbil7XG4gICAgYnV0dG9uLmhpZGRlbiA9IFwiaGlkZGVuXCJcbn1cblxuY29uc3Qgc2hvd0J1dHRvbiA9IGZ1bmN0aW9uKGJ1dHRvbil7XG4gICAgYnV0dG9uLmhpZGRlbiA9IFwiXCJcbn1cblxuY29uc3QgcmVzZXRGb3JtID0gZnVuY3Rpb24oZm9ybSl7XG4gICAgZm9ybS5yZXNldCgpXG59XG5cbmxldCBjdXJyZW50UHJvamVjdElkXG5cbmNvbnN0IGRpc3BsYXlQcm9qZWN0ID0gZnVuY3Rpb24oKXtcbiAgICBjb25zdCBwcm9qZWN0TGlzdFNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtbGlzdFwiKVxuICAgIHByb2plY3RMaXN0U2lkZWJhci5pbm5lckhUTUwgPSBcIlwiXG4gICAgcHJvamVjdExpc3QuZm9yRWFjaCgocHJvamVjdCxpbmRleCk9PntcbiAgICAgICAgY29uc3QgcHJvamVjdFNpZGViYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBwcm9qZWN0U2lkZWJhci5jbGFzc0xpc3QuYWRkKFwicHJvamVjdFwiKVxuICAgICAgICBwcm9qZWN0U2lkZWJhci5pZCA9IFwicHJvamVjdFwiICsgaW5kZXhcbiAgICAgICAgcHJvamVjdFNpZGViYXIuaW5uZXJIVE1MID0gYDxwPiR7cHJvamVjdC5wcm9qZWN0TmFtZX08L3A+YFxuXG4gICAgICAgIGNvbnN0IGRlbGV0ZVByb2plY3RCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpXG4gICAgICAgIGRlbGV0ZVByb2plY3RCdG4uc3JjID0gZGVsZXRlSW1nXG4gICAgICAgIFxuXG4gICAgICAgIHByb2plY3RTaWRlYmFyLmNoaWxkTm9kZXNbMF0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsKGUpPT57XG4gICAgICAgICAgICBjdXJyZW50UHJvamVjdElkID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5pZC5zbGljZSg3LClcbiAgICAgICAgICAgIGRpc3BsYXlUYXNrKGN1cnJlbnRQcm9qZWN0SWQpXG4gICAgICAgICAgICBzaG93QnV0dG9uKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLXRhc2tcIikpXG4gICAgICAgIH0pXG5cbiAgICAgICAgZGVsZXRlUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwoZSk9PntcbiAgICAgICAgICAgIGRlbGV0ZVByb2plY3QoZS50YXJnZXQucGFyZW50RWxlbWVudC5pZC5zbGljZSg3LCkpXG5cbiAgICAgICAgfSlcblxuICAgICAgICBwcm9qZWN0TGlzdFNpZGViYXIuYXBwZW5kQ2hpbGQocHJvamVjdFNpZGViYXIpXG4gICAgICAgIHByb2plY3RTaWRlYmFyLmFwcGVuZENoaWxkKGRlbGV0ZVByb2plY3RCdG4pXG4gICAgfSlcbn1cblxubGV0IGN1cnJlbnRUYXNrSWRcbmxldCBpc0VkaXRUYXNrID0gZmFsc2VcbmNvbnN0IHNldElzRWRpdFRhc2sgPSBmdW5jdGlvbih2YWx1ZSl7XG4gICAgaXNFZGl0VGFzayA9IHZhbHVlXG59XG5cblxuY29uc3QgZGlzcGxheVRhc2sgPSBmdW5jdGlvbihwcm9qZWN0SWQpe1xuICAgIGNvbnN0IHByb2plY3ROYW1lRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1uYW1lLWRpc3BsYXlcIilcbiAgICBwcm9qZWN0TmFtZURpc3BsYXkuaW5uZXJIVE1MPWA8cD4ke3Byb2plY3RMaXN0W3Byb2plY3RJZF0ucHJvamVjdE5hbWV9PC9wPmBcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFza3MtY29udGVudFwiKS5pbnNlcnRCZWZvcmUoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLWZvcm0tY29udGFpbmVyXCIpLG51bGwpXG5cbiAgICBjb25zdCB0YXNrTGlzdERpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stbGlzdFwiKVxuICAgIHRhc2tMaXN0RGlzcGxheS5pbm5lckhUTUwgPSBcIlwiXG5cbiAgICBoaWRlRm9ybShcIiN0YXNrLWZvcm0tY29udGFpbmVyXCIpXG4gICAgXG4gICAgcHJvamVjdExpc3RbcHJvamVjdElkXS50YXNrTGlzdC5mb3JFYWNoKCh0YXNrLGluZGV4KT0+e1xuICAgICAgICBjb25zdCB0YXNrRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgdGFza0Rpc3BsYXkuY2xhc3NMaXN0LmFkZChcInRhc2tcIilcbiAgICAgICAgdGFza0Rpc3BsYXkuaWQgPSBcInRhc2tcIiArIGluZGV4XG4gICAgICAgIHRhc2tMaXN0RGlzcGxheS5hcHBlbmQodGFza0Rpc3BsYXkpXG4gICAgICAgIHRhc2tEaXNwbGF5LmlubmVySFRNTD1gPHA+VGl0bGU6ICR7dGFzay50aXRsZX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cInRhc2stY2hlY2tib3hcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+RGV0YWlsOiAke3Rhc2suZGV0YWlsfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+RHVlIE9uOiAke3Rhc2suZGF0ZX08L3A+YFxuXG4gICAgICAgIGNvbnN0IHRhc2tDaGVja2JveD10YXNrRGlzcGxheS5jaGlsZE5vZGVzWzJdXG4gICAgICAgIGlmICh0YXNrLmNvbXBsZXRlZCkge1xuICAgICAgICAgICAgdGFza0NoZWNrYm94LmNoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgICB0YXNrRGlzcGxheS5jbGFzc0xpc3QuYWRkKFwiY29tcGxldGVkXCIpXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkZWxldGVUYXNrQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKVxuICAgICAgICBkZWxldGVUYXNrQnRuLnNyYyA9IGRlbGV0ZUltZ1xuICAgICAgICB0YXNrRGlzcGxheS5pbnNlcnRCZWZvcmUoZGVsZXRlVGFza0J0bix0YXNrRGlzcGxheS5jaGlsZE5vZGVzWzNdKVxuXG4gICAgICAgIGNvbnN0IGVkaXRUYXNrQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKVxuICAgICAgICBlZGl0VGFza0J0bi5zcmMgPSBlZGl0SW1nXG4gICAgICAgIHRhc2tEaXNwbGF5Lmluc2VydEJlZm9yZShlZGl0VGFza0J0bix0YXNrRGlzcGxheS5jaGlsZE5vZGVzWzNdKVxuICAgICAgICBcbiAgICAgICAgdGFza0NoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCgpPT57XG4gICAgICAgICAgICBpZiAodGFza0NoZWNrYm94LmNoZWNrZWQpe1xuICAgICAgICAgICAgICAgIHRhc2suY29tcGxldGVkID0gdHJ1ZVxuICAgICAgICAgICAgICAgIHRhc2tEaXNwbGF5LmNsYXNzTGlzdC5hZGQoXCJjb21wbGV0ZWRcIilcblxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGFzay5jb21wbGV0ZWQgPSBmYWxzZVxuICAgICAgICAgICAgICAgIHRhc2tEaXNwbGF5LmNsYXNzTGlzdC5yZW1vdmUoXCJjb21wbGV0ZWRcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9KVxuXG4gICAgICAgIGRlbGV0ZVRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsKGUpPT57XG4gICAgICAgICAgICBkZWxldGVUYXNrKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuaWQuc2xpY2UoNCwpKVxuICAgICAgICB9KVxuXG4gICAgICAgIGVkaXRUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLChlKT0+e1xuICAgICAgICAgICAgY3VycmVudFRhc2tJZCA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuaWQuc2xpY2UoNCwpXG4gICAgICAgICAgICBzZXRJc0VkaXRUYXNrKHRydWUpXG4gICAgICAgICAgICBjb25zdCB0YXNrRm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1mb3JtLWNvbnRhaW5lclwiKVxuICAgICAgICAgICAgdGFza0xpc3REaXNwbGF5Lmluc2VydEJlZm9yZSh0YXNrRm9ybUNvbnRhaW5lcixlLnRhcmdldC5wYXJlbnRFbGVtZW50Lm5leHRTaWJsaW5nKVxuICAgICAgICAgICAgc2hvd0Zvcm0oXCIjdGFzay1mb3JtLWNvbnRhaW5lclwiKVxuICAgICAgICAgICAgaGlkZUJ1dHRvbihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZC10YXNrXCIpKVxuICAgICAgICAgICAgdGFza0Rpc3BsYXkuY2hpbGROb2Rlc1syXS5zdHlsZS52aXNpYmlsaXR5PVwiaGlkZGVuXCJcbiAgICAgICAgICAgIHRhc2tEaXNwbGF5LmNoaWxkTm9kZXNbM10uc3R5bGUudmlzaWJpbGl0eT1cImhpZGRlblwiXG4gICAgICAgICAgICB0YXNrRGlzcGxheS5jaGlsZE5vZGVzWzRdLnN0eWxlLnZpc2liaWxpdHk9XCJoaWRkZW5cIlxuICAgICAgICAgICAgXG4gICAgICAgIH0pXG5cbiAgICB9KVxufVxuXG5cblxuXG5leHBvcnQge3Nob3dGb3JtLGhpZGVGb3JtLHJlc2V0Rm9ybSwgc2hvd0J1dHRvbiwgaGlkZUJ1dHRvbiwgXG4gICAgZGlzcGxheVByb2plY3QsZGlzcGxheVRhc2ssY3VycmVudFByb2plY3RJZCxjdXJyZW50VGFza0lkLGlzRWRpdFRhc2ssc2V0SXNFZGl0VGFza30iLCJpbXBvcnQgeyBzaG93Rm9ybSwgaGlkZUZvcm0scmVzZXRGb3JtLFxuICAgICAgICBzaG93QnV0dG9uLCBoaWRlQnV0dG9uLCBkaXNwbGF5UHJvamVjdH0gZnJvbSBcIi4vZG9tXCI7XG5cbmNvbnN0IHByb2plY3RMaXN0ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByb2plY3RMaXN0XCIpKVxuXG5jb25zdCBjcmVhdGVQcm9qZWN0TGlzdGVuZXIgPSBmdW5jdGlvbigpe1xuICAgIGNvbnN0IGFkZFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZC1wcm9qZWN0XCIpO1xuICAgIGFkZFByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsKCk9PntcbiAgICAgICAgc2hvd0Zvcm0oXCIjcHJvamVjdC1mb3JtLWNvbnRhaW5lclwiKVxuICAgICAgICBoaWRlQnV0dG9uKGFkZFByb2plY3QpXG4gICAgfSlcblxuICAgIGNvbnN0IGNhbmNlbFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NhbmNlbC1wcm9qZWN0LW5hbWVcIilcbiAgICBjYW5jZWxQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCgpPT57XG4gICAgICAgIGhpZGVGb3JtKFwiI3Byb2plY3QtZm9ybS1jb250YWluZXJcIilcbiAgICAgICAgcmVzZXRGb3JtKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC1mb3JtXCIpKVxuICAgICAgICBzaG93QnV0dG9uKGFkZFByb2plY3QpXG4gICAgfSlcblxuICAgIGNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0LWZvcm1cIilcbiAgICBwcm9qZWN0Rm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsKGUpPT57XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBhZGROZXdQcm9qZWN0KClcbiAgICAgICAgcmVzZXRGb3JtKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC1mb3JtXCIpKVxuICAgICAgICBzaG93QnV0dG9uKGFkZFByb2plY3QpXG4gICAgfSlcbn1cblxuY29uc3QgY3JlYXRlUHJvamVjdCA9IGZ1bmN0aW9uKHByb2plY3ROYW1lKXtcbiAgICBjb25zdCB0YXNrTGlzdCA9IFtdXG4gICAgcmV0dXJuIHtwcm9qZWN0TmFtZSx0YXNrTGlzdH1cbn1cblxuY29uc3QgYWRkTmV3UHJvamVjdCA9IGZ1bmN0aW9uKCl7XG4gICAgY29uc3QgcHJvamVjdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3QtbmFtZVwiKS52YWx1ZTtcbiAgICBjb25zdCBuZXdQcm9qZWN0ID0gY3JlYXRlUHJvamVjdChwcm9qZWN0TmFtZSlcbiAgICBjb25zb2xlLmxvZyh0eXBlb2YgcHJvamVjdExpc3QpXG4gICAgcHJvamVjdExpc3QucHVzaChuZXdQcm9qZWN0KVxuICAgIGhpZGVGb3JtKFwiI3Byb2plY3QtZm9ybS1jb250YWluZXJcIilcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RMaXN0XCIsSlNPTi5zdHJpbmdpZnkocHJvamVjdExpc3QpKVxuICAgIGRpc3BsYXlQcm9qZWN0KClcbiAgICBcbn1cblxuY29uc3QgZGVsZXRlUHJvamVjdCA9IGZ1bmN0aW9uKHByb2plY3RJZCl7XG4gICAgcHJvamVjdExpc3Quc3BsaWNlKHByb2plY3RJZCwxKVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdExpc3RcIixKU09OLnN0cmluZ2lmeShwcm9qZWN0TGlzdCkpXG4gICAgZGlzcGxheVByb2plY3QoKVxufVxuXG5cblxuXG5leHBvcnQge3Byb2plY3RMaXN0LCBjcmVhdGVQcm9qZWN0TGlzdGVuZXIsIGRlbGV0ZVByb2plY3R9IiwiaW1wb3J0IHsgc2hvd0Zvcm0sIGhpZGVGb3JtLHJlc2V0Rm9ybSwgc2hvd0J1dHRvbiwgaGlkZUJ1dHRvbixcbiAgICAgICAgY3VycmVudFByb2plY3RJZCwgY3VycmVudFRhc2tJZCwgaXNFZGl0VGFzayxzZXRJc0VkaXRUYXNrLCBkaXNwbGF5VGFza30gZnJvbSBcIi4vZG9tXCI7XG5pbXBvcnQgeyBwcm9qZWN0TGlzdCB9IGZyb20gXCIuL3Byb2plY3RcIjtcblxuXG5cbmNvbnN0IGNyZWF0ZVRhc2tMaXN0ZW5lciA9IGZ1bmN0aW9uKCl7XG4gICAgY29uc3QgYWRkVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLXRhc2tcIik7XG4gICAgY29uc3QgY2FuY2VsVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2FuY2VsLXRhc2tcIilcbiAgICBjb25zdCB0YXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1mb3JtXCIpXG5cbiAgICBjb25zdCB0YXNrQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFza3MtY29udGVudFwiKVxuICAgIGNvbnN0IHRhc2tGb3JtQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLWZvcm0tY29udGFpbmVyXCIpXG4gICAgYWRkVGFzay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwoKT0+e1xuICAgICAgICBzZXRJc0VkaXRUYXNrKGZhbHNlKVxuICAgICAgICB0YXNrQ29udGVudC5pbnNlcnRCZWZvcmUodGFza0Zvcm1Db250YWluZXIsbnVsbClcbiAgICAgICAgc2hvd0Zvcm0oXCIjdGFzay1mb3JtLWNvbnRhaW5lclwiKVxuICAgICAgICBoaWRlQnV0dG9uKGFkZFRhc2spXG4gICAgfSlcblxuICAgIFxuICAgIGNhbmNlbFRhc2suYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsKGUpPT57XG4gICAgICAgIGlmIChpc0VkaXRUYXNrKXtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFza1wiK2N1cnJlbnRUYXNrSWQpLmNoaWxkTm9kZXNbMl0uc3R5bGUudmlzaWJpbGl0eT1cInZpc2libGVcIlxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrXCIrY3VycmVudFRhc2tJZCkuY2hpbGROb2Rlc1szXS5zdHlsZS52aXNpYmlsaXR5PVwidmlzaWJsZVwiXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2tcIitjdXJyZW50VGFza0lkKS5jaGlsZE5vZGVzWzRdLnN0eWxlLnZpc2liaWxpdHk9XCJ2aXNpYmxlXCJcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIGhpZGVGb3JtKFwiI3Rhc2stZm9ybS1jb250YWluZXJcIilcbiAgICAgICAgcmVzZXRGb3JtKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1mb3JtXCIpKVxuICAgICAgICBzaG93QnV0dG9uKGFkZFRhc2spXG4gICAgfSlcblxuICAgIFxuICAgIHRhc2tGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwoZSk9PntcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGlmIChpc0VkaXRUYXNrID09PSBmYWxzZSl7XG4gICAgICAgICAgICBhZGROZXdUYXNrKClcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBlZGl0VGFzaygpXG4gICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIHJlc2V0Rm9ybShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stZm9ybVwiKSlcbiAgICAgICAgc2hvd0J1dHRvbihhZGRUYXNrKVxuICAgIH0pXG5cblxuICAgIFxufVxuXG5jb25zdCBjcmVhdGVUYXNrID0gZnVuY3Rpb24odGl0bGUsZGV0YWlsLGRhdGUsY29tcGxldGVkKXtcbiAgICByZXR1cm4ge3RpdGxlLGRldGFpbCxkYXRlLGNvbXBsZXRlZH1cbn1cblxuY29uc3QgYWRkTmV3VGFzayA9IGZ1bmN0aW9uKCl7XG4gICAgY29uc3QgdGFza1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLXRpdGxlXCIpLnZhbHVlXG4gICAgY29uc3QgdGFza0RldGFpbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1kZXRhaWxzXCIpLnZhbHVlXG4gICAgY29uc3QgdGFza0RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stZGF0ZVwiKS52YWx1ZVxuICAgIGNvbnN0IG5ld1Rhc2sgPSAgY3JlYXRlVGFzayh0YXNrVGl0bGUsdGFza0RldGFpbCx0YXNrRGF0ZSxmYWxzZSlcbiAgICBwcm9qZWN0TGlzdFtjdXJyZW50UHJvamVjdElkXS50YXNrTGlzdC5wdXNoKG5ld1Rhc2spXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0TGlzdFwiLEpTT04uc3RyaW5naWZ5KHByb2plY3RMaXN0KSlcbiAgICBkaXNwbGF5VGFzayhjdXJyZW50UHJvamVjdElkKVxuICAgIFxufVxuXG5jb25zdCBkZWxldGVUYXNrID0gZnVuY3Rpb24odGFza0lkKXtcbiAgICBwcm9qZWN0TGlzdFtjdXJyZW50UHJvamVjdElkXS50YXNrTGlzdC5zcGxpY2UodGFza0lkLDEpXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0TGlzdFwiLEpTT04uc3RyaW5naWZ5KHByb2plY3RMaXN0KSlcbiAgICBkaXNwbGF5VGFzayhjdXJyZW50UHJvamVjdElkKVxufVxuXG5jb25zdCBlZGl0VGFzayA9IGZ1bmN0aW9uKCl7XG4gICAgY29uc3QgZWRpdGVkVGFza1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLXRpdGxlXCIpLnZhbHVlXG4gICAgY29uc3QgZWRpdGVkVGFza0RldGFpbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1kZXRhaWxzXCIpLnZhbHVlXG4gICAgY29uc3QgZWRpdGVkVGFza0RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stZGF0ZVwiKS52YWx1ZVxuICAgIHByb2plY3RMaXN0W2N1cnJlbnRQcm9qZWN0SWRdLnRhc2tMaXN0W2N1cnJlbnRUYXNrSWRdLnRpdGxlID0gZWRpdGVkVGFza1RpdGxlXG4gICAgcHJvamVjdExpc3RbY3VycmVudFByb2plY3RJZF0udGFza0xpc3RbY3VycmVudFRhc2tJZF0uZGV0YWlsID0gZWRpdGVkVGFza0RldGFpbFxuICAgIHByb2plY3RMaXN0W2N1cnJlbnRQcm9qZWN0SWRdLnRhc2tMaXN0W2N1cnJlbnRUYXNrSWRdLmRhdGUgPSBlZGl0ZWRUYXNrRGF0ZVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdExpc3RcIixKU09OLnN0cmluZ2lmeShwcm9qZWN0TGlzdCkpXG4gICAgZGlzcGxheVRhc2soY3VycmVudFByb2plY3RJZClcbn1cblxuZXhwb3J0IHtjcmVhdGVUYXNrTGlzdGVuZXIsIGRlbGV0ZVRhc2ssIGVkaXRUYXNrfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICFzY3JpcHRVcmwpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQgeyBwcm9qZWN0TGlzdCxjcmVhdGVQcm9qZWN0TGlzdGVuZXIgfSBmcm9tIFwiLi9wcm9qZWN0XCI7XG5pbXBvcnQgeyBjcmVhdGVUYXNrTGlzdGVuZXIgfSBmcm9tIFwiLi90YXNrXCI7XG5pbXBvcnQgeyBkaXNwbGF5UHJvamVjdCB9IGZyb20gXCIuL2RvbVwiO1xuXG5jcmVhdGVQcm9qZWN0TGlzdGVuZXIoKVxuY3JlYXRlVGFza0xpc3RlbmVyKClcbmRpc3BsYXlQcm9qZWN0KCkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=