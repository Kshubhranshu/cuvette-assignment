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
const dbconfig_1 = __importDefault(require("../common/db/dbconfig"));
const phrase_model_1 = __importDefault(require("../models/phrase.model"));
dbconfig_1.default.setConnection();
class PhraseDao {
    getAllPhrase() {
        return __awaiter(this, void 0, void 0, function* () {
            const dbResult = yield phrase_model_1.default.query();
            return dbResult;
        });
    }
    insertPhrase(id, phrase) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbReq = { id, phrase };
            const dbResult = yield phrase_model_1.default.query()
                .insert(dbReq);
        });
    }
    deletePhraseById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbResult = yield phrase_model_1.default.query()
                .deleteById(id);
            yield this.updateAllPhraseId(id);
            return dbResult;
        });
    }
    updateAllPhraseId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbReq = { id: id - 1 };
            const dbResult = yield phrase_model_1.default.query()
                .update(dbReq)
                .where('id', '>', id);
        });
    }
}
exports.default = new PhraseDao;
