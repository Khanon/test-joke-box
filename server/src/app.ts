import { Request, Response } from "express";

import { DBConfig } from './models/db-config';
import { Database } from './classes/database';
import { APIRest } from './classes/api-rest';
import { ServerConfig } from './models/server-config';
import { Server } from './classes/server';
import { Logger } from './classes/logger';

let dbConfig: DBConfig = {
    host: "database-jokebox.c7sjyxtfyrql.us-east-1.rds.amazonaws.com",
    port: 3306,
    user: "jokebox",
    password: "jokebox-password",
    useDatabase: "jokebox",
}

let serverConfig: ServerConfig = {
    port: 3000,
}

let database: Database = new Database(dbConfig);
let server: Server = new Server(serverConfig);
let api: APIRest = new APIRest();

// Create API
api.get('/joke', (req: Request, res: Response) => {
    // Get a joke by ID
    Logger.info("GET /joke, id:", req.query.id);
    if (req.query.id) {
        database.queryExec(`SELECT * FROM jokes WHERE id = '${req.query.id}'`).then(result => {
            res.status(200);
            res.json(result);
        }).catch(error => {
            res.status(500);
            res.send('Error querying the database.');
        });
    } else {
        res.status(200);
        res.send('Please add the joke ID to the query (E.g: http://localhost:3000/joke?id=23).');
    }
});

api.get('/randomJoke', (req: Request, res: Response) => {
    // Get a random joke
    Logger.info("GET /randomJoke");
    database.queryExec(`SELECT * FROM jokes ORDER BY RAND() LIMIT 1`).then(result => {
        res.status(200);
        res.json(result);
    }).catch(error => {
        res.status(500);
        res.send('Error querying the database.');
    });
});

// Connect to database
database.onConnectionFail = (error) => {
    process.exit();
}

database.onConnectionSuccess = () => {
    // Start server on connection successful
    server.useAPI(api);
    server.listen();
}

database.connect();
