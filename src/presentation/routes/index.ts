import { Router } from "express";
import path from "path";

import { DownloadRoutes } from "./file-download/routes";

import { WebhooksService } from "../services";

export class AppRoutes {
    static get routes(): Router {

        const router = Router();

        router.get('/', (req, res) => {
            const discordService = new WebhooksService();
            const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
            discordService.notify('Someone visited the website');
            res.sendFile(path.join(__dirname, '../../../public/html/cv.html'));
        });

        router.use('/download/', DownloadRoutes.routes);

        router.get('/ping', (req, res) => {
            res.json(new Date());
        });

        return router;
    }
}