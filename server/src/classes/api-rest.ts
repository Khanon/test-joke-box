import express from "express";

import { ApiGetConfig } from '../models/api-get-config';

export class APIRest {
    handler: express.Express;

    constructor() {
        this.handler = express();
    }

    // For this simple server only 'get' operation is needed. 'post', 'put', 'delete', etc should be implemented in case of need.
    get(path:  string, callback: (req: express.Request, res: express.Response) => void, config: ApiGetConfig = undefined): void {
        this.handler.get(path, (req: express.Request, res: express.Response) => {
            // 'config' could be used to setup the call here (headers, validators, etc), in this way the 'config' and 'logic' layers can be separated,
            // implementing the config layer on this class and leaving to the app focusing on logical layer.
            callback(req, res);
        });
    }
}
