import * as React from 'react';
import { ReactTimebombProps, ReactTimebombState, ReactTimebombError, ReactTimebombDate, ReactTimebombArrowButtonProps } from './typings';
export { ReactTimebombProps, ReactTimebombState, ReactTimebombError, ReactTimebombDate, ReactTimebombArrowButtonProps };
export declare class ReactTimebomb extends React.Component<ReactTimebombProps, ReactTimebombState> {
    static MENU_WIDTH: number;
    static MENU_HEIGHT: number;
    private onToggle?;
    private MobileMenuContainer?;
    private getMobileMenuContainer;
    private readonly className;
    private readonly defaultDateValue;
    private readonly initialState;
    constructor(props: ReactTimebombProps);
    componentDidUpdate(prevProps: ReactTimebombProps, prevState: ReactTimebombState): void;
    private valueTextDidUpdate;
    render(): React.ReactNode;
    private renderValue;
    private onClose;
    private emitError;
    private emitChange;
    private getSelectedRange;
    private onClear;
    private onChangeValueText;
    private onChangeFormatGroup;
    private onValueSubmit;
    private onSelectDay;
    private onModeDay;
    private onModeYear;
    private onModeMonth;
    private onSelectMonth;
    private onSelectYear;
    private onReset;
    private onNextMonth;
    private onPrevMonth;
    private onSelectTime;
    private onSubmitOrCancelTime;
    private onMobileMenuContainerClick;
}
