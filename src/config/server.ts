import express, { Router } from 'express';
import fileupload from 'express-fileupload';

interface Options {
    port: number;
    publicPath?: string;
    routes: Router;
}

export class Server {
    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(options: Options) {
        const { port, publicPath = 'public', routes } = options;
        this.port = port;
        this.publicPath = publicPath;
        this.routes = routes;
    }

    async start() {

        // Middlewares
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true })) // x-www-form-urlencoded
        this.app.use(fileupload({
            limits: { fileSize: 50 * 1024 * 1024 },
        }))

        // Public Folder
        this.app.use(express.static(this.publicPath));

        // Routes
        this.app.use('/', this.routes);

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        })
    }
}