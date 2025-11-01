import { assert } from "@davidsouther/jiffies/lib/esm/assert.js";
import { BehaviorSubject, Subject } from "rxjs";
import { HIGH, LOW } from "./chip.js";
let clock;
export class Clock {
    level = LOW;
    ticks = 0;
    static get() {
        if (clock === undefined) {
            clock = new Clock();
        }
        return clock;
    }
    static subscribe(observer) {
        return Clock.get().$.subscribe(observer);
    }
    get isHigh() {
        return this.level === HIGH;
    }
    get isLow() {
        return this.level === LOW;
    }
    subject = new BehaviorSubject({
        level: this.level,
        ticks: this.ticks,
    });
    frameSubject = new Subject();
    resetSubject = new Subject();
    $ = this.subject;
    frame$ = this.frameSubject;
    reset$ = this.resetSubject;
    next() {
        this.subject.next({
            level: this.level,
            ticks: this.ticks,
        });
    }
    constructor() {
        // private
    }
    reset() {
        this.level = LOW;
        this.ticks = 0;
        this.next();
        this.resetSubject.next();
    }
    tick() {
        assert(this.level === LOW, "Can only tick up from LOW");
        this.level = HIGH;
        this.next();
    }
    tock() {
        assert(this.level === HIGH, "Can only tock down from HIGH");
        this.level = LOW;
        this.ticks += 1;
        this.next();
    }
    toggle() {
        this.level === HIGH ? this.tock() : this.tick();
    }
    eval() {
        this.tick();
        this.tock();
    }
    frame() {
        this.frameSubject.next();
    }
    toString() {
        return `${this.ticks}${this.level === HIGH ? "+" : ""}`;
    }
}
//# sourceMappingURL=clock.js.map