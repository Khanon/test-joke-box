import { AppEvents } from '../models/app-events';
import { StateClickable } from './state-clickable';

export class StateJokeSetup extends StateClickable {
    onStart(): void {
        this.parent.elements.jokeSetup.innerText = this.parent.joke.setup;
        this.parent.elements.jokeSetup.classList.add('fade-in-slide-up-800');
        this.initialize();
    }

    onEnd(): void {
        this.parent.elements.jokeSetup.classList.remove('fade-in-slide-up-800');
        this.parent.elements.hand.style.opacity = '0';
        this.release();
    }

    onClick(): void {
        this.callbackNotifier(AppEvents.JOKE_SETUP_END);
    }
}