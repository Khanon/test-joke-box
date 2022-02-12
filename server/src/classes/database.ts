import mysql from "mysql2";

import { DBConfig } from "../models/db-config";
import { Logger } from "../classes/logger";
import { QueryHandler } from './query-handler';

export class Database {
    private connection: mysql.Connection;
    readonly queryHandler: QueryHandler = new QueryHandler();

    onConnectionSuccess: () => void;
    onConnectionFail: (error: any) => void;

    constructor(private readonly config: DBConfig) {}

    connect(): void {
        Logger.info("Connecting to database:", this.config.host);

        this.connection = mysql.createConnection({
            host: this.config.host,
            port: this.config.port,
            user: this.config.user,
            password: this.config.password
        });
        this.queryHandler.setConnection(this.connection);

        this.connection.connect((error) => {
            if (error) {
                // Connection failed to database
                Logger.error("Database Connection Failed -", error);
                this.onConnectionFail(error);
            } else {
                // Connection OK
                Logger.info("Connected to Database.");
                if (this.config.useDatabase) {
                    this.queryExec(`USE ${this.config.useDatabase}`).then(result => {
                        this.onConnectionSuccess();
                    }).catch(error => {
                        this.onConnectionFail(error);
                    });
                } else {
                    this.onConnectionSuccess();
                }
            }
        });
    }

    queryExec(query: string): Promise<void> {
        return this.queryHandler.queryExec(query);
    }

    queryQueue(query: string): void {
        this.queryHandler.queryQueue(query);
    }

    queryExecQueue(): Promise<void> {
        return this.queryHandler.queryExecQueue();
    }
}
