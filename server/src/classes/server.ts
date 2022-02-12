import express from "express";
import cors from "cors";

import { ServerConfig } from '../models/server-config';
import { Logger } from './logger';
import { APIRest } from './api-rest';

export class Server {
    protected readonly server: express.Express;

    constructor(private readonly config: ServerConfig) {
        this.server = express();

        // In case of a complex or mutable server, express layouts should be used due to server config on constructor
        this.server.set("view options", { layout: true });
        this.server.use(cors());
    }

    useAPI(api: APIRest): void {
        this.server.use(api.handler);
    }

    // Starts server
    listen() {
        this.server.listen(this.config.port, () => {
            Logger.info(`API Rest started at http://localhost:${this.config.port}`);
        });
    }
}