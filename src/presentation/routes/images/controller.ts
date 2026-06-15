import fs from 'fs';

import { Request, Response } from "express";
import { CustomError } from "../../../domain";
import path from 'path';

export class ImageController {

    constructor( ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    get = async (req: Request, res: Response) => {
        const { type = '', img = '' } = req.params;
        const imagePath = path.resolve(__dirname, `../../../../uploads/${type}/${img}`);

        console.log("🚀 ~ get= ~ imagePath:", imagePath)
        if(!fs.existsSync(imagePath)){
            return res.status(404).json({ error: 'Image not found' });
        }
        res.sendFile(imagePath);
    }
}