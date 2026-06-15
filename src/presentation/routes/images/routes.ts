import { Router } from "express";

import { ImageController } from "./controller";
// import { ImagesService } from "../../services/fileupload.service";

export class ImagesRoutes {

    static get routes(): Router {

        const router = Router();
        const controller = new ImageController();
        // Definir las rutas
        
        router.get('/:type/:img', controller.get);

        return router;
    }
}