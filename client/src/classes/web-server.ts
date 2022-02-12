import express, { Express } from "express";

import { Logger } from './logger';

export class WebServer {
    private readonly server: Express;
    private readonly port = 8080;

    constructor() {
        this.server = express();
    }

    listen(): void {
        this.server.set("view options", { layout: true });

        // Make public app.js and assets
        this.server.use("/assets", express.static(__dirname + '/assets'));
        this.server.use("/fonts.css", express.static(__dirname + '/fonts.css'));
        this.server.use("/app.css", express.static(__dirname + '/app.css'));
        this.server.use("/app.js", express.static(__dirname + '/app.js'));

        // Index.html
        this.server.get("/", (req, res) => {
            res.setHeader('Content-Type', 'text/html');
            res.sendFile((__dirname + "/index.html"));
        });

        // Start server
        this.server.listen(this.port, () => {
            Logger.info(`Web Server started at http://localhost:${this.port}`);
        });
    }
}