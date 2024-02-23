const express = require("express");
// const bodyParser = require('body-parser')

const { getAllTodos,
        getTodo,
        addTodo,
        updateTodo,
        deleteTodo 
      }
         = require("./TodoController")

const { 
    validateTodoId,
    validateAddTodo,
    validateUpdateTodo
} = require("./TodosValidation")

const router = express.Router();

router.get("/", getAllTodos);

router.post("/addTodo",  validateAddTodo, addTodo);

router.route('/:id')
      .all(validateTodoId)
      .get(getTodo)
      .put(validateUpdateTodo, updateTodo)
      .delete(validateTodoId, deleteTodo);

module.exports = router;





