import * as Joi from '@hapi/joi';

export default {
    writePhrase: {
        payload: {
            phrase: Joi.string().required()
        }
    },

    deletePhrase: {
        params: {
            line_number: Joi.number().integer().min(1).required()
        }
    }
}