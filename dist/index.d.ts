import * as React from 'react';
import { ReactTimebombProps, ReactTimebombState } from './typings';
export * from './typings';
export declare class ReactTimebomb extends React.Component<ReactTimebombProps, ReactTimebombState> {
    static MENU_WIDTH: number;
    private onToggle?;
    private onCloseMenu?;
    private onOpenMenu?;
    private MobileMenuContainer?;
    private valueRef;
    private getMobileMenuContainer;
    private readonly className;
    private readonly defaultDateValue;
    private readonly initialState;
    constructor(props: ReactTimebombProps);
    componentDidUpdate(prevProps: ReactTimebombProps, prevState: ReactTimebombState): Promise<void>;
    private setStateAsync;
    private validateValueText;
    render(): React.ReactNode;
    private renderValue;
    private onClose;
    private emitError;
    private emitChange;
    private emitChangeAndClose;
    private getSelectedRange;
    private onClear;
    private onChangeValueText;
    private onChangeFormatGroup;
    private onHoverDays;
    private onMultiValueSelect;
    private onSelectDay;
    private onModeDay;
    private onModeYear;
    private onModeMonth;
    private onChangeMonth;
    private onChangeYear;
    private onReset;
    private onNextMonth;
    private onPrevMonth;
    private onSelectTime;
    private onPaste;
    private onSubmitOrCancelTime;
    private onMobileMenuContainerClick;
}
