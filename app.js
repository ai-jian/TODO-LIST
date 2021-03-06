//selectors
const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list")
const todoFilter = document.querySelector("#todo-filter")


//event listeners
document.addEventListener("DOMContentLoaded", getTodos)
todoButton.addEventListener("click", (e) => {
    //prevent form form submitting
    e.preventDefault();
    //prevent empty submit
    todoInput.value ? addTodo() :
        ''
})
todoList.addEventListener("click", checkOrDelete)
todoFilter.addEventListener("change", filterTodo)



//functions
function addTodo(e) {
    //list div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //add todo to local storage
    saveToLocal(todoInput.value);
    //create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //create checkbox btn
    const completedBtn = document.createElement("button");
    completedBtn.innerHTML = `<i class="fas fa-check-circle"></i>`;
    completedBtn.classList.add('completedbtn');
    todoDiv.appendChild(completedBtn);
    //check trash btn
    const trashBtn = document.createElement("button");
    trashBtn.innerHTML = `<i class="fas fa-trash"></i>`;
    trashBtn.classList.add('trashbtn');
    todoDiv.appendChild(trashBtn);
    //append to todo-list
    todoList.appendChild(todoDiv);
    //clear todo input value
    todoInput.value = '';
}

function checkOrDelete(e) {
    console.log(e.target)
    const clickedTarget = e.target
    const todoItem = clickedTarget.parentElement
    // compele todo item
    if (clickedTarget.classList[0] === 'completedbtn') {
        todoItem.classList.toggle('completed')
        console.log('completed')
    }
    // delete todo item
    if (clickedTarget.classList[0] === 'trashbtn') {
        todoItem.classList.add('fall')
        removeLocalTodo(todoItem);
        todoItem.addEventListener('transitionend', () => todoItem.remove())
        console.log('removed')
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes
    todos.forEach((todo) => {
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                todo.classList.contains('completed') ?
                    todo.style.display = 'flex' :
                    todo.style.display = 'none'
                break;
            case "uncompleted":
                !todo.classList.contains('completed') ?
                    todo.style.display = 'flex' :
                    todo.style.display = 'none'
                break;
        }
    })
}



let todos;
//check if local storage is empty
localStorage.getItem("todos") === null ?
    todos = [] :
    todos = JSON.parse(localStorage.getItem("todos"))

function saveToLocal(todo) {
    //save todo to local storage
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos))
}

function getTodos() {
    todos.forEach((todo) => {
        //list div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //create li
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //create checkbox btn
        const completedBtn = document.createElement("button");
        completedBtn.innerHTML = `<i class="fas fa-check-circle"></i>`;
        completedBtn.classList.add('completedbtn');
        todoDiv.appendChild(completedBtn);
        //check trash btn
        const trashBtn = document.createElement("button");
        trashBtn.innerHTML = `<i class="fas fa-trash"></i>`;
        trashBtn.classList.add('trashbtn');
        todoDiv.appendChild(trashBtn);
        //append to todo-list
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodo(todo) {
    todos.splice(todos.indexOf(todo.children[0].innerText), 1)
    localStorage.setItem("todos", JSON.stringify(todos))
}