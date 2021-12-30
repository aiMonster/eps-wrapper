import { IMeterDate } from "./meter-date.interface";

export interface IChartValue {
    /** Date of meter has been taken */
    date: IMeterDate;

    /** Service type */
    type: string;

    /** Value of used service */
    value: number;
}
