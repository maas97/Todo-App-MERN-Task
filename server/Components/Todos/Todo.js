const mongoose = require('mongoose');

const todoSchema = mongoose.Schema(
    {
        todoTitle: {
            type : String,
            required : [true,
                        "Todo Title is Required Please"           
                       ],
            unique: [true, "This Todo Title Already Exists"],
            trim: true   
        },
        todoDetails: {
            type: String,
            required: [true, "Todo Details is Required Please"],
            trim: true   
        },
        isCompleted: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true,
        toJson: {
            virtuals: true,
        },
        toObject: {
            virtuals: true
        }
    }
)

todoSchema.pre("update", function(next){
    this.updatedAt = Date.now();
    next();
})

todoSchema.methods = {
    toJson() {
        return {
            _id: this._id.toHexString(),
            todoTitle: this.todoTitle,
            todoDetails: this.todoDetails,
            isCompleted: this.isCompleted,
            id: this._id.toHexString()
        }
    },
}

todoSchema.statics = {
    async countTodos(){
        return await this.countDocuments();
    }
}

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;