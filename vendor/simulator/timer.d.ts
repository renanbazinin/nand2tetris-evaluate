export declare const MAX_STEPS = 1000;
export declare abstract class Timer {
    #private;
    frame(): void;
    abstract tick(): Promise<boolean>;
    finishFrame(): void;
    abstract reset(): void;
    abstract toggle(): void;
    _steps: number;
    _steps_actual: number;
    get steps(): number;
    set steps(value: number);
    _speed: number;
    get speed(): number;
    set speed(value: number);
    get running(): boolean;
    start(): void;
    stop(): void;
}
