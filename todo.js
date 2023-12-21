// MODEL SECTION
let todos;
const savedTodos = JSON.parse(localStorage.getItem("todos"));

if (Array.isArray(savedTodos)) {
  todos = savedTodos;
} else {
  todos = [{
    title: "Get groceries",
    dueDate: "2021-10-04",
    id: "id1"
  },{
    title: "Wash car",
    dueDate: "2021-02-03",
    id: "id2"
  },{
    title: "Make dinner",
    dueDate: "2021-03-04",
    id: "id3"
  }];
}

render();

function createTodo(title, dueDate) {
  const id = "" + new Date().getTime();

  todos.push({ 
    title: title,
    dueDate: dueDate,
    id: id
  });
  saveTodos();
}

function removeTodo(idToDelete) {
  todos = todos.filter(function(todo) {
    if (todo.id === idToDelete) {
      return false;
    } else {
      return true;
    } 
  });

  saveTodos();
}

function saveTodos(){
  localStorage.setItem("todos", JSON.stringify(todos));
}  

// CONTROLLER SECTION
function addTodo(){
  const textbox = document.getElementById("todo-title");
  const title = textbox.value;
  const datePicker = document.getElementById("date-picker");
  const dueDate = datePicker.value;

  createTodo(title, dueDate);
  render();
}

function deleteTodo(event) {
  const deleteButton = event.target;
  const idToDelete = deleteButton.id;

  removeTodo(idToDelete);
  render();
}

// VIEW SECTION
function render(){ 
  document.getElementById("todo-list").innerHTML = "";

  todos.forEach(function (todo){
    let element = document.createElement("div");
    const deleteButton = document.createElement("button");
    const todoList = document.getElementById("todo-list");

    element.innerText = todo.title + ' ' + todo.dueDate;
    deleteButton.innerText = "Delete"; 
    deleteButton.onclick = deleteTodo; 
    deleteButton.id = todo.id; 

    element.appendChild(deleteButton); 
    todoList.appendChild(element);
  });
}