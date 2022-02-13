import { State } from '../classes/state';
import { AppData } from '../models/app-data';
import { AppEvents } from '../models/app-events';

export abstract class StateClickable extends State<AppData, AppEvents> {
    private clickHandler: () => void;
    private showHandTimer: NodeJS.Timeout;

    abstract onClick(): void;

    initialize(): void {
        this.clickHandler = this.onClick.bind(this);
        setTimeout(() => this.parent.elements.clickArea.addEventListener('click', this.clickHandler, true), 1000);
        this.showHandTimer = setTimeout(() => {
            this.parent.elements.hand.style.opacity = '1';
        }, 3000);
    }

    release(): void {
        this.parent.elements.clickArea.removeEventListener('click', this.clickHandler, true);
        this.parent.elements.hand.style.opacity = '0';
        clearTimeout(this.showHandTimer);
    }
}