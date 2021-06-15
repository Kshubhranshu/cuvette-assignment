import knex from 'knex';
import knexfile from './knexfile';
import Logger from '../../helpers/logger';
import { Model } from 'objection';

class DatabaseConnection {
    public setConnection() {
        try {
            const db = knex(knexfile.development);
            Model.knex(db);
            return db;
        } catch (error) {
            Logger.error('Error at setConnection - ', error);
        }
    }
}

export default new DatabaseConnection();


