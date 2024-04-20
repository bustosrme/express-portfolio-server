import { Request, Response } from "express";

import { CustomError } from "../../../domain";
import { FileDownloadService, WebhooksService } from "../../services";

export class DownloadController {

    constructor(
        private readonly service: FileDownloadService
    ) { }

    private readonly discordService = new WebhooksService();

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    downloadCV = async (req: Request, res: Response) => {
        this.service.downloadCV()
            .then((indexPath) => {
                res.setHeader('Content-Disposition', 'attachment; filename="CV - Bustos Roldan Mauro Exequiel.pdf"');
                res.setHeader('Content-Type', 'application/pdf');
                res.download(indexPath);
                const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
                this.discordService.notifyWithIP('Someone downloaded your cv', ip);
            })
            .catch((error) => {
                this.handleError(error, res)
            });
    }

}