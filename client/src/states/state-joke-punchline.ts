import { AppEvents } from '../models/app-events';
import { StateClickable } from './state-clickable';

export class StateJokePunchline extends StateClickable {
    onStart(): void {
        this.parent.elements.jokeSetupContainer.style.top = '35%';
        this.parent.elements.jokeSetup.style.fontSize = '30px';
        this.parent.elements.jokePunchline.innerText = this.parent.joke.punchline;
        this.parent.elements.jokePunchline.classList.add('fade-in-slide-up-800');
        this.initClickable();
    }

    onEnd(): void {
        this.parent.elements.jokePunchline.classList.remove('fade-in-slide-up-800');
        this.releaseClickable();
    }

    onClick(): void {
        this.callbackNotifier(AppEvents.JOKE_PUNCHLINE_END);
    }
}
