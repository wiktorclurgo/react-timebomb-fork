/// <reference types="react" />
import { ArrowButtonProps } from './components/button';
export declare type ReactTimebombDate = Date | undefined | Date[];
export interface ReactTimebombProps {
    className?: string;
    value?: ReactTimebombDate;
    format?: string;
    placeholder?: string;
    menuWidth?: number;
    minDate?: Date;
    maxDate?: Date;
    selectRange?: 'week' | number | boolean;
    showCalendarWeek?: boolean;
    showConfirm?: boolean;
    disabled?: boolean;
    error?: any;
    mobile?: boolean;
    arrowButtonComponent?: React.ComponentType<ArrowButtonProps>;
    arrowButtonId?: string;
    iconComponent?: React.ComponentType<IconProps> | null;
    timeStep?: number;
    onChange(...dates: (undefined | Date)[]): void;
    onError?(error: ReactTimebombError, ...value: ReactTimebombState['valueText'][]): void;
    onOpen?(): void;
    onClose?(): void;
}
export interface ReactTimebombState {
    minDate?: Date;
    maxDate?: Date;
    valueText?: string | string[];
    allowValidation?: boolean;
    date: ReactTimebombDate;
    mode?: FormatType;
    showDate?: boolean;
    showTime?: boolean;
    selectedRange: number;
    menuHeight: number;
}
export declare type ReactTimebombError = 'outOfRange' | 'invalidDate';
export declare type FormatType = 'day' | 'month' | 'year' | 'hour' | 'minute' | 'second';
export interface IconProps {
    showDate?: boolean;
    showTime?: boolean;
}
export { ArrowButtonProps as ReactTimebombArrowButtonProps };
