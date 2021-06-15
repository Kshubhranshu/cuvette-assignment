"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const phrase_service_1 = __importDefault(require("../services/phrase.service"));
class PhraseController {
    readAllPhrase(request, response) {
        const phraseObj = new phrase_service_1.default();
        return phraseObj.getAllPhrase(request, response);
    }
    writePhrase(request, response) {
        const phraseObj = new phrase_service_1.default();
        return phraseObj.writePhraseIntoFile(request, response);
    }
    deletePhraseById(request, response) {
        const phraseObj = new phrase_service_1.default();
        return phraseObj.deletePhraseById(request, response);
    }
}
exports.default = PhraseController;
