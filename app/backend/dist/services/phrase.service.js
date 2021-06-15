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
const logger_1 = __importDefault(require("../helpers/logger"));
const Boom = __importStar(require("@hapi/boom"));
const response_1 = __importDefault(require("../helpers/response"));
const fs_1 = __importDefault(require("fs"));
const phrase_dao_1 = __importDefault(require("../dao/phrase.dao"));
const filePath = 'storage.txt';
class PhraseService {
    getAllPhrase(request, toolkit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let resultPhrases = yield this.processFileLineByLine(filePath);
                resultPhrases = resultPhrases.filter(element => element.phrase);
                const dbData = yield phrase_dao_1.default.getAllPhrase();
                if (!resultPhrases) {
                    return toolkit.response(response_1.default(request, {
                        boom: Boom.notFound(),
                    }));
                }
                return toolkit.response(response_1.default(request, {
                    value: resultPhrases,
                }));
            }
            catch (error) {
                logger_1.default.error('Error at getAllPhrase - ', error);
                return toolkit.response(response_1.default(request, {
                    boom: Boom.badImplementation(error),
                }));
            }
        });
    }
    ;
    processFileLineByLine(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const promiseReadFile = yield fs_1.default.readFileSync(filePath, 'utf8');
            return promiseReadFile.split('\n')
                .map((element, index) => {
                return { id: index + 1, phrase: element };
            });
        });
    }
    writePhraseIntoFile(request, toolkit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reqPayload = request.payload;
                const phrase = reqPayload.phrase + '\n';
                yield fs_1.default.appendFileSync(filePath, phrase);
                const result = yield this.countFileLines(filePath);
                if (result) {
                    yield phrase_dao_1.default.insertPhrase(result, reqPayload.phrase);
                }
                return toolkit.response(response_1.default(request, {
                    value: { id: result },
                }));
            }
            catch (error) {
                logger_1.default.error('Error at writePhraseIntoFile - ', error);
                return toolkit.response(response_1.default(request, {
                    boom: Boom.badImplementation(error),
                }));
            }
        });
    }
    countFileLines(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const promiseReadFile = yield fs_1.default.readFileSync(filePath, 'utf8');
            let fileBuffer = promiseReadFile.split('\n');
            fileBuffer = fileBuffer.filter(element => element);
            return fileBuffer.length;
        });
    }
    deletePhraseById(request, toolkit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lineNumber = (request.params.line_number);
                const updatedLineNumber = lineNumber - 1;
                const promiseReadFile = yield fs_1.default.readFileSync(filePath, 'utf8');
                const originalPhrases = promiseReadFile.split('\n');
                if (updatedLineNumber > originalPhrases.length) {
                    return toolkit.response(response_1.default(request, {
                        value: { success: false },
                    }));
                }
                originalPhrases.splice(updatedLineNumber, 1);
                const updatedPhrases = originalPhrases.join('\n');
                yield fs_1.default.writeFileSync(filePath, updatedPhrases);
                const dbResult = yield phrase_dao_1.default.deletePhraseById(lineNumber);
                return toolkit.response(response_1.default(request, {
                    value: { success: true },
                }));
            }
            catch (error) {
                logger_1.default.error('Error at deletePhraseById - ', error);
                return toolkit.response(response_1.default(request, {
                    boom: Boom.badImplementation(error),
                }));
            }
        });
    }
}
exports.default = PhraseService;
