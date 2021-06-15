import * as Hapi from '@hapi/hapi';
import FileParserController from '../controllers/phrase.controller';
import validate from '../helpers/validate';
import * as DotEnv from 'dotenv';
DotEnv.config();

export default class FileParseRoutes {
    public async register(server: Hapi.Server): Promise<any> {
        const baseUrl = process.env.BASE_URL || '/api/v1';
        const controller = new FileParserController();

        return server.route([
            {
                method: 'POST',
                path: `${baseUrl}/write-phrase`,
                options: {
                    handler: controller.writePhrase,
                    validate: validate.writePhrase,
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
                    validate: validate.deletePhrase,
                    description: 'Method that delete particular phrase by line number.',
                    auth: false,
                },
            }
        ])
    }
}