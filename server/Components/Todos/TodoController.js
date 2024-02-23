const Todo = require('./Todo')
const Factory = require("../../Utils/Factory");

// A thin controller for a healthy life

exports.getAllTodos = Factory.getAll(Todo);

exports.getTodo = Factory.getOne(Todo);

exports.addTodo = Factory.createOne(Todo);

exports.updateTodo = Factory.updateOne(Todo);

exports.deleteTodo = Factory.deleteOne(Todo);