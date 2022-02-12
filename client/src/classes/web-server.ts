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
        this.server.use(express.static(__dirname + '/public'));

        this.server.get("/", (req, res) => {
            res.setHeader('Content-Type', 'text/html');
            res.sendFile((__dirname + "/index.html"));
        });

        this.server.get("/app.js", (req, res) => {
            res.setHeader('Content-Type', 'text/javascript');
            res.sendFile((__dirname + "/app.js"));
        });

        this.server.listen(this.port, () => {
            Logger.info(`Web Server started at http://localhost:${this.port}`);
        });
    }
}