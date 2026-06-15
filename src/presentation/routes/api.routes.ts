import { Router } from "express";

import { AuthRoutes } from "./auth/routes";
import { CategoryRoutes } from "./categories/routes";

import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ProductsRoutes } from "./products/routes";
import { FileUploadRoutes } from "./file-upload/routes";
import { ImagesRoutes } from "./images/routes";

export class ApiRoutes {
    static get routes(): Router {

        const router = Router();

        router.get('/', (req, res) => {
            res.json({
                message: "Welcome to REST API Service",
                version: "1",
                build: "0.0.1_20230105"
            });
        });

        router.use('/auth', AuthRoutes.routes);

        
        router.use(AuthMiddleware.validateJWT)
        router.use('/categories', CategoryRoutes.routes);
        router.use('/products', ProductsRoutes.routes);
        router.use('/upload', FileUploadRoutes.routes);
        router.use('/images', ImagesRoutes.routes);

        return router;
    }
}