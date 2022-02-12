import { Logger } from './classes/logger';
import { StateMachine } from './classes/state-machine';
import { StateJokeboxIntro } from './states/state-jokebox-intro';
import { DocumentElements } from './models/document-elements';
import { AppNotifications } from './models/app-notifications';
import { Joke } from './models/joke';
import { StateJokeSetup } from './states/state-joke-setup';

export class App {
    elements: DocumentElements;
    states: StateMachine;
    currentJoke: Joke;
    nextJoke: Joke;

    // Start application
    start(): void {
        Logger.info("App started.");

        // Store all elements
        this.elements = {
            jokeboxTitle: document.getElementById("jokebox-title"),
        }

        // Initialize state machine and get next joke
        this.getNextJoke();
        this.states = new StateMachine(this.elements, (event) => this.notify(event));

        // Run first state (intro jokebox)
        setTimeout(() => this.states.set(new StateJokeboxIntro()), 300);
    }

    // Notify events from states. This could be handled from RXJS subscription, but for this test we go vanilla.
    notify(event: AppNotifications): void {
        switch (event) {
            case AppNotifications.INTRO_END:
                if (this.nextJoke) {
                    this.currentJoke = this.nextJoke;
                    this.nextJoke = undefined;
                    this.getNextJoke();
                    this.states.set(new StateJokeSetup(this.currentJoke));
                } else {
                    // Show Connecting...
                    setTimeout(() => this.notify(AppNotifications.INTRO_END), 5000);
                }
                break;
            case AppNotifications.JOKE_END:
                break;
        }
    }

    // Request next joke
    getNextJoke(): void {
        Logger.info("Request next joke.");
        fetch('http://localhost:3000/randomJoke').then(result => {
            if (result.ok) {
                result.json().then(data => {
                    try {
                        Logger.info("Got next joke:", JSON.stringify(data));
                        this.nextJoke = {
                            id: data[0].id,
                            type: data[0].type,
                            setup: data[0].setup,
                            punchline: data[0].punchline,
                        };
                    } catch(error) {
                        this.getNextJokeError();
                    }
                }).catch(error => {
                    this.getNextJokeError();
                });
            } else {
                this.getNextJokeError();
            }
        }).catch(error => {
            this.getNextJokeError();
        });
        // This callback hell could be fixed using RXJS instead of fetch. For simplicity I keep the fetch.
    }

    getNextJokeError(): void {
        Logger.info("Couldn't get Joke from server, retrying in 5 seconds.");
        setTimeout(() => this.getNextJoke(), 5000);
    }
}

// Entry point
const app = new App();
app.start();