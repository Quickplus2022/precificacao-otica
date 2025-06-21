import { Express } from "express";
import { readExcelFile } from "./excel-reader";

export function registerRoutes(app: Express) {
    app.post("/upload", async (req, res) => {
        try {
            const buffer = [];
            req.on("data", (chunk) => buffer.push(chunk));
            req.on("end", async () => {
                const data = await readExcelFile(Buffer.concat(buffer));
                res.json(data);
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
