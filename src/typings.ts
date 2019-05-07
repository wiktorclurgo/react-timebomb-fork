import { ArrowButtonProps } from './components/button';

export type ReactTimebombDate = Date | undefined | Date[];

type ReactComponent<P = {}> =
    | React.ComponentClass<P>
    | React.StatelessComponent<P>;

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
    arrowButtonId?: string;
    arrowButtonComponent?: ReactComponent<ArrowButtonProps>;
    clearComponent?: ReactComponent;
    iconComponent?: ReactComponent<IconProps> | null;
    timeStep?: number;
    onChange(...dates: (undefined | Date)[]): void;
    onError?(
        error: ReactTimebombError,
        ...value: ReactTimebombState['valueText'][]
    ): void;
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

export type ReactTimebombError = 'outOfRange' | 'invalidDate';
export type FormatType =
    | 'day'
    | 'month'
    | 'year'
    | 'hour'
    | 'minute'
    | 'second';

export interface IconProps {
    showDate?: boolean;
    showTime?: boolean;
}

export { ArrowButtonProps as ReactTimebombArrowButtonProps };
