const Joi = require("joi");
const AsyncHandler = require("express-async-handler");

function validateSchema(schema, property=`body`) {
    return AsyncHandler((req, res, next)=>{
        const {error, value } = schema.validate(
            {...req[property]},
            {
                abortEarly: false,
            }
        );

        if(process.env.NODE_ENV === "development")
            console.log(error, value);

        if(error) {
            const errors = {};
            error.details.forEach(detail => {
                errors[detail.context.key] = detail.message;
            });
        

        if(process.env.NODE_ENV === "development")
            console.log(errors);
        
        return res.status(422).json({status:"fail", error: errors})
        }
        next();
    });
}

module.exports = { validateSchema };

const JoiMessages = {
    "string.base": `should be a type of 'text'`,
    "string.hex": `should be a type of mongodb 'ObjectId'`,
    "boolean.base": `should be a type of 'boolean'`,
    "any.empty": `cannot be an empty field`,
    "any.required": `is a required field`,
    "any.unique": `must be unique`,
  };

  const customJoi = Joi.defaults((schema) =>
  schema.options({
    messages: JoiMessages,
  })
);

customJoi.objectId = () => Joi.string().hex().length(24);

module.exports = customJoi;
module.exports.validateSchema = validateSchema;