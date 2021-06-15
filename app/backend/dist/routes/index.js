"use strict";
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
const phrase_routes_1 = __importDefault(require("./phrase.routes"));
const logger_1 = __importDefault(require("../helpers/logger"));
class Router {
    static loadRoutes(server) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield new phrase_routes_1.default().register(server);
            }
            catch (error) {
                logger_1.default.error('Error at loadRoutes - ', error);
            }
        });
    }
}
exports.default = Router;