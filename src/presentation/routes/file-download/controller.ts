import { Request, Response } from "express";
import path from "path";

import { CustomError } from "../../../domain";

import { FileDownloadService } from "../../services";

export class DownloadController {

    constructor(
        private readonly service: FileDownloadService
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    downloadCV = async (req: Request, res: Response) => {
        try {
            const indexPath = path.join(__dirname, '../../../assets/pdf/CV-BustosRoldan,MauroExequiel.pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="CV - Bustos Roldan Mauro Exequiel.pdf"');
            res.setHeader('Content-Type', 'application/pdf');
            res.download(indexPath);
        } catch (error) {
            this.handleError(error, res)
        }
    }

}