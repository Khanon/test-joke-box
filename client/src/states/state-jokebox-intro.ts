import { State } from '../classes/state';

export class StateJokeboxIntro extends State {
    onStart(): void {
        this.elements.jokeboxTitle.style.display = 'block';
        this.elements.jokeboxTitle.classList.add('fade-in-slide-left-800');
        setTimeout(() => this.elements.jokeboxTitle.classList.remove("fade-in-slide-left-800"), 800);
        setTimeout(() => {
            this.elements.jokeboxTitle.style['margin-top'] = "0%"
        }, 1000);
    }
}
