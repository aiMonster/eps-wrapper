import { IMeterDate } from "./meter-date.interface";

export interface IMeterHistoryValue {
    /** Meter Date */
    date: IMeterDate;

    /** Service type */
    type: string,

    /** Previous month meter value */
    previousValue: number,

    /** Current month meter value */
    currentValue: number
}
