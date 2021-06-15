import { number } from '@hapi/joi';
import { raw } from 'objection';
import db from '../common/db/dbconfig';
import PhraseModel from '../models/phrase.model';
db.setConnection();

class PhraseDao {
    async getAllPhrase() {
        const dbResult = await PhraseModel.query()
        return dbResult;
    }

    async insertPhrase(id: number, phrase: string) {
        const dbReq: any = { id, phrase };
        const dbResult = await PhraseModel.query()
            .insert(dbReq);
    }

    async deletePhraseById(id: number) {
        const dbResult = await PhraseModel.query()
            .deleteById(id);
        if (dbResult > 0) {
            await this.updateAllPhraseId(id);
        }
        return dbResult;
    }

    async updateAllPhraseId(id: number) {
        const dbReq: any = { id: raw('id - 1') };
        const dbResult = await PhraseModel.query()
            .patch(dbReq)
            .where('id', '>', id);
    }
}

export default new PhraseDao;