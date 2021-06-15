"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("./knexfile"));
const logger_1 = __importDefault(require("../../helpers/logger"));
const objection_1 = require("objection");
class DatabaseConnection {
    setConnection() {
        try {
            const db = knex_1.default(knexfile_1.default.development);
            objection_1.Model.knex(db);
            return db;
        }
        catch (error) {
            logger_1.default.error('Error at setConnection - ', error);
        }
    }
}
exports.default = new DatabaseConnection();
