import { State } from '../classes/state';
import { AppData } from '../models/app-data';
import { AppEvents } from '../models/app-events';

export abstract class StateClickable extends State<AppData, AppEvents> {
    private clickHandler: () => void;
    private clickTimer: NodeJS.Timeout;
    private showHandTimer: NodeJS.Timeout;

    abstract onClick(): void;

    initClickable(): void {
        this.clickHandler = this.onClick.bind(this);
        this.clickTimer = setTimeout(() => this.parent.elements.clickArea.addEventListener('click', this.clickHandler, true), 1000);
        this.showHandTimer = setTimeout(() => {
            this.parent.elements.hand.style.opacity = '1';
        }, 3000);
    }

    releaseClickable(): void {
        this.parent.elements.clickArea.removeEventListener('click', this.clickHandler, true);
        this.parent.elements.hand.style.opacity = '0';
        clearTimeout(this.clickTimer);
        clearTimeout(this.showHandTimer);
    }
}