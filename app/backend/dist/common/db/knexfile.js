"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DotEnv = __importStar(require("dotenv"));
const objection_1 = __importDefault(require("objection"));
DotEnv.config();
/* in production env all the credentials will intialized from .env  */
exports.default = {
    development: Object.assign({ client: 'postgresql', connection: {
            database: 'd2c694j63k4ib5',
            user: 'cnhlpdnkppjmti',
            password: 'b329b2151bc5166b39ac282000aa1634f6a3bfaab4f4d3ca2f8d3cc1a60785cc',
            port: 5432,
            host: 'ec2-52-45-179-101.compute-1.amazonaws.com',
            ssl: {
                rejectUnauthorized: false
            }
        }, pool: {
            min: 2,
            max: 10
        }, migrations: {
            tableName: 'knex_migrations'
        } }, objection_1.default)
};
