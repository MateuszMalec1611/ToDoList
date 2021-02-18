'user strict';
let $todoInput; // place where user types the content
let $alertInfo; // info about lack of tasks / necessary to add
let $addBtn; // button add - add new elements to the list
let $ulList; // our list of tasks, tags <ul></ul>
let $newTask; // new li, new task

let $popup; // downloaded popup
let $popupInfo; // alert in popup, if will be empty
let $editedTodo; // edited Todo
let $popupInput; // text typed into the input in popup
let $addPopupBtn; // buutton 'zatwierdz' in popup
let $closeTodoBtn; /// close button
let $idNumber = 0;
let $allTasks;


const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
}
// download our elements
const prepareDOMElements = () => {
    $todoInput = document.querySelector('.todoInput');
    $alertInfo = document.querySelector('.alertInfo');
    $addBtn = document.querySelector('.addBtn');
    $ulList = document.querySelector('.todoList ul');
    $popup = document.querySelector('.popup');
    $popupInfo = document.querySelector('.popupInfo');
    $popupInput = document.querySelector('.popupInput');
    $addPopupBtn = document.querySelector('.accept');
    $closeTodoBtn = document.querySelector('.cancel');
    $allTasks = $ulList.getElementsByTagName('li');
}
// add listener
const prepareDOMEvents = () => {
    $addBtn.addEventListener('click', addNewTask);
    $ulList.addEventListener('click', checkClick)
    $closeTodoBtn.addEventListener('click', closePopup);
    $addPopupBtn.addEventListener('click', changeTodo);
    $todoInput.addEventListener('keyup', enterCheck);
}

const addNewTask = () => {
    if($todoInput.value !== '') {
        $idNumber++;
        $newTask = document.createElement('li');
        $newTask.innerText = $todoInput.value;
        $newTask.setAttribute('id', `todo-${$idNumber}`);
        $ulList.appendChild($newTask);
        $todoInput.value = '';
        $alertInfo.innerText = '';
        createToolsArea();

    }else {
        $alertInfo.innerText = 'Wpisz treść zadania !';
    }
}

const enterCheck = (key) => {
    if(key.code === 'Enter') {
        addNewTask();
    }
}

const createToolsArea = () => {
    const toolsPanel = document.createElement('div');
    toolsPanel.classList.add('tools');
    $newTask.appendChild(toolsPanel);

    const complete = document.createElement('button');
    complete.classList.add('complete');
    complete.innerHTML = '<i class="fas fa-check"></i>';
    toolsPanel.appendChild(complete);

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.innerText = 'EDIT';
    toolsPanel.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
    toolsPanel.appendChild(deleteBtn);   
}

const checkClick = e => {
    if(e.target.closest('button').classList.contains('complete')){
        
        e.target.closest('li').classList.toggle('completed');
        e.target.closest('button').classList.toggle('completed');
    } else if (e.target.closest('button').className === 'edit') {
        editTask(e);
    } else if (e.target.closest('button').className === 'delete') {
        deleteTask(e);
    }
}

const editTask = (e) => {
    const oldTodo = e.target.closest('li').id;
    $editedTodo = document.getElementById(oldTodo);
    $popupInput.value = $editedTodo.firstChild.textContent;

    $popup.style.display = 'flex';
}

const changeTodo = () => {
    if($popupInput.value !== '') {
        $editedTodo.firstChild.textContent = $popupInput.value;
        $popup.style.display = 'none';
        $popupInfo.innerText = '';
    }else {
        $popupInfo.innerText = 'Musisz podać jakąś treść!';
    }
}

const closePopup = () => {
    $popup.style.display = 'none';
    $popupInfo.innerText = '';
}

const deleteTask = (e) => {
    const deleteTodo = e.target.closest('li');
    deleteTodo.remove();

    if($allTasks === 0) {
        $alertInfo.innerText = 'Brak zadań na liście';
    }
}

document.addEventListener('DOMContentLoaded', main);