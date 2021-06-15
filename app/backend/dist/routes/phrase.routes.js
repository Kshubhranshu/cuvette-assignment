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
const phrase_controller_1 = __importDefault(require("../controllers/phrase.controller"));
const validate_1 = __importDefault(require("../helpers/validate"));
const DotEnv = __importStar(require("dotenv"));
DotEnv.config();
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
