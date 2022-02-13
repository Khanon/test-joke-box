import { Logger } from './logger';
import { Joke } from '../models/joke';

export class JokeLoader {
    joke: Joke;
    private randomJokeEndpoint = 'http://localhost:3000/randomJoke';

    // Request next joke
    getNextJoke(): void {
        Logger.info(`Request next joke from ${this.randomJokeEndpoint}`);
        this.joke = undefined;
        fetch(this.randomJokeEndpoint).then(result => {
            if (result.ok) {
                result.json().then(data => {
                    try {
                        Logger.info("Got next joke:", JSON.stringify(data));
                        this.joke = {
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
        // This callback hell could be fixed using RXJS instead of fetch. For simplicity I keep fetch.
    }

    getNextJokeError(): void {
        Logger.error("Couldn't get Joke from server, retrying in 5 seconds...");
        setTimeout(() => this.getNextJoke(), 5000);
    }
}