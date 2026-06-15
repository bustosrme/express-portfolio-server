import { Request, Response } from "express";
import { CustomError } from "../../../domain";
import { FileUploadService } from "../../services/fileupload.service";
import { UploadedFile } from "express-fileupload";

export class FileUploadController {

    constructor(
        private readonly service: FileUploadService,
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    uploadFile = async (req: Request, res: Response) => {
        const type = req.params.type;
        const file = req.body.files as UploadedFile;

        this.service.uploadFile(file, `uploads/${type}`)
            .then(uploaded => res.json(uploaded))
            .catch(error => this.handleError(error, res));
    }

    uploadMultipleFile = async (req: Request, res: Response) => {
        const type = req.params.type;
        const files = req.body.files as UploadedFile[];

        this.service.uploadMultipleFiles(files, `uploads/${type}`)
            .then(uploaded => res.json(uploaded))
            .catch(error => this.handleError(error, res))
    }

}