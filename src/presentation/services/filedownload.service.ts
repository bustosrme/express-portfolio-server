import path from "path";
import puppeteer from "puppeteer";
import { envs } from "../../config";

export class FileDownloadService {

    constructor() { }

    async generatePDF(url: string, outputPath: string) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        await page.setViewport({
            width: 1920,
            height: 1080,
            deviceScaleFactor: 1,
            isMobile: false,
            hasTouch: false,
            isLandscape: false
        });
        const pdfBuffer = await page.pdf({ path: outputPath, format: 'A4' });
        // Cerrar el navegador
        await browser.close();
        return pdfBuffer;
        // Descargar el PDF
    }

    async downloadPage(
        url: string,
    ) {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(url);
            await page.setViewport({
                width: 1920,
                height: 1080,
                deviceScaleFactor: 1,
                isMobile: false,
                hasTouch: false,
                isLandscape: false
            });

            // Generar el PDF con tamaño A4 (o el tamaño que desees)
            const pdfBuffer = await page.pdf({ format: 'A4' });
            // Cerrar el navegador
            await browser.close();
            return pdfBuffer;
            // Descargar el PDF

        } catch (error) {
            throw error;
        }
    }

    async downloadCV  () {
        try {
            const indexPath = path.join(envs.PUBLIC_PATH, 'pdf/CV-BustosRoldan,MauroExequiel.pdf');
            return indexPath;
        } catch (error) {
            throw error;
        }
    }

}