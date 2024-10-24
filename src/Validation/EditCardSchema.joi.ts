import Joi from 'joi';


const EditCardSchema = Joi.object({
    title: Joi.string().min(2).max(256).required(),
    subtitle: Joi.string().min(2).max(256).required(),
    description: Joi.string().min(2).max(1024).required(),


    phone: Joi.string()
        .pattern(/^(\+972|0)([23489]|[57]\d)\d{7}$/)
        .required()
        .messages({
            'string.pattern.base': `"phone" must be a standard Israeli phone number`
        }),


    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            'string.email': `"email" must be a valid email address`
        }),

    web: Joi.string()
        .pattern(/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/)
        .min(14)
        .optional()
        .messages({
            'string.pattern.base': `"web" must be a valid URL`
        }),


    image: Joi.object({
        url: Joi.string()
            .pattern(/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/)
            .min(14)
            .required()
            .messages({
                'string.pattern.base': `"image.url" must be a valid URL`
            }),
        alt: Joi.string().min(2).max(256).optional(),
    }).required(),

    address: Joi.object({
        state: Joi.string().optional(),
        country: Joi.string().required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
        houseNumber: Joi.number().min(1).required(),
        zip: Joi.number().optional(),
    }).required(),
});

export default EditCardSchema;
