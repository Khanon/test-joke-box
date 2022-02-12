import { Connection } from "mysql2";

export class QueryHandler {
    private connection: Connection
    private readonly queryList: string[] = [];

    constructor() {}

    setConnection(connection: Connection): void {
        this.connection = connection;
    }

    // Run a single query
    queryExec(query: string): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log("Exec query: " + query);
            this.connection.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        })
    }

    // Add query to queue
    queryQueue(query: string): void {
        this.queryList.push(query);
    }

    // Reset queue
    queryResetQueue(): void {
        this.queryList.splice(0, this.queryList.length);
    }

    // Recursive promise function to resolve each query after the previous one is done
    queryExecQueue(queryList: string[] = undefined): Promise<void> {
        let queries = queryList ? [...queryList] : [...this.queryList];
        return new Promise((resolve, reject) => {
            if (queries.length === 0) {
                resolve();
            } else {
                this.queryExec(queries[0]).then(result => {
                    queries.shift();
                    this.queryExecQueue(queries).then(result => {
                        resolve();
                    }).catch(error => reject(error));
                }).catch(error => reject(error));
            }
        })
    }
}