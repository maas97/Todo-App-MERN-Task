const AsyncHandler = require("express-async-handler");
const Todo = require('./Todo')
const ApiError = require("../../Utils/ApiError");
const Factory = require("../../Utils/Factory");

// exports.getAllTodos = AsyncHandler(async (req, res, next)=>{

//     const todos = await Todo.find();

//     res.status(200).json({
//         status: "success",
//         data: todos
//     });
// });

// exports.getTodo = AsyncHandler(async (req, res, next)=>{

//     const todo = await Todo.findOne({_id: req.params.id});
//     if(!todo){
//         return next(new ApiError(
//             "Todo not found", 404
//         ))
//     }

//     res.status(200).json(
//         {
//             status: "success",
//             data: todo
//         }
//     )
// });


// exports.addTodo = AsyncHandler(async (req, res, next)=>{

//     let todo = await Todo.create({  
//                                     todoTitle: req.body.todoTitle,
//                                     todoDetails: req.body.todoDetails,
//                                     isCompleted: req.body.isCompleted,
//                                 });
    
//     await todo.save({validateBeforeSave: false});

//     res.status(201).json({
//         status: "Success",
//         data: todo
//     })
// })


// exports.updateTodo = AsyncHandler(async (req, res, next)=>{
       
//         let todo = await Todo.findOneAndUpdate({_id: req.params.id}, 
//                                                 {
//                                                     todoTitle: req.body.todoTitle,
//                                                     todoDetails: req.body.todoDetails,
//                                                     isCompleted: req.body.isCompleted,
//                                                 },
//                                                 {new: true}
//                                             )
//         if(!todo){
//             return next(new ApiError(
//             "This Todo not found", 404
//             ))
//         }

//         res.status(200).json({
//             status: "Success",
//             data: { todo }
//         });

// });

// exports.deleteTodo = AsyncHandler(async (req, res, next)=>{

//         const todo =await Todo.findOneAndDelete({_id: req.params.id});
//         if(!todo){
//             return next(new ApiError(
//                 "Todo not Found", 404
//             ))
//         }

//         res.status(400).json({
//             status: "Todo Deleted Successfully",
//             data: null
//         })
// })


exports.getAllTodos = Factory.getAll(Todo);

exports.getTodo = Factory.getOne(Todo);

exports.addTodo = Factory.createOne(Todo);

exports.updateTodo = Factory.updateOne(Todo);

exports.deleteTodo = Factory.deleteOne(Todo);