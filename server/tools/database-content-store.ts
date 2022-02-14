import { DBConfig } from "../src/models/db-config";
import { Logger } from "../src/classes/logger";
import { Database } from '../src/classes/database';

// TC39 is working to implement this as an import. At the moment it is enough to require the file since this isn't a deployable code.
const databaseContent = require("./database-content.json");

let dbConfig: DBConfig = {
    host: "database-jokebox.c7sjyxtfyrql.us-east-1.rds.amazonaws.com",
    port: 3306,
    user: "jokebox",
    password: "jokebox-password",
}

let databaseName = "jokebox";
let tableName = "jokes";
let database: Database = new Database(dbConfig);

// Fix text to enter it properly on table
let fixDBText = (text: string)  => {
    text = text.replace(/"/g, `\\"`);
    text = text.replace(/\n /g, "");
    return text;
}

database.onConnectionFail = (error) => {
    Logger.error(error);
    process.exit();
}

database.onConnectionSuccess = () => {
    // Prepare query to add jokes, this step is made first to get the maximum size of 'type', 'setup' and 'punchline' and optimize the table size
    let addJokesQuery = `INSERT INTO ${tableName} (\`type\`, \`setup\`, \`punchline\`) VALUES `;
    let maxSizeType = 0;
    let maxSizeSetup = 0;
    let maxSizePunchline = 0;
    databaseContent.forEach(joke => {
        addJokesQuery += `("${joke.type}", "${fixDBText(joke.setup)}", "${fixDBText(joke.punchline)}"),`;
        if (joke.type.length > maxSizeType) {
            maxSizeType = joke.type.length;
        }
        if (joke.setup.length > maxSizeSetup) {
            maxSizeSetup = joke.setup.length;
        }
        if (joke.punchline.length > maxSizePunchline) {
            maxSizePunchline = joke.punchline.length;
        }
    });
    addJokesQuery = addJokesQuery.slice(0, -1);
    addJokesQuery += ";";

    // Drop and create database and table for jokes
    database.queryQueue(`DROP DATABASE IF EXISTS ${databaseName}`);
    database.queryQueue(`CREATE DATABASE ${databaseName}`);
    database.queryQueue(`USE ${databaseName}`);
    database.queryQueue(`DROP TABLE IF EXISTS ${tableName}`);
    database.queryQueue(`CREATE TABLE jokes (\`id\` SMALLINT AUTO_INCREMENT, \`type\` VARCHAR(${maxSizeType}), \`setup\` VARCHAR(${maxSizeSetup}), \`punchline\` VARCHAR(${maxSizePunchline}), PRIMARY KEY (id))`);

    // Query to insert jokes
    database.queryQueue(addJokesQuery);

    // Run queries
    database.queryExecQueue().then(result => {
        Logger.info('Data stored correctly.');
        process.exit();
    }).catch(error => {
        Logger.error(error);
        process.exit();
    });
}

database.connect();
