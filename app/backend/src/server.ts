require('dotenv').config(); 
import * as Hapi from '@hapi/hapi';
import Logger from './helpers/logger';
import Router from './routes/index';

export default class Server {
    private static instance: Hapi.Server;

    public static async start() {
        try {
            Server.instance = new Hapi.Server({
                port: process.env.PORT,
                host: process.env.HOST,
                routes: {
                    cors: { credentials: true }
                }
            });

            Server.instance.validator(require('@hapi/joi'));

            await Router.loadRoutes(Server.instance);
            await Server.instance.start();

            Logger.info((new Date).toUTCString() + ` Server - Up and running at http://${process.env.HOST}:${process.env.PORT}`);
        } catch (error) {
            Logger.error('Error at start - ', error);
        }
        return Server.instance.start();
    }

    public static stop(): Promise<Error | void> {
        Logger.info('Server - Stopping execution');
        return Server.instance.stop();
    }
}
