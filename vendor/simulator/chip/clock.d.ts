import { Observable, Subject } from "rxjs";
import { Voltage } from "./chip.js";
interface Tick {
    readonly level: Voltage;
    readonly ticks: number;
}
export declare class Clock {
    private level;
    private ticks;
    static get(): Clock;
    static subscribe(observer: (value: Tick) => void): import("rxjs").Subscription;
    get isHigh(): boolean;
    get isLow(): boolean;
    private subject;
    readonly frameSubject: Subject<void>;
    readonly resetSubject: Subject<void>;
    readonly $: Observable<Tick>;
    readonly frame$: Observable<void>;
    readonly reset$: Observable<void>;
    private next;
    private constructor();
    reset(): void;
    tick(): void;
    tock(): void;
    toggle(): void;
    eval(): void;
    frame(): void;
    toString(): string;
}
export {};
