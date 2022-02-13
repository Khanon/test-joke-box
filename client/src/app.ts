import { Logger } from './classes/logger';
import { StateMachine } from './classes/state-machine';
import { StateJokeboxIntro } from './states/state-jokebox-intro';
import { AppEvents } from './models/app-events';
import { StateJokeSetup } from './states/state-joke-setup';
import { JokeLoader } from './classes/joke-loader';
import { AppData } from './models/app-data';
import { StateJokePunchline } from './states/state-joke-punchline';
import { StateJokeEnd } from './states/state-joke-end';

export class App {
    data: AppData = {};
    states: StateMachine;
    jokeLoader: JokeLoader = new JokeLoader();

    // Start application
    start(): void {
        Logger.info("App started.");

        // Store all elements
        let jokeSetupContainerElement = document.getElementById('joke-setup-container');
        let jokeSetupElement = document.getElementById('joke-setup');
        this.data.elements = {
            uiContainer: document.getElementById("ui-container"),
            jokeboxTitleContainer: document.getElementById("jokebox-title-container"),
            jokeboxTitle: document.getElementById("jokebox-title"),
            connectingIcon: document.getElementById("connecting-icon"),
            jokeSetupContainer: jokeSetupContainerElement,
            jokeSetupContainerInitialStyle: {...jokeSetupContainerElement.style},
            jokeSetup: jokeSetupElement,
            jokeSetupInitialStyle: {...jokeSetupElement.style},
            jokePunchlineContainer: document.getElementById('joke-punchline-container'),
            jokePunchline: document.getElementById('joke-punchline'),
            clickArea: document.getElementById('click-area'),
            hand: document.getElementById('hand'),
        }

        // Initialize state machine, get next joke and start intro state
        this.states = new StateMachine();
        this.jokeLoader.getNextJoke();
        setTimeout(() => this.states.set(new StateJokeboxIntro(this.data.elements, (event) => this.notify(event))), 300);
    }

    // Notify events from states. This could be handled from RXJS subscription, but for this test we go vanilla.
    notify(event: AppEvents): void {
        switch (event) {
            case AppEvents.SHOW_NEXT_JOKE:
                this.showNextJokeSetup();
                break;
            case AppEvents.JOKE_SETUP_END:
                this.states.set(new StateJokePunchline(this.data, (event) => this.notify(event)));
                break;
            case AppEvents.JOKE_PUNCHLINE_END:
                this.states.set(new StateJokeEnd(this.data, (event) => this.notify(event)));
                break;
        }
    }

    // Show next joke
    showNextJokeSetup(): void {
        Logger.info('Show next joke');
        if (this.jokeLoader.joke) {
            this.data.joke = this.jokeLoader.joke;
            this.jokeLoader.getNextJoke();
            this.hideConnecting();
            this.states.set(new StateJokeSetup(this.data, (event) => this.notify(event)));
        } else {
            this.showConnecting();
            setTimeout(() => this.showNextJokeSetup(), 5000);
        }
    }

    // Connecting label
    showConnecting(): void {
        this.data.elements.connectingIcon.style.opacity = '1';
    }

    hideConnecting(): void {
        this.data.elements.connectingIcon.style.opacity = '0';
    }
}

// Entry point
const app = new App();
app.start();