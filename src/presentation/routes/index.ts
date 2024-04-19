import { Router } from "express";
import path from "path";

import { DownloadRoutes } from "./file-download/routes";

export class AppRoutes {
    static get routes(): Router {

        const router = Router();

        router.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../../../public/html/cv.html'));
        });

        router.use('/download/', DownloadRoutes.routes);

        router.get('/ping', (req, res) => {
            res.json(new Date());
        });

        return router;
    }
}