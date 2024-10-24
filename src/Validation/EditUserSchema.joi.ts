import Joi from 'joi';


const EditUserSchema = Joi.object({
    name: Joi.object({
        first: Joi.string().min(2).max(256).required(),
        middle: Joi.string().min(2).max(256).optional(),
        last: Joi.string().min(2).max(256).required(),
    }).required(),


    phone: Joi.string()
        .pattern(/^(\+972|0)([23489]|[57]\d)\d{7}$/)
        .required()
        .messages({
            'string.pattern.base': `"phone" must be a standard Israeli phone number`,
        }),


    image: Joi.object({
        url: Joi.string()
            .uri() //
            .min(14)
            .required()
            .messages({
                'string.uri': `"image.url" must be a valid URL`,
            }),
        alt: Joi.string().min(2).max(256).required(),
    }).required(),


    address: Joi.object({
        state: Joi.string().min(2).max(256).optional(),
        country: Joi.string().min(2).max(256).required(),
        city: Joi.string().min(2).max(256).required(),
        street: Joi.string().min(2).max(256).required(),
        houseNumber: Joi.number().min(2).required(),
        zip: Joi.number().min(2).required(),
    }).required(),
});

export default EditUserSchema;
