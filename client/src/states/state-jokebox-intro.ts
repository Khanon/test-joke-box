import { State } from '../classes/state';
import { DocumentElements } from '../models/document-elements';
import { AppEvents } from '../models/app-events';

export class StateJokeboxIntro extends State<DocumentElements, AppEvents> {
    onStart(): void {
        this.parent.jokeboxTitleContainer.style.display = 'block';
        this.parent.jokeboxTitle.classList.add('fade-in-slide-left-800');
        setTimeout(() => this.parent.jokeboxTitle.classList.remove("fade-in-slide-left-800"), 800);
        setTimeout(() => {
            this.parent.jokeboxTitleContainer.style.top= "13%";
            this.parent.jokeboxTitle.style.fontSize = '50px';
        }, 1000);
        setTimeout(() => {
            this.callbackNotifier(AppEvents.SHOW_NEXT_JOKE);
        }, 1500);
    }

    onEnd(): void { }
}
