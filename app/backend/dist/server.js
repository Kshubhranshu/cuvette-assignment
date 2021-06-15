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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Hapi = __importStar(require("@hapi/hapi"));
const DotEnv = __importStar(require("dotenv"));
const logger_1 = __importDefault(require("./helpers/logger"));
const index_1 = __importDefault(require("./routes/index"));
class Server {
    static start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                DotEnv.config();
                Server.instance = new Hapi.Server({
                    port: process.env.PORT,
                    host: process.env.HOST,
                    routes: {
                        cors: { credentials: true }
                    }
                });
                Server.instance.validator(require('@hapi/joi'));
                yield index_1.default.loadRoutes(Server.instance);
                yield Server.instance.start();
                logger_1.default.info((new Date).toUTCString() + ` Server - Up and running at http://${process.env.HOST}:${process.env.PORT}`);
            }
            catch (error) {
                logger_1.default.error('Error at start - ', error);
            }
            return Server.instance.start();
        });
    }
    static stop() {
        logger_1.default.info('Server - Stopping execution');
        return Server.instance.stop();
    }
}
exports.default = Server;
