import * as momentImport from 'moment';
import { ReactTimebombDate, FormatType } from './typings';
export declare const formatSplitExpr: RegExp;
export declare function dateFormat(date: Date, format: string): string;
export declare function dateFormat(date: Date[], format: string): string[];
export declare function dateFormat(date: Date | Date[], format: string): string | string[];
export declare function validateDate(date: string | string[] | undefined, format: string): ReactTimebombDate;
export declare function getFormatType(format: string): FormatType | undefined;
export declare function formatIsActualNumber(format: string): boolean;
/** @return returns a string with transformed value, true for valid input or false for invalid input */
export declare function validateFormatGroup(input: string | number, format: string): boolean | string;
/** @return returns a string with transformed value, true for valid input or false for invalid input */
export declare function validateFormatType(input: string | number, formatType?: FormatType): string | boolean;
export declare function stringFromCharCode(keyCode: number): string;
export declare function formatNumber(number: number): string;
export declare function formatNumberRaw(number: number): string;
export declare function splitDate(date: Date, format: string): string[];
export declare function joinDates(parts: (string | HTMLElement)[], format: string): string;
export declare function clearSelection(): void;
export declare function selectElement(el: HTMLElement | undefined, caret?: number[]): void;
export declare function getWeekOfYear(date: Date): number;
export declare function startOfWeek(date: Date): Date;
export declare function endOfWeek(date: Date): Date;
export declare function startOfDay(date: Date): Date;
export declare function endOfDay(date: Date): Date;
export declare function addDays(date: Date, num: number): Date;
export declare function addMonths(date: Date, num: number): Date;
export declare function addYears(date: Date, num: number): Date;
export declare function addHours(date: Date, num: number): Date;
export declare function addMinutes(date: Date, num: number): Date;
export declare function addSeconds(date: Date, num: number): Date;
export declare function subtractSeconds(date: Date, num: number): Date;
export declare function subtractMinutes(date: Date, num: number): Date;
export declare function subtractHours(date: Date, num: number): Date;
export declare function subtractDays(date: Date, num: number): Date;
export declare function subtractMonths(date: Date, num: number): Date;
export declare function subtractYears(date: Date, num: number): Date;
export declare function manipulateDate(date: Date, formatType: FormatType, direction: 'add' | 'subtract', timeStep?: number): Date;
export declare function startOfMonth(date: Date): Date;
export declare function endOfMonth(date: Date): Date;
export declare function isUndefined(val: any): val is undefined;
export declare function setDate(date: Date, hour: number, min?: number): Date;
export declare function isToday(date: Date): boolean;
export declare function isBefore(date: Date, inp: Date): boolean;
export declare function isAfter(date: Date, inp: Date): boolean;
export declare function isBetween(date: Date, cmpDateA?: Date, cmpDateB?: Date, context?: momentImport.unitOfTime.StartOf): boolean;
export declare function dateEqual(dateA?: ReactTimebombDate, dateB?: ReactTimebombDate, considerTime?: boolean): boolean;
export declare function stringEqual(valueA?: string | string[], valueB?: string | string[]): boolean;
export declare function getMonthNames(short?: boolean): string[];
export declare function getWeekdayNames(): string[];
export declare function isEnabled(context: momentImport.unitOfTime.StartOf, date: Date, { minDate, maxDate }: {
    minDate?: Date;
    maxDate?: Date;
}): boolean;
export declare function getAttribute(input: Element, attr: string): string;
export declare function isDateFormat(format: string): boolean;
export declare function isTimeFormat(format: string): boolean;
export declare function sortDates(a: Date, b: Date): number;
export declare function isArray(val: any): val is any[];
export declare function fillZero(value: string | number, formatType: FormatType): string | undefined;
export declare function replaceSpaceWithNbsp(str?: string): string | undefined;
export declare const keys: {
    ARROW_UP: number;
    ARROW_RIGHT: number;
    ARROW_DOWN: number;
    ARROW_LEFT: number;
    ENTER: number;
    TAB: number;
    ESC: number;
    BACKSPACE: number;
    DELETE: number;
    SPACE: number;
    SHIFT: number;
    DOT: number;
    COMMA: number;
};
