import Server from './server';
import Logger from './helpers/logger';

(async () => {
    await Server.start();
})();

// listen on SIGINT signal and gracefully stop the server
process.on('SIGINT', () => {
    Server.stop().then((error) => {
        Logger.info('Server stopped');
        process.exit(error ? 1 : 0);
    });
});