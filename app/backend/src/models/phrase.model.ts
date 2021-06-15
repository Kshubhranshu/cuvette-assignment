import { Model } from 'objection';

export default class PhraseModel extends Model {
    static get tableName() {
        return 'phrases';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                phrase: { type: 'text', minLength: 1, maxLength: 1000 }
            }
        };
    };
}