import { Logger } from './classes/logger';
import { StateMachine } from './classes/state-machine';

export class App {
    states: StateMachine = new StateMachine();

    start(): void {
        Logger.info("App started");
    }
}

const app = new App();
app.start();