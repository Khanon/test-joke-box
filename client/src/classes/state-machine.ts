import { State } from './state';
import { DocumentElements } from '../models/document-elements';
import { AppNotifications } from '../models/app-notifications';

export class StateMachine {
    currentState: State;

    constructor(private readonly elements: DocumentElements, private readonly appNotify: (event: AppNotifications) => void) {}

    set(state: State): void {
        this.currentState = state;
        this.currentState.start(this.elements, this.appNotify);
    }
}
