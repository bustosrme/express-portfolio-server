import { Router } from "express";

import { CategoryController } from "./controller";
import { CategoryService } from "../../services";

export class CategoryRoutes {

    static get routes(): Router {

        const router = Router();

        const service = new CategoryService();
        const controller = new CategoryController(service);
        // Definir las rutas
        
        router.get('/', controller.get);
        router.post('/', controller.create);


        return router;
    }
}