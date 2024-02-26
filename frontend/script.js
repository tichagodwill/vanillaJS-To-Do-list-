let addBtn = document.querySelector(".add-btn");
let editBtn = document.querySelector(".edit-btn");
let inputTodo = document.querySelector(".input-field");
let todoList = document.querySelector(".task-list");

arr = [];
url = "http://localhost:3000/todos";

async function getTodos() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

async function post_todos() {
  try {
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: inputTodo.value,
        completed: false,
      }),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

async function del_Todo(todoElem) {
  try {
    const del_url = url + "/" + todoElem.id;
    console.log(del_url);
    const resp = await fetch(del_url, {
      method: "DELETE",
    });
    const data = await resp.json();
    return data;
  } catch (err) {
    return err;
  }
}

function display_Todo(todoArr) {
  const container = document.querySelector(".todo-container");
  if (container) {
    container.remove();
  }
  let todo = document.createElement("div");
  todo.classList.add("todo-container");
  //children
  let todoList = document.createElement("ul");
  todoList.classList.add("task-list");
  todoArr.forEach((todoElem) => {
    console.log(todoElem);
    //parents

    // grand childrens
    let todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");
    let paragraph = document.createElement("p");
    paragraph.textContent = todoElem.title;
    todoItem.appendChild(paragraph);
    let fontAwesomeSpan = document.createElement("span");
    fontAwesomeSpan.classList.add("font-icons");
    todoItem.appendChild(fontAwesomeSpan);

    // creating the edit button
    let editBtn = document.createElement("i");
    editBtn.className = "fas fa-edit";
    fontAwesomeSpan.appendChild(editBtn);
    editBtn.addEventListener("click", function () {
      e.preventDefault();
    });
    //  delete button
    let deleteBtn = document.createElement("i");
    deleteBtn.className = "fas fa-trash";
    fontAwesomeSpan.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", async function () {
      todoItem.remove();
      await del_Todo(todoElem);
    });

    //appending children to parents

    todoList.appendChild(todoItem);
    todo.appendChild(todoList);
    document.body.appendChild(todo);
  });
}
//adding event listener to the add button
addBtn.addEventListener("click", async function () {
  if (inputTodo.value != "") {
    const data = await post_todos();
    console.log(data);
    display_Todo(data.data);
    inputTodo.value = "";
  }
});

getTodos()
  .then((dataArr) => {
    arr = dataArr;
    console.log(arr);
    display_Todo(arr);
  })
  .catch((err) => console.log(err));
