import { State } from '../classes/state';
import { AppData } from '../models/app-data';
import { AppEvents } from '../models/app-events';

export class StateJokeEnd extends State<AppData, AppEvents> {
    onStart(): void {
        this.parent.elements.jokeSetup.style.opacity = '0';
        this.parent.elements.jokePunchline.style.opacity = '0';
        setTimeout(() => {
            this.parent.elements.jokeSetupContainer.style.top = this.parent.elements.jokeSetupContainerInitialStyle.top;
            this.parent.elements.jokeSetup.style.fontSize = this.parent.elements.jokeSetupInitialStyle.fontSize;
            this.parent.elements.jokeSetup.innerText = '';
            this.parent.elements.jokePunchline.innerText = '';
            this.parent.elements.jokeSetup.style.opacity = '1';
            this.parent.elements.jokePunchline.style.opacity = '1';
            if (this.parent.elements.uiContainer.style.backgroundColor === 'black') {
                this.parent.elements.uiContainer.style.backgroundColor = 'white';
                this.parent.elements.uiContainer.style.color = 'black';
                this.parent.elements.connectingIcon.style.backgroundImage = `url('./assets/connecting-icon-black.svg')`;
            } else {
                this.parent.elements.uiContainer.style.backgroundColor = 'black';
                this.parent.elements.uiContainer.style.color = 'white';
                this.parent.elements.connectingIcon.style.backgroundImage = `url('./assets/connecting-icon-white.svg')`;
            }
            setTimeout(() => this.callbackNotifier(AppEvents.SHOW_NEXT_JOKE), 1000);
        }, 1000);
    }

    onEnd(): void { }
}