import { Joke } from './joke';
import { DocumentElements } from './document-elements';

export interface AppData {
    joke?: Joke;
    elements?: DocumentElements;
}