
import * as Joi from 'joi';

export const validationSchema = Joi.object({
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'staging', 'local')
        .default('local'),
    PORT: Joi.number().default(3000),
    DATABASE_USER: Joi.string().default("test"),
    DATABASE_PASSWORD: Joi.string().default("test")
})