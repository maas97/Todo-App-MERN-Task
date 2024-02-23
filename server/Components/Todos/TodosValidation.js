const customJoi = require("../../Utils/Validation");
const {validateSchema} = require("../../Utils/Validation");


const getTodoId = customJoi.object({
    id: customJoi.objectId().required()
})

const addTodo = customJoi.object.apply({
    todoTitle: customJoi.string().required(),
    todoDetails: customJoi.string().required(),
    isCompleted: customJoi.boolean().optional(),
})

const updateTodo = customJoi.object({
    todoTitle: customJoi.string().optional(),
    todoDetails: customJoi.string().optional(),
    isCompleted: customJoi.boolean().optional(),
})


module.exports.validateTodoId = validateSchema(getTodoId, "params");
module.exports.validateAddTodo = validateSchema(addTodo);
module.exports.validateUpdateTodo = validateSchema(updateTodo);
