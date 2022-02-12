import { State } from './state';

export class StateMachine {
    currentState: State;

    set(state: State): void {
        if (this.currentState) {
            this.currentState.end();
        }
        this.currentState = state;
        this.currentState.start(() => this.onEndState());
    }

    onEndState(): void {
        this.currentState = undefined;
    }
}
