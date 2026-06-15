import { Router } from "express";

import { ProductsController } from "./controller";
import { ProductsService } from "../../services";

export class ProductsRoutes {

    static get routes(): Router {

        const router = Router();

        const service = new ProductsService();
        const controller = new ProductsController(service);
        // Definir las rutas
        
        router.get('/', controller.get);
        router.post('/', controller.create);


        return router;
    }
}