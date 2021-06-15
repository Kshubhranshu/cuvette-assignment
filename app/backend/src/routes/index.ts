import * as Hapi from '@hapi/hapi';
import FileParseRoutes from './phrase.routes';
import Logger from '../helpers/logger';

export default class Router {
    public static async loadRoutes(server: Hapi.Server): Promise<void> {
        try {
            await new FileParseRoutes().register(server);
        } catch (error) {
            Logger.error('Error at loadRoutes - ', error);
        }
    }
}