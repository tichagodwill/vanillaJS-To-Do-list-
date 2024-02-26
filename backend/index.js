const express = require("express");
const uuid = require("uuid");
const app = express();
const cors = require("cors");





app.use(cors());
const port = 3000;
app.use(express.json());

todos = [
  {
    id: 1,
    title: "First todo",
    completed: false,
  },

  {
    id: 2,
    title: "Second todo",
    completed: true,
  },

  {
    id: 3,
    title: "Third todo",
    completed: false,
  },
];


app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.get("/todos/:id", (req, res) => {
    let todo = todos.filter((todo)=>todo.id == req.params.id)
  res.json({ message: "here is the todo with id",  data: todo});
});

//GET, POST, PUT, DELETE

//POST a todo

app.post("/todos", (req, res) => {
    todos.push({id : uuid.v4(), ...req.body})
  res.json({ message: "Todo created", data: todos });
});

//Edit a todo
app.put("/todos/:id", (req, res) => {

    let todo =  todos.find((todo)=>todo.id == req.params.id);
    if(todo){
        todo.title = req.body.title;
        todo.completed = req.body.completed;
        res.json({ message: "Todo updated successfully", data: todos});
    }else{
        res.json({ message: "Todo not found" });
    }
  res.json({ message: "Todo edited" });
});

//DELET a todo
app.delete("/todos/:id", (req, res) => {
    let index =  todos.findIndex((todo)=>todo.id == req.params.id);
    if (index > -1) {
        todos.splice(index, 1);
      }
  res.json({ message: "Todo deleted" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
