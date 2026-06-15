import fs from 'fs';
import path from "path";
import { UploadedFile } from "express-fileupload"
import { CustomError } from "../../domain";
import { uuid } from '../../utils';

export class FileUploadService {

    constructor() { }

    private checkFolder = (folder: string) => {
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder);
        }
    }

    async uploadFile(
        file: UploadedFile,
        folder: string = 'uploads',
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif'],
    ) {

        try {
            const fileExtension = file.mimetype.split('/').at(1) ?? '';
            if (!validExtensions.includes(fileExtension)) {
                throw CustomError.badRequest(`Invalid extension: ${fileExtension}, valid ones ${validExtensions}`);
            }
            const destination = path.resolve(__dirname, '../../../', folder);
            this.checkFolder(destination);

            const fileName = `${uuid()}.${fileExtension}`;

            file.mv(`${destination}/${fileName}`);

            return { fileName }

        } catch (error) {
            throw error;
        }
    }

    async uploadMultipleFiles(
        files: UploadedFile[],
        folder: string = 'uploads',
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif'],
    ) {
        const fileNames = await Promise.all(
            files.map(file => this.uploadFile(file, folder, validExtensions))
        );

        return fileNames;

    }
}