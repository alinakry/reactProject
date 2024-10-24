import Joi from "joi"

export const CreateCardSchema = Joi.object({
    title: Joi.string().min(2).max(256).required().messages({ 'string.empty': 'This line is not allowed to be empty' }),
    subtitle: Joi.string().min(2).max(256).required().messages({ 'string.empty': 'This line is not allowed to be empty' }),
    description: Joi.string().min(2).max(1024).required().messages({ 'string.empty': 'This line is not allowed to be empty' }),
    phone: Joi.string()
        .ruleset.regex(/0[0-9]{1,2}-?\s?[0-9]{3}\s?[0-9]{4}/)
        .rule({ message: 'card "phone" mast be a valid phone number' })
        .required()
        .messages({ 'string.empty': 'This line is not allowed to be empty' }),
    email: Joi.string()
        .ruleset.pattern(
            /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/
        )
        .rule({ message: 'card "mail" mast be a valid mail' })
        .messages({ 'string.empty': 'This line is not allowed to be empty' })
        .required(),

    web: Joi.string()
        .ruleset.regex(/(http?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/)
        .rule({ message: 'card "web" mast be a valid url' })
        .messages({ 'string.empty': 'This line is not allowed to be empty' })
        .allow(""),

    image: Joi.object()
        .keys({
            url: Joi.string()
                .ruleset.regex(/(http?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/)
                .rule({ message: 'card.image "url" mast be a valid url' })
                .messages({ 'string.empty': 'This line is not allowed to be empty' })
                .allow(""),
            alt: Joi.string().min(2).max(256).allow(""),
        })
        .required(),
    address: Joi.object()
        .keys({
            state: Joi.string().allow(""),
            country: Joi.string().min(2).max(256).required().messages({ 'string.empty': 'This line is not allowed to be empty' }),
            city: Joi.string().min(2).max(256).required().messages({ 'string.empty': 'This line is not allowed to be empty' }),
            street: Joi.string().min(2).max(256).required().messages({ 'string.empty': 'This line is not allowed to be empty' }),
            houseNumber: Joi.number().required().messages({ 'string.empty': 'This line is not allowed to be empty', 'number.base': 'House Number must be a number' }),
            zip: Joi.number().required().messages({ 'string.empty': 'This line is not allowed to be empty', 'number.base': 'ZIP must be a number' })
        })
        .required(),
    bizNumber: Joi.number().allow(""),
    user_id: Joi.string().allow(""),
});