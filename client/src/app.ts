import { Logger } from './classes/logger';

export class App {
    start(): void {
        Logger.info("App started!");
    }
}

const app = new App();
app.start();