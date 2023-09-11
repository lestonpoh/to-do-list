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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxrREFBZ0I7QUFDaEMsc0RBQXNELGlEQUFXO0FBQ2pFLElBQUksa0RBQVcsQ0FBQyxrREFBZ0I7QUFDaEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGlEQUFXLENBQUMsa0RBQWdCLFdBQVcsK0NBQWE7QUFDeEQsSUFBSSxpREFBVyxDQUFDLGtEQUFnQixXQUFXLCtDQUFhO0FBQ3hELElBQUksaURBQVcsQ0FBQyxrREFBZ0IsV0FBVywrQ0FBYTtBQUN4RCxzREFBc0QsaURBQVc7QUFDakUsSUFBSSxrREFBVyxDQUFDLGtEQUFnQjtBQUNoQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQ2xGQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7Ozs7Ozs7Ozs7QUNsQjhEO0FBQ2xCO0FBQ0w7O0FBRXZDLCtEQUFxQjtBQUNyQiwwREFBa0I7QUFDbEIscURBQWMsRSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3Rhc2suanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHJvamVjdExpc3QsZGVsZXRlUHJvamVjdCB9IGZyb20gXCIuL3Byb2plY3RcIlxuaW1wb3J0IHsgZGVsZXRlVGFzayB9IGZyb20gXCIuL3Rhc2tcIlxuaW1wb3J0IGRlbGV0ZUltZyBmcm9tIFwiLi9pbWFnZXMvZGVsZXRlLnBuZ1wiXG5pbXBvcnQgZWRpdEltZyBmcm9tIFwiLi9pbWFnZXMvZWRpdC5wbmdcIlxuXG5jb25zdCBzaG93Rm9ybSA9IGZ1bmN0aW9uKGZvcm1Db250YWluZXJJZCl7XG4gICAgY29uc3QgZm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZm9ybUNvbnRhaW5lcklkKVxuICAgIGZvcm1Db250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKVxufVxuXG5jb25zdCBoaWRlRm9ybSA9IGZ1bmN0aW9uKGZvcm1Db250YWluZXJJZCl7XG4gICAgY29uc3QgZm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZm9ybUNvbnRhaW5lcklkKVxuICAgIGZvcm1Db250YWluZXIuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKVxufVxuXG5jb25zdCBoaWRlQnV0dG9uID0gZnVuY3Rpb24oYnV0dG9uKXtcbiAgICBidXR0b24uaGlkZGVuID0gXCJoaWRkZW5cIlxufVxuXG5jb25zdCBzaG93QnV0dG9uID0gZnVuY3Rpb24oYnV0dG9uKXtcbiAgICBidXR0b24uaGlkZGVuID0gXCJcIlxufVxuXG5jb25zdCByZXNldEZvcm0gPSBmdW5jdGlvbihmb3JtKXtcbiAgICBmb3JtLnJlc2V0KClcbn1cblxubGV0IGN1cnJlbnRQcm9qZWN0SWRcblxuY29uc3QgZGlzcGxheVByb2plY3QgPSBmdW5jdGlvbigpe1xuICAgIGNvbnN0IHByb2plY3RMaXN0U2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1saXN0XCIpXG4gICAgcHJvamVjdExpc3RTaWRlYmFyLmlubmVySFRNTCA9IFwiXCJcbiAgICBwcm9qZWN0TGlzdC5mb3JFYWNoKChwcm9qZWN0LGluZGV4KT0+e1xuICAgICAgICBjb25zdCBwcm9qZWN0U2lkZWJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHByb2plY3RTaWRlYmFyLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0XCIpXG4gICAgICAgIHByb2plY3RTaWRlYmFyLmlkID0gXCJwcm9qZWN0XCIgKyBpbmRleFxuICAgICAgICBwcm9qZWN0U2lkZWJhci5pbm5lckhUTUwgPSBgPHA+JHtwcm9qZWN0LnByb2plY3ROYW1lfTwvcD5gXG5cbiAgICAgICAgY29uc3QgZGVsZXRlUHJvamVjdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIilcbiAgICAgICAgZGVsZXRlUHJvamVjdEJ0bi5zcmMgPSBkZWxldGVJbWdcbiAgICAgICAgXG5cbiAgICAgICAgcHJvamVjdFNpZGViYXIuY2hpbGROb2Rlc1swXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwoZSk9PntcbiAgICAgICAgICAgIGN1cnJlbnRQcm9qZWN0SWQgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmlkLnNsaWNlKDcsKVxuICAgICAgICAgICAgZGlzcGxheVRhc2soY3VycmVudFByb2plY3RJZClcbiAgICAgICAgICAgIHNob3dCdXR0b24oZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGQtdGFza1wiKSlcbiAgICAgICAgfSlcblxuICAgICAgICBkZWxldGVQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLChlKT0+e1xuICAgICAgICAgICAgZGVsZXRlUHJvamVjdChlLnRhcmdldC5wYXJlbnRFbGVtZW50LmlkLnNsaWNlKDcsKSlcblxuICAgICAgICB9KVxuXG4gICAgICAgIHByb2plY3RMaXN0U2lkZWJhci5hcHBlbmRDaGlsZChwcm9qZWN0U2lkZWJhcilcbiAgICAgICAgcHJvamVjdFNpZGViYXIuYXBwZW5kQ2hpbGQoZGVsZXRlUHJvamVjdEJ0bilcbiAgICB9KVxufVxuXG5sZXQgY3VycmVudFRhc2tJZFxubGV0IGlzRWRpdFRhc2sgPSBmYWxzZVxuY29uc3Qgc2V0SXNFZGl0VGFzayA9IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICBpc0VkaXRUYXNrID0gdmFsdWVcbn1cblxuXG5jb25zdCBkaXNwbGF5VGFzayA9IGZ1bmN0aW9uKHByb2plY3RJZCl7XG4gICAgY29uc3QgcHJvamVjdE5hbWVEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LW5hbWUtZGlzcGxheVwiKVxuICAgIHByb2plY3ROYW1lRGlzcGxheS5pbm5lckhUTUw9YDxwPiR7cHJvamVjdExpc3RbcHJvamVjdElkXS5wcm9qZWN0TmFtZX08L3A+YFxuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrcy1jb250ZW50XCIpLmluc2VydEJlZm9yZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stZm9ybS1jb250YWluZXJcIiksbnVsbClcblxuICAgIGNvbnN0IHRhc2tMaXN0RGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1saXN0XCIpXG4gICAgdGFza0xpc3REaXNwbGF5LmlubmVySFRNTCA9IFwiXCJcblxuICAgIGhpZGVGb3JtKFwiI3Rhc2stZm9ybS1jb250YWluZXJcIilcbiAgICBcbiAgICBwcm9qZWN0TGlzdFtwcm9qZWN0SWRdLnRhc2tMaXN0LmZvckVhY2goKHRhc2ssaW5kZXgpPT57XG4gICAgICAgIGNvbnN0IHRhc2tEaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgICB0YXNrRGlzcGxheS5jbGFzc0xpc3QuYWRkKFwidGFza1wiKVxuICAgICAgICB0YXNrRGlzcGxheS5pZCA9IFwidGFza1wiICsgaW5kZXhcbiAgICAgICAgdGFza0xpc3REaXNwbGF5LmFwcGVuZCh0YXNrRGlzcGxheSlcbiAgICAgICAgdGFza0Rpc3BsYXkuaW5uZXJIVE1MPWA8cD5UaXRsZTogJHt0YXNrLnRpdGxlfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwidGFzay1jaGVja2JveFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5EZXRhaWw6ICR7dGFzay5kZXRhaWx9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5EdWUgT246ICR7dGFzay5kYXRlfTwvcD5gXG5cbiAgICAgICAgY29uc3QgdGFza0NoZWNrYm94PXRhc2tEaXNwbGF5LmNoaWxkTm9kZXNbMl1cbiAgICAgICAgaWYgKHRhc2suY29tcGxldGVkKSB7XG4gICAgICAgICAgICB0YXNrQ2hlY2tib3guY2hlY2tlZCA9IHRydWVcbiAgICAgICAgICAgIHRhc2tEaXNwbGF5LmNsYXNzTGlzdC5hZGQoXCJjb21wbGV0ZWRcIilcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRlbGV0ZVRhc2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpXG4gICAgICAgIGRlbGV0ZVRhc2tCdG4uc3JjID0gZGVsZXRlSW1nXG4gICAgICAgIHRhc2tEaXNwbGF5Lmluc2VydEJlZm9yZShkZWxldGVUYXNrQnRuLHRhc2tEaXNwbGF5LmNoaWxkTm9kZXNbM10pXG5cbiAgICAgICAgY29uc3QgZWRpdFRhc2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpXG4gICAgICAgIGVkaXRUYXNrQnRuLnNyYyA9IGVkaXRJbWdcbiAgICAgICAgdGFza0Rpc3BsYXkuaW5zZXJ0QmVmb3JlKGVkaXRUYXNrQnRuLHRhc2tEaXNwbGF5LmNoaWxkTm9kZXNbM10pXG4gICAgICAgIFxuICAgICAgICB0YXNrQ2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsKCk9PntcbiAgICAgICAgICAgIGlmICh0YXNrQ2hlY2tib3guY2hlY2tlZCl7XG4gICAgICAgICAgICAgICAgdGFzay5jb21wbGV0ZWQgPSB0cnVlXG4gICAgICAgICAgICAgICAgdGFza0Rpc3BsYXkuY2xhc3NMaXN0LmFkZChcImNvbXBsZXRlZFwiKVxuXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0YXNrLmNvbXBsZXRlZCA9IGZhbHNlXG4gICAgICAgICAgICAgICAgdGFza0Rpc3BsYXkuY2xhc3NMaXN0LnJlbW92ZShcImNvbXBsZXRlZFwiKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH0pXG5cbiAgICAgICAgZGVsZXRlVGFza0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwoZSk9PntcbiAgICAgICAgICAgIGRlbGV0ZVRhc2soZS50YXJnZXQucGFyZW50RWxlbWVudC5pZC5zbGljZSg0LCkpXG4gICAgICAgIH0pXG5cbiAgICAgICAgZWRpdFRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsKGUpPT57XG4gICAgICAgICAgICBjdXJyZW50VGFza0lkID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5pZC5zbGljZSg0LClcbiAgICAgICAgICAgIHNldElzRWRpdFRhc2sodHJ1ZSlcbiAgICAgICAgICAgIGNvbnN0IHRhc2tGb3JtQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLWZvcm0tY29udGFpbmVyXCIpXG4gICAgICAgICAgICB0YXNrTGlzdERpc3BsYXkuaW5zZXJ0QmVmb3JlKHRhc2tGb3JtQ29udGFpbmVyLGUudGFyZ2V0LnBhcmVudEVsZW1lbnQubmV4dFNpYmxpbmcpXG4gICAgICAgICAgICBzaG93Rm9ybShcIiN0YXNrLWZvcm0tY29udGFpbmVyXCIpXG4gICAgICAgICAgICBoaWRlQnV0dG9uKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLXRhc2tcIikpXG4gICAgICAgICAgICB0YXNrRGlzcGxheS5jaGlsZE5vZGVzWzJdLnN0eWxlLnZpc2liaWxpdHk9XCJoaWRkZW5cIlxuICAgICAgICAgICAgdGFza0Rpc3BsYXkuY2hpbGROb2Rlc1szXS5zdHlsZS52aXNpYmlsaXR5PVwiaGlkZGVuXCJcbiAgICAgICAgICAgIHRhc2tEaXNwbGF5LmNoaWxkTm9kZXNbNF0uc3R5bGUudmlzaWJpbGl0eT1cImhpZGRlblwiXG4gICAgICAgICAgICBcbiAgICAgICAgfSlcblxuICAgIH0pXG59XG5cblxuXG5cbmV4cG9ydCB7c2hvd0Zvcm0saGlkZUZvcm0scmVzZXRGb3JtLCBzaG93QnV0dG9uLCBoaWRlQnV0dG9uLCBcbiAgICBkaXNwbGF5UHJvamVjdCxkaXNwbGF5VGFzayxjdXJyZW50UHJvamVjdElkLGN1cnJlbnRUYXNrSWQsaXNFZGl0VGFzayxzZXRJc0VkaXRUYXNrfSIsImltcG9ydCB7IHNob3dGb3JtLCBoaWRlRm9ybSxyZXNldEZvcm0sXG4gICAgICAgIHNob3dCdXR0b24sIGhpZGVCdXR0b24sIGRpc3BsYXlQcm9qZWN0fSBmcm9tIFwiLi9kb21cIjtcblxuXG5jb25zdCBwcm9qZWN0TGlzdCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcm9qZWN0TGlzdFwiKSlcbmlmIChwcm9qZWN0TGlzdCA9PT0gbnVsbCl7XG4gICAgcHJvamVjdExpc3QgPSBbXVxufVxuXG5jb25zdCBjcmVhdGVQcm9qZWN0TGlzdGVuZXIgPSBmdW5jdGlvbigpe1xuICAgIGNvbnN0IGFkZFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZC1wcm9qZWN0XCIpO1xuICAgIGFkZFByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsKCk9PntcbiAgICAgICAgc2hvd0Zvcm0oXCIjcHJvamVjdC1mb3JtLWNvbnRhaW5lclwiKVxuICAgICAgICBoaWRlQnV0dG9uKGFkZFByb2plY3QpXG4gICAgfSlcblxuICAgIGNvbnN0IGNhbmNlbFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NhbmNlbC1wcm9qZWN0LW5hbWVcIilcbiAgICBjYW5jZWxQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCgpPT57XG4gICAgICAgIGhpZGVGb3JtKFwiI3Byb2plY3QtZm9ybS1jb250YWluZXJcIilcbiAgICAgICAgcmVzZXRGb3JtKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC1mb3JtXCIpKVxuICAgICAgICBzaG93QnV0dG9uKGFkZFByb2plY3QpXG4gICAgfSlcblxuICAgIGNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0LWZvcm1cIilcbiAgICBwcm9qZWN0Rm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsKGUpPT57XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBhZGROZXdQcm9qZWN0KClcbiAgICAgICAgcmVzZXRGb3JtKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC1mb3JtXCIpKVxuICAgICAgICBzaG93QnV0dG9uKGFkZFByb2plY3QpXG4gICAgfSlcbn1cblxuY29uc3QgY3JlYXRlUHJvamVjdCA9IGZ1bmN0aW9uKHByb2plY3ROYW1lKXtcbiAgICBjb25zdCB0YXNrTGlzdCA9IFtdXG4gICAgcmV0dXJuIHtwcm9qZWN0TmFtZSx0YXNrTGlzdH1cbn1cblxuY29uc3QgYWRkTmV3UHJvamVjdCA9IGZ1bmN0aW9uKCl7XG4gICAgY29uc3QgcHJvamVjdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3QtbmFtZVwiKS52YWx1ZTtcbiAgICBjb25zdCBuZXdQcm9qZWN0ID0gY3JlYXRlUHJvamVjdChwcm9qZWN0TmFtZSlcbiAgICBwcm9qZWN0TGlzdC5wdXNoKG5ld1Byb2plY3QpXG4gICAgaGlkZUZvcm0oXCIjcHJvamVjdC1mb3JtLWNvbnRhaW5lclwiKVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdExpc3RcIixKU09OLnN0cmluZ2lmeShwcm9qZWN0TGlzdCkpXG4gICAgZGlzcGxheVByb2plY3QoKVxuICAgIFxufVxuXG5jb25zdCBkZWxldGVQcm9qZWN0ID0gZnVuY3Rpb24ocHJvamVjdElkKXtcbiAgICBwcm9qZWN0TGlzdC5zcGxpY2UocHJvamVjdElkLDEpXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0TGlzdFwiLEpTT04uc3RyaW5naWZ5KHByb2plY3RMaXN0KSlcbiAgICBkaXNwbGF5UHJvamVjdCgpXG59XG5cblxuXG5cbmV4cG9ydCB7cHJvamVjdExpc3QsIGNyZWF0ZVByb2plY3RMaXN0ZW5lciwgZGVsZXRlUHJvamVjdH0iLCJpbXBvcnQgeyBzaG93Rm9ybSwgaGlkZUZvcm0scmVzZXRGb3JtLCBzaG93QnV0dG9uLCBoaWRlQnV0dG9uLFxuICAgICAgICBjdXJyZW50UHJvamVjdElkLCBjdXJyZW50VGFza0lkLCBpc0VkaXRUYXNrLHNldElzRWRpdFRhc2ssIGRpc3BsYXlUYXNrfSBmcm9tIFwiLi9kb21cIjtcbmltcG9ydCB7IHByb2plY3RMaXN0IH0gZnJvbSBcIi4vcHJvamVjdFwiO1xuXG5cblxuY29uc3QgY3JlYXRlVGFza0xpc3RlbmVyID0gZnVuY3Rpb24oKXtcbiAgICBjb25zdCBhZGRUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGQtdGFza1wiKTtcbiAgICBjb25zdCBjYW5jZWxUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjYW5jZWwtdGFza1wiKVxuICAgIGNvbnN0IHRhc2tGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLWZvcm1cIilcblxuICAgIGNvbnN0IHRhc2tDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrcy1jb250ZW50XCIpXG4gICAgY29uc3QgdGFza0Zvcm1Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stZm9ybS1jb250YWluZXJcIilcbiAgICBhZGRUYXNrLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCgpPT57XG4gICAgICAgIHNldElzRWRpdFRhc2soZmFsc2UpXG4gICAgICAgIHRhc2tDb250ZW50Lmluc2VydEJlZm9yZSh0YXNrRm9ybUNvbnRhaW5lcixudWxsKVxuICAgICAgICBzaG93Rm9ybShcIiN0YXNrLWZvcm0tY29udGFpbmVyXCIpXG4gICAgICAgIGhpZGVCdXR0b24oYWRkVGFzaylcbiAgICB9KVxuXG4gICAgXG4gICAgY2FuY2VsVGFzay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwoZSk9PntcbiAgICAgICAgaWYgKGlzRWRpdFRhc2spe1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrXCIrY3VycmVudFRhc2tJZCkuY2hpbGROb2Rlc1syXS5zdHlsZS52aXNpYmlsaXR5PVwidmlzaWJsZVwiXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2tcIitjdXJyZW50VGFza0lkKS5jaGlsZE5vZGVzWzNdLnN0eWxlLnZpc2liaWxpdHk9XCJ2aXNpYmxlXCJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFza1wiK2N1cnJlbnRUYXNrSWQpLmNoaWxkTm9kZXNbNF0uc3R5bGUudmlzaWJpbGl0eT1cInZpc2libGVcIlxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgaGlkZUZvcm0oXCIjdGFzay1mb3JtLWNvbnRhaW5lclwiKVxuICAgICAgICByZXNldEZvcm0oZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLWZvcm1cIikpXG4gICAgICAgIHNob3dCdXR0b24oYWRkVGFzaylcbiAgICB9KVxuXG4gICAgXG4gICAgdGFza0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLChlKT0+e1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgaWYgKGlzRWRpdFRhc2sgPT09IGZhbHNlKXtcbiAgICAgICAgICAgIGFkZE5ld1Rhc2soKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGVkaXRUYXNrKClcbiAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgcmVzZXRGb3JtKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1mb3JtXCIpKVxuICAgICAgICBzaG93QnV0dG9uKGFkZFRhc2spXG4gICAgfSlcblxuXG4gICAgXG59XG5cbmNvbnN0IGNyZWF0ZVRhc2sgPSBmdW5jdGlvbih0aXRsZSxkZXRhaWwsZGF0ZSxjb21wbGV0ZWQpe1xuICAgIHJldHVybiB7dGl0bGUsZGV0YWlsLGRhdGUsY29tcGxldGVkfVxufVxuXG5jb25zdCBhZGROZXdUYXNrID0gZnVuY3Rpb24oKXtcbiAgICBjb25zdCB0YXNrVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stdGl0bGVcIikudmFsdWVcbiAgICBjb25zdCB0YXNrRGV0YWlsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLWRldGFpbHNcIikudmFsdWVcbiAgICBjb25zdCB0YXNrRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1kYXRlXCIpLnZhbHVlXG4gICAgY29uc3QgbmV3VGFzayA9ICBjcmVhdGVUYXNrKHRhc2tUaXRsZSx0YXNrRGV0YWlsLHRhc2tEYXRlLGZhbHNlKVxuICAgIHByb2plY3RMaXN0W2N1cnJlbnRQcm9qZWN0SWRdLnRhc2tMaXN0LnB1c2gobmV3VGFzaylcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RMaXN0XCIsSlNPTi5zdHJpbmdpZnkocHJvamVjdExpc3QpKVxuICAgIGRpc3BsYXlUYXNrKGN1cnJlbnRQcm9qZWN0SWQpXG4gICAgXG59XG5cbmNvbnN0IGRlbGV0ZVRhc2sgPSBmdW5jdGlvbih0YXNrSWQpe1xuICAgIHByb2plY3RMaXN0W2N1cnJlbnRQcm9qZWN0SWRdLnRhc2tMaXN0LnNwbGljZSh0YXNrSWQsMSlcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RMaXN0XCIsSlNPTi5zdHJpbmdpZnkocHJvamVjdExpc3QpKVxuICAgIGRpc3BsYXlUYXNrKGN1cnJlbnRQcm9qZWN0SWQpXG59XG5cbmNvbnN0IGVkaXRUYXNrID0gZnVuY3Rpb24oKXtcbiAgICBjb25zdCBlZGl0ZWRUYXNrVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stdGl0bGVcIikudmFsdWVcbiAgICBjb25zdCBlZGl0ZWRUYXNrRGV0YWlsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLWRldGFpbHNcIikudmFsdWVcbiAgICBjb25zdCBlZGl0ZWRUYXNrRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1kYXRlXCIpLnZhbHVlXG4gICAgcHJvamVjdExpc3RbY3VycmVudFByb2plY3RJZF0udGFza0xpc3RbY3VycmVudFRhc2tJZF0udGl0bGUgPSBlZGl0ZWRUYXNrVGl0bGVcbiAgICBwcm9qZWN0TGlzdFtjdXJyZW50UHJvamVjdElkXS50YXNrTGlzdFtjdXJyZW50VGFza0lkXS5kZXRhaWwgPSBlZGl0ZWRUYXNrRGV0YWlsXG4gICAgcHJvamVjdExpc3RbY3VycmVudFByb2plY3RJZF0udGFza0xpc3RbY3VycmVudFRhc2tJZF0uZGF0ZSA9IGVkaXRlZFRhc2tEYXRlXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0TGlzdFwiLEpTT04uc3RyaW5naWZ5KHByb2plY3RMaXN0KSlcbiAgICBkaXNwbGF5VGFzayhjdXJyZW50UHJvamVjdElkKVxufVxuXG5leHBvcnQge2NyZWF0ZVRhc2tMaXN0ZW5lciwgZGVsZXRlVGFzaywgZWRpdFRhc2t9IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgIXNjcmlwdFVybCkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImltcG9ydCB7IHByb2plY3RMaXN0LGNyZWF0ZVByb2plY3RMaXN0ZW5lciB9IGZyb20gXCIuL3Byb2plY3RcIjtcbmltcG9ydCB7IGNyZWF0ZVRhc2tMaXN0ZW5lciB9IGZyb20gXCIuL3Rhc2tcIjtcbmltcG9ydCB7IGRpc3BsYXlQcm9qZWN0IH0gZnJvbSBcIi4vZG9tXCI7XG5cbmNyZWF0ZVByb2plY3RMaXN0ZW5lcigpXG5jcmVhdGVUYXNrTGlzdGVuZXIoKVxuZGlzcGxheVByb2plY3QoKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==