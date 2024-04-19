import { envs } from "./config";
import { AppRoutes } from "./presentation/routes/index";
import { Server } from "./config";

(() => {
    main();
})()

async function main() {

    const server = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    });

    server.start();
}