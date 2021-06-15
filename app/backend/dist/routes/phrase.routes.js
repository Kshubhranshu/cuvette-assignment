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
require('dotenv').config();
const phrase_controller_1 = __importDefault(require("../controllers/phrase.controller"));
const validate_1 = __importDefault(require("../helpers/validate"));
class FileParseRoutes {
    register(server) {
        return __awaiter(this, void 0, void 0, function* () {
            const baseUrl = process.env.BASE_URL || '/api/v1';
            const controller = new phrase_controller_1.default();
            return server.route([
                {
                    method: 'POST',
                    path: `${baseUrl}/write-phrase`,
                    options: {
                        handler: controller.writePhrase,
                        validate: validate_1.default.writePhrase,
                        description: 'Method that writes phrase into file.',
                        auth: false,
                    },
                },
                {
                    method: 'GET',
                    path: `${baseUrl}/get-all-phrase`,
                    options: {
                        handler: controller.readAllPhrase,
                        description: 'Method that reads phrase from file.',
                        auth: false,
                    },
                },
                {
                    method: 'DELETE',
                    path: `${baseUrl}/delete-phrase/{line_number}`,
                    options: {
                        handler: controller.deletePhraseById,
                        validate: validate_1.default.deletePhrase,
                        description: 'Method that delete particular phrase by line number.',
                        auth: false,
                    },
                }
            ]);
        });
    }
}
exports.default = FileParseRoutes;
