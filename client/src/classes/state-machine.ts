import { State } from './state';

export class StateMachine {
    currentState: State<any>;

    set(state: State<any>): void {
        if (this.currentState) {
            this.currentState.end();
        }
        this.currentState = state;
        this.currentState.start();
    }
}
