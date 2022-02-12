import { DocumentElements } from '../models/document-elements';
import { AppNotifications } from '../models/app-notifications';

export abstract class State {
    protected elements: DocumentElements;
    protected appNotify: (event: AppNotifications) => void;

    abstract onStart(): void;

    start(elements: DocumentElements, appNotify: (event: AppNotifications) => void): void {
        this.elements = elements;
        this.appNotify = appNotify;
        this.onStart();
    }
}
