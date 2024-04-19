import { Router } from "express";

import { DownloadController } from "./controller";
import { FileDownloadService } from "../../services/filedownload.service";
// import { DownloadService } from "../../services/fileupload.service";
// import { DownloadMiddleware } from "../../middlewares/file-upload.middleware";

export class DownloadRoutes {

    static get routes(): Router {

        const router = Router();
        const service = new FileDownloadService();
        const controller = new DownloadController(service);
        // Definir las rutas

        // router.use([DownloadMiddleware.containFiles, DownloadMiddleware.validTypes(['images', 'documents'])]);
        
        router.get('/cv', controller.downloadCV);

        return router;
    }
}