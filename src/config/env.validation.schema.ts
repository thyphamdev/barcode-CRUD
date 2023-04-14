
import * as Joi from 'joi';

export const validationSchema = Joi.object({
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'staging', 'local')
        .default('local'),
    PORT: Joi.number().default(3000),
    ELASTICSEARCH_NODE: Joi.string().default('http://localhost:9200'),
    ELASTICSEARCH_USERNAME: Joi.string().default('elastic'),
    ELASTICSEARCH_PASSWORD: Joi.string().default('admin'),
})