export abstract class State {
    private onEndCallback: () => void;

    constructor(readonly id: string) { }

    abstract onStart(): void;
    abstract onEnd(): void;

    start(onEndCallback: () => void): void {
        this.onEndCallback = onEndCallback;
        this.onStart();
    }

    end(): void {
        this.onEndCallback();
        this.onEnd();
    }
}
