import { envs } from "./config";
import { AppRoutes } from "./presentation/routes/index";
import { Server } from "./config";
import { MongoDatabase } from "./data";

(() => {
    main();
})()

async function main() {

    // await MongoDatabase.connect({
    //     dbName: envs.MONGO_DB_NAME,
    //     mongoUrl: envs.MONGO_URL,
    // })

    const server = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    });

    server.start();
}