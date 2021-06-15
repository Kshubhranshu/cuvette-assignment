import * as Hapi from '@hapi/hapi';
import Logger from '../helpers/logger';
import * as Boom from '@hapi/boom';
import newResponse from '../helpers/response';
import fs from 'fs';
import phraseDao from '../dao/phrase.dao';
const filePath = 'storage.txt';

export default class PhraseService<T> {
    public async getAllPhrase(
        request: Hapi.Request,
        toolkit: Hapi.ResponseToolkit
    ): Promise<Hapi.ResponseObject> {
        try {
            let resultPhrases = await this.processFileLineByLine(filePath);
            resultPhrases = resultPhrases.filter(element => element.phrase);
            const dbData = await phraseDao.getAllPhrase();

            if (!resultPhrases) {
                return toolkit.response(
                    newResponse(request, {
                        boom: Boom.notFound(),
                    })
                );
            }

            return toolkit.response(
                newResponse(request, {
                    value: resultPhrases,
                })
            );
        } catch (error) {
            Logger.error('Error at getAllPhrase - ', error);
            return toolkit.response(
                newResponse(request, {
                    boom: Boom.badImplementation(error),
                })
            );
        }
    };

    private async processFileLineByLine(filePath: string): Promise<{ id: number, phrase: string }[]> {
        const promiseReadFile = await fs.readFileSync(filePath, 'utf8');

        return promiseReadFile.split('\n')
            .map((element, index) => {
                return { id: index + 1, phrase: element }
            });
    }

    public async writePhraseIntoFile(
        request: Hapi.Request,
        toolkit: Hapi.ResponseToolkit
    ): Promise<Hapi.ResponseObject> {
        try {
            type Payload = {
                phrase: string;
            };
            const reqPayload: Payload = request.payload as Payload;
            const phrase: string = reqPayload.phrase + '\n';

            await fs.appendFileSync(filePath, phrase);

            const result = await this.countFileLines(filePath);

            if (result) {
                await phraseDao.insertPhrase(result, reqPayload.phrase);
            }

            return toolkit.response(
                newResponse(request, {
                    value: { id: result },
                })
            );

        } catch (error) {
            Logger.error('Error at writePhraseIntoFile - ', error);
            return toolkit.response(
                newResponse(request, {
                    boom: Boom.badImplementation(error),
                })
            );
        }
    }

    private async countFileLines(filePath: string): Promise<number> {
        const promiseReadFile: string = await fs.readFileSync(filePath, 'utf8');
        let fileBuffer: string[] = promiseReadFile.split('\n');
        fileBuffer = fileBuffer.filter(element => element);
        return fileBuffer.length;
    }

    public async deletePhraseById(
        request: Hapi.Request,
        toolkit: Hapi.ResponseToolkit
    ): Promise<Hapi.ResponseObject> {
        try {
            const lineNumber: number = (request.params.line_number);
            const updatedLineNumber: number = lineNumber - 1;
            const promiseReadFile: string = await fs.readFileSync(filePath, 'utf8');
            const originalPhrases: string[] = promiseReadFile.split('\n');

            if (updatedLineNumber > originalPhrases.length) {
                return toolkit.response(
                    newResponse(request, {
                        value: { success: false },
                    })
                );
            }

            originalPhrases.splice(updatedLineNumber, 1);
            const updatedPhrases = originalPhrases.join('\n');
            await fs.writeFileSync(filePath, updatedPhrases);

            const dbResult = await phraseDao.deletePhraseById(lineNumber);

            return toolkit.response(
                newResponse(request, {
                    value: { success: true },
                })
            );
        } catch (error) {
            Logger.error('Error at deletePhraseById - ', error);
            return toolkit.response(
                newResponse(request, {
                    boom: Boom.badImplementation(error),
                })
            );
        }
    }
}