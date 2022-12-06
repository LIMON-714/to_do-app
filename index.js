// finding
const container = document.querySelector(".conatiner");
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#input-todo");
const addButton = document.querySelector("#todo-btn");
const todoLists = document.querySelector("#list");
const messageEliment = document.querySelector("#message");


// showMessage
const showMessage = (text,status) => {
    messageEliment.textContent= text;
    messageEliment.classList.add(`bg-${status}`)
    setTimeout(() =>{
        messageEliment.textContent= "";
        messageEliment.classList.remove(`bg-${status}`);
    },1000);
};



//createTodo

const createTodo = (todoId,todoValue) => {
    const todoElement =document.createElement("li");
    todoElement.id= todoId;
    todoElement.classList.add("list-style")
    todoElement.innerHTML = `
    <span>${todoValue}</span>
    <span><button class= "btn1 " id ="delete-btn"> <i class="fa fa-trash"></i></button></span>
    `;
    todoLists.appendChild(todoElement);
    const deleteButton = todoElement.querySelector('#delete-btn');
    deleteButton.addEventListener('click',deleteTodo);
};


// deleteTodo
const deleteTodo = (event) => {
    const selectedTodo = event.target.parentElement.parentElement.parentElement;
  
    todoLists.removeChild(selectedTodo);
    showMessage("todo is deleted !...", "deletM");
  
    let todos = getTodosFromLocalStorage();
    todos = todos.filter((todo) => todo.todoId !== selectedTodo.id);
    localStorage.setItem("mytodos", JSON.stringify(todos));
  };

// getTodosFromLocalStorage
const getTodosFromLocalStorage = () => {
    return localStorage.getItem("mytodos")
      ? JSON.parse(localStorage.getItem("mytodos"))
      : [];
  };


// addlistener
todoForm.addEventListener("submit" , (event)=>{
    event.preventDefault();
    const todoValue = todoInput.value;
    // console.log(todoInput.value);

    const todoId = Date.now().toString();  
    //console.log(todoId);
    
    createTodo (todoId, todoValue);
    showMessage("To do is saved here !...","message");

    
    // add todo to localStorage
  const todos = getTodosFromLocalStorage();
  todos.push({ todoId, todoValue });
  localStorage.setItem("mytodos", JSON.stringify(todos));

  todoInput.value = "";
});

// loadTodos
const loadTodos = () => {
  const todos = getTodosFromLocalStorage();
  todos.map((todo) => createTodo(todo.todoId, todo.todoValue));
};
window.addEventListener("DOMContentLoaded", loadTodos);
