import * as Hapi from '@hapi/hapi';
import PhraseService from '../services/phrase.service';

export default class PhraseController {

    public readAllPhrase(request: Hapi.Request, response: Hapi.ResponseToolkit) {
        const phraseObj = new PhraseService();
        return phraseObj.getAllPhrase(request, response);
    }

    public writePhrase(request: Hapi.Request, response: Hapi.ResponseToolkit) {
        const phraseObj = new PhraseService();
        return phraseObj.writePhraseIntoFile(request, response);
    }

    public deletePhraseById(request: Hapi.Request, response: Hapi.ResponseToolkit) {
        const phraseObj = new PhraseService();
        return phraseObj.deletePhraseById(request, response);
    }
}