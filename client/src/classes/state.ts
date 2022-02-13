export abstract class State<T, N = any> {
    constructor(protected readonly parent: T, protected readonly callbackNotifier?: (event: N) => void) {}

    abstract onStart(): void;
    abstract onEnd(): void;

    start(): void {
        this.onStart();
    }

    end(): void {
        this.onEnd();
    }
}
