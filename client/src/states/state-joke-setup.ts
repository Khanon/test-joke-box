import { State } from '../classes/state';
import { Joke } from '../models/joke';

export class StateJokeSetup extends State {
    constructor(private readonly joke: Joke) {
        super();
    }

    onStart(): void {
    }
}