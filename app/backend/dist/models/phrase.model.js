"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
class PhraseModel extends objection_1.Model {
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
    }
    ;
}
exports.default = PhraseModel;
