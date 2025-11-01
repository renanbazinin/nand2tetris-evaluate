import { FileSystem } from "@davidsouther/jiffies/lib/esm/fs.js";
import { Result } from "@davidsouther/jiffies/lib/esm/result.js";
import type { Subscription } from "rxjs";
export declare const HIGH = 1;
export declare const LOW = 0;
export type Voltage = typeof HIGH | typeof LOW;
export interface Pin {
    readonly name: string;
    readonly width: number;
    busVoltage: number;
    pull(voltage: Voltage, bit?: number): void;
    toggle(bit?: number): void;
    voltage(bit?: number): Voltage;
    connect(pin: Pin): void;
}
export declare function isConstantPin(pinName: string): boolean;
export declare class Bus implements Pin {
    readonly name: string;
    readonly width: number;
    state: Voltage[];
    next: Pin[];
    constructor(name: string, width?: number);
    ensureWidth(newWidth: number): void;
    connect(next: Pin): void;
    pull(voltage: Voltage, bit?: number): void;
    voltage(bit?: number): Voltage;
    set busVoltage(voltage: number);
    get busVoltage(): number;
    toggle(bit?: number): void;
}
export declare class InSubBus extends Bus {
    private bus;
    private start;
    readonly width: number;
    constructor(bus: Pin, start: number, width?: number);
    pull(voltage: Voltage, bit?: number): void;
    voltage(bit?: number): Voltage;
    set busVoltage(voltage: number);
    get busVoltage(): number;
    connect(bus: Pin): void;
}
export declare class OutSubBus extends Bus {
    private bus;
    private start;
    readonly width: number;
    constructor(bus: Pin, start: number, width?: number);
    pull(voltage: Voltage, bit?: number): void;
    set busVoltage(voltage: number);
    get busVoltage(): number;
    connect(bus: Pin): void;
}
export declare class ConstantBus extends Bus {
    private readonly value;
    constructor(name: string, value: number);
    pullHigh(_?: number): undefined;
    pullLow(_?: number): undefined;
    voltage(_?: number): Voltage;
    set busVoltage(voltage: number);
    get busVoltage(): number;
}
export declare const TRUE_BUS: ConstantBus;
export declare const FALSE_BUS: ConstantBus;
export declare function parsePinDecl(toPin: string): {
    pin: string;
    width: number;
};
export declare function parseToPin(toPin: string): {
    pin: string;
    start?: number;
    end?: number;
};
export declare class Pins {
    private readonly map;
    insert(pin: Pin): void;
    emplace(name: string, minWidth?: number): Pin;
    has(pin: string): boolean;
    get(pin: string): Pin | undefined;
    entries(): Iterable<Pin>;
    [Symbol.iterator](): MapIterator<[string, Pin]>;
}
export interface PartWireError {
    wireIndex: number;
    lhs: boolean;
    message: string;
}
export interface WireError {
    message: string;
    lhs: boolean;
}
export declare class Chip {
    name?: string | undefined;
    readonly id: number;
    ins: Pins;
    outs: Pins;
    pins: Pins;
    insToPart: Map<string, Set<Chip>>;
    partToOuts: Map<Chip, Set<string>>;
    parts: Chip[];
    clockedPins: Set<string>;
    clockSubscription?: Subscription;
    get clocked(): boolean;
    constructor(ins: (string | {
        pin: string;
        width: number;
    })[], outs: (string | {
        pin: string;
        width: number;
    })[], name?: string | undefined, internals?: (string | {
        pin: string;
        width: number;
    })[], clocked?: string[]);
    subscribeToClock(): void;
    reset(): void;
    in(pin?: string): Pin;
    out(pin?: string): Pin;
    hasIn(pin: string): boolean;
    hasOut(pin: string): boolean;
    pin(name: string): Pin;
    get(name: string, offset?: number): Pin | undefined;
    private getBuiltin;
    isInPin(pin: string): boolean;
    isOutPin(pin: string): boolean;
    isExternalPin(pin: string): boolean;
    isInternalPin(pin: string): boolean;
    pathExists(start: string, end: string): boolean;
    isClockedPin(pin: string): boolean;
    hasConnection(from: Chip, to: Chip): boolean;
    wire(part: Chip, connections: Connection[]): Result<void, PartWireError>;
    wireAll(wires: Iterable<{
        part: Chip;
        connections: Connection[];
    }>): void;
    sortParts(): boolean;
    private findPin;
    private wireOutPin;
    private wireInPin;
    eval(): void;
    tick(): void;
    tock(): void;
    remove(): void;
    load(fs: FileSystem, path: string): Promise<void>;
}
export declare class Low extends Chip {
    constructor();
}
export declare class High extends Chip {
    constructor();
}
export declare class ClockedChip extends Chip {
    get clocked(): boolean;
    subscribeToClock(): void;
    remove(): void;
    reset(): void;
}
export interface PinSide {
    name: string;
    start: number;
    width?: number;
}
export interface Connection {
    to: PinSide;
    from: PinSide;
}
export type Pinout = Record<string, string>;
export interface SerializedChip {
    id: number;
    name: string;
    ins: Pinout;
    outs: Pinout;
    pins: Pinout;
    children: SerializedChip[];
}
export declare function printChip(chip: Chip): SerializedChip;
export declare const BUILTIN_NAMES: string[];
