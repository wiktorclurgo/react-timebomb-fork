(function(FuseBox){FuseBox.$fuse$=FuseBox;
FuseBox.target = "browser";
FuseBox.pkg("default", {}, function(___scope___){
___scope___.file("index.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styled_components_1 = require("styled-components");
const react_slct_1 = require("react-slct");
const menu_1 = require("./menu");
const title_1 = require("./menu/title");
const value_1 = require("./value/value");
const utils_1 = require("./utils");
const typings_1 = require("./typings");
exports.ReactTimebombProps = typings_1.ReactTimebombProps;
exports.ReactTimebombState = typings_1.ReactTimebombState;
exports.ReactTimebombError = typings_1.ReactTimebombError;
exports.ReactTimebombDate = typings_1.ReactTimebombDate;
exports.ReactTimebombArrowButtonProps = typings_1.ReactTimebombArrowButtonProps;
const value_multi_1 = require("./value/value-multi");
const Container = styled_components_1.default.div `
    width: 100%;
    height: 100%;
    position: relative;
`;
const MenuWrapper = styled_components_1.default.div `
    display: flex;
    width: 100%;
    flex-direction: column;
    border: 1px solid #ccc;
    box-sizing: border-box;
    padding: 0;
    background: white;
    z-index: 1;
    height: 100%;
    max-height: ${(props) => props.menuHeight}px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 13px;

    * {
        box-sizing: border-box;
    }

    ${(props) => props.mobile
    ? styled_components_1.css `
                  position: fixed;
                  left: 50% !important;
                  top: 50% !important;
                  max-width: 96%;
                  width: 360px !important;
                  height: 320px !important;
                  margin-left: -180px;
                  margin-top: -160px;
                  max-height: 100%;
                  font-size: 16px;
                  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);

                  @media (max-width: 360px) {
                      width: 100% !important;
                      left: 0 !important;
                      margin-left: 0;
                      max-width: 100%;
                  }
              `
    : ''}
`;
const BlindInput = styled_components_1.default.input `
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    pointer-events: none;
`;
class ReactTimebomb extends React.Component {
    constructor(props) {
        super(props);
        this.emitChange = (() => {
            let timeout;
            return (date, commit) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    const { value, showConfirm, onChange } = this.props;
                    if (!showConfirm) {
                        commit = true;
                    }
                    if (utils_1.dateEqual(value, date)) {
                        return;
                    }
                    if (commit) {
                        if (utils_1.isArray(date)) {
                            onChange(...date);
                        }
                        else {
                            onChange(date);
                        }
                    }
                    this.setState({ allowValidation: Boolean(date) });
                }, 0);
            };
        })();
        const { minDate, maxDate, selectRange, showConfirm } = props;
        if (minDate && maxDate && utils_1.isBefore(maxDate, minDate)) {
            throw new Error('minDate must appear before maxDate');
        }
        if (selectRange && !showConfirm) {
            throw new Error('when using `selectRange` please also set `showConfirm`');
        }
        this.state = this.initialState;
        this.onChangeValueText = this.onChangeValueText.bind(this);
        this.onValueSubmit = this.onValueSubmit.bind(this);
        this.onSelectDay = this.onSelectDay.bind(this);
        this.onModeDay = this.onModeDay.bind(this);
        this.onModeYear = this.onModeYear.bind(this);
        this.onModeMonth = this.onModeMonth.bind(this);
        this.onSelectMonth = this.onSelectMonth.bind(this);
        this.onChangeMonth = this.onChangeMonth.bind(this);
        this.onSelectYear = this.onSelectYear.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onNextMonth = this.onNextMonth.bind(this);
        this.onPrevMonth = this.onPrevMonth.bind(this);
        this.onSelectTime = this.onSelectTime.bind(this);
        this.onSubmitOrCancelTime = this.onSubmitOrCancelTime.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onClear = this.onClear.bind(this);
        this.onChangeFormatGroup = this.onChangeFormatGroup.bind(this);
        this.onMenuRef = this.onMenuRef.bind(this);
        this.onMobileMenuContainerClick = this.onMobileMenuContainerClick.bind(this);
    }
    /** @internal */
    static getDerivedStateFromProps(props) {
        const format = props.format;
        const { minDate, maxDate } = props;
        return {
            minDate: minDate ? utils_1.startOfDay(minDate) : undefined,
            maxDate: maxDate ? utils_1.endOfDay(maxDate) : undefined,
            showTime: utils_1.isTimeFormat(format),
            showDate: utils_1.isDateFormat(format)
        };
    }
    getMobileMenuContainer(MenuContainer) {
        if (!this.MobileMenuContainer) {
            this.MobileMenuContainer = styled_components_1.default(MenuContainer) `
                position: fixed;
                left: 0 !important;
                top: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                width: 100% !important;
                height: 100% !important;
                background: rgba(0, 0, 0, 0.12);
                transform: none;
            `;
        }
        return this.MobileMenuContainer;
    }
    get className() {
        const classNames = ['react-timebomb'];
        if (this.props.className) {
            classNames.push(this.props.className);
        }
        if (this.props.error) {
            classNames.push('error');
        }
        if (this.props.disabled) {
            classNames.push('disabled');
        }
        return classNames.join(' ');
    }
    get defaultDateValue() {
        const { value, minDate, maxDate } = this.props;
        if (value) {
            return value;
        }
        let date = new Date();
        if (maxDate && utils_1.isBefore(maxDate, date)) {
            date = maxDate;
        }
        else if (minDate && utils_1.isAfter(minDate, date)) {
            date = minDate;
        }
        return utils_1.startOfDay(date);
    }
    get initialState() {
        return {
            allowValidation: false,
            mode: utils_1.getFormatType(this.props.format),
            valueText: this.props.value
                ? utils_1.dateFormat(this.props.value, this.props.format)
                : undefined,
            date: this.defaultDateValue,
            selectedRange: 0,
            menuHeight: 0
        };
    }
    componentDidUpdate(prevProps, prevState) {
        const { valueText } = this.state;
        const { value, format } = this.props;
        if (prevProps.format !== format || prevProps.value !== value) {
            this.setState({
                valueText: value ? utils_1.dateFormat(value, format) : undefined
            });
        }
        if (prevState.valueText !== valueText) {
            this.valueTextDidUpdate(false);
        }
    }
    valueTextDidUpdate(commit) {
        const { valueText, allowValidation } = this.state;
        const { format } = this.props;
        const validDate = utils_1.validateDate(valueText, format);
        if (validDate) {
            this.setState({ allowValidation: true }, () => {
                const enabled = utils_1.isArray(validDate)
                    ? validDate.every(d => utils_1.isEnabled('day', d, this.props))
                    : utils_1.isEnabled('day', validDate, this.props);
                if (enabled) {
                    this.setState({ date: validDate }, () => this.emitChange(validDate, commit));
                }
                else {
                    this.emitError('outOfRange', valueText);
                }
            });
        }
        else if (valueText) {
            this.emitError('invalidDate', valueText);
        }
        else if (!utils_1.isUndefined(valueText) && allowValidation) {
            this.emitChange(undefined, commit);
        }
    }
    render() {
        const { placeholder, showConfirm, showCalendarWeek, selectWeek, selectRange, format, error, disabled, mobile, timeStep, onOpen } = this.props;
        const { showDate, showTime, valueText, mode, selectedRange, minDate, maxDate } = this.state;
        const value = valueText
            ? utils_1.validateDate(valueText, format)
            : this.props.value;
        const menuWidth = Math.max(ReactTimebomb.MENU_WIDTH, this.props.menuWidth || 0);
        const menuHeight = this.state.menuHeight || ReactTimebomb.MENU_HEIGHT;
        return (React.createElement(react_slct_1.Select, { value: value, placeholder: placeholder, error: error, onOpen: onOpen, onClose: this.onClose }, ({ placeholder, open, onToggle, onRef, MenuContainer }) => {
            const showMenu = open && (showDate || showTime) && !disabled;
            this.onToggle = onToggle;
            if (mobile) {
                MenuContainer = this.getMobileMenuContainer(MenuContainer);
            }
            return (React.createElement(Container, { ref: onRef, className: this.className },
                this.renderValue(value, placeholder, open),
                showMenu ? (React.createElement(MenuContainer, { menuWidth: menuWidth, menuHeight: menuHeight, onClick: mobile
                        ? this.onMobileMenuContainerClick
                        : undefined },
                    React.createElement(MenuWrapper, { className: "react-timebomb-menu", menuHeight: menuHeight, mobile: mobile, ref: this.onMenuRef },
                        React.createElement(title_1.MenuTitle, { mode: mode, mobile: mobile, date: this.state.date, minDate: minDate, maxDate: maxDate, selectedRange: selectedRange, showTime: showTime, showDate: showDate, onMonth: this.onModeMonth, onYear: this.onModeYear, onNextMonth: this.onNextMonth, onPrevMonth: this.onPrevMonth, onReset: this.onReset }),
                        React.createElement(menu_1.Menu, { showTime: showTime, showDate: showDate, showConfirm: showConfirm, showCalendarWeek: showCalendarWeek, selectWeek: selectWeek, selectRange: selectRange, timeStep: timeStep, date: this.state.date, value: value, valueText: valueText, format: format, mode: mode, mobile: mobile, minDate: minDate, maxDate: maxDate, selectedRange: selectedRange, onSelectDay: this.onSelectDay, onSelectMonth: this.onSelectMonth, onChangeMonth: this.onChangeMonth, onSelectYear: this.onSelectYear, onSelectTime: this.onSelectTime, onSubmitTime: this.onSubmitOrCancelTime, onSubmit: this.onValueSubmit })))) : (React.createElement(BlindInput, { type: "text", onFocus: onToggle }))));
        }));
    }
    renderValue(value, placeholder, open) {
        placeholder = open ? undefined : placeholder;
        const { minDate, maxDate, disabled, format, selectRange, mobile, timeStep, arrowButtonComponent } = this.props;
        const { showDate, showTime, allowValidation, mode } = this.state;
        if (selectRange || utils_1.isArray(value)) {
            const multiValue = value
                ? utils_1.isArray(value)
                    ? value
                    : [value]
                : undefined;
            return (React.createElement(value_multi_1.ValueMulti, { open: open, disabled: disabled, placeholder: placeholder, value: multiValue, arrowButtonComponent: arrowButtonComponent, onClear: this.onClear, onToggle: this.onToggle }));
        }
        return (React.createElement(value_1.Value, { mode: mode, disabled: disabled, mobile: mobile, placeholder: placeholder, format: format, value: value, minDate: minDate, maxDate: maxDate, allowValidation: allowValidation, open: open, showDate: showDate, showTime: showTime, timeStep: timeStep, arrowButtonComponent: arrowButtonComponent, onClear: this.onClear, onChangeValueText: this.onChangeValueText, onChangeFormatGroup: this.onChangeFormatGroup, onToggle: this.onToggle, onSubmit: this.onValueSubmit, onAllSelect: this.onModeDay }));
    }
    onClose() {
        utils_1.clearSelection();
        setTimeout(() => {
            utils_1.clearSelection();
            this.setState(this.initialState, () => {
                if (this.props.onClose) {
                    this.props.onClose();
                }
            });
        }, 16);
    }
    emitError(error, value) {
        if (this.state.allowValidation) {
            this.setState({ allowValidation: false }, () => {
                if (this.props.onError) {
                    this.props.onError(error, value);
                }
            });
        }
    }
    getSelectedRange(date) {
        if (utils_1.isArray(date)) {
            if (date.length === 2) {
                if (date[0] > date[1]) {
                    return 0;
                }
                else {
                    return 1;
                }
            }
            else if (date.length === 1) {
                return 0;
            }
        }
        else {
            return 0;
        }
        return this.state.selectedRange;
    }
    onClear() {
        this.setState({ valueText: undefined }, () => {
            this.emitChange(undefined, true);
        });
    }
    onChangeValueText(valueText) {
        this.setState({ valueText });
    }
    onChangeFormatGroup(format) {
        this.setState({ mode: format ? utils_1.getFormatType(format) : undefined });
    }
    onValueSubmit() {
        if (this.onToggle) {
            this.onToggle();
        }
        utils_1.clearSelection();
        this.valueTextDidUpdate(true);
    }
    onSelectDay(day) {
        const { value, format, selectWeek, selectRange } = this.props;
        const valueDate = value instanceof Date
            ? value
            : utils_1.isArray(value)
                ? value[0]
                : undefined;
        if (selectWeek) {
            const date = [utils_1.startOfWeek(day), utils_1.endOfWeek(day)];
            const valueText = utils_1.dateFormat(date, format);
            this.setState({ date, valueText });
            return;
        }
        const date = utils_1.setDate(day, valueDate ? valueDate.getHours() : 0, valueDate ? valueDate.getMinutes() : 0);
        if (selectRange) {
            const dateArr = utils_1.isArray(this.state.valueText) &&
                this.state.valueText.length === 1
                ? [
                    utils_1.validateDate(this.state.valueText[0], format),
                    date
                ]
                : [date];
            const selectedRange = this.getSelectedRange(dateArr);
            const valueText = utils_1.dateFormat(dateArr.sort(utils_1.sortDates), format);
            this.setState({ date: dateArr, valueText, selectedRange });
        }
        else {
            const valueText = utils_1.dateFormat(date, format);
            this.setState({ date, valueText });
        }
    }
    onModeDay() {
        this.setState({ mode: 'day' });
    }
    onModeYear() {
        this.setState({ mode: 'year' });
    }
    onModeMonth() {
        this.setState({ mode: 'month' });
    }
    onSelectMonth(date) {
        this.onSelectDay(date);
        this.setState({ mode: 'day' });
    }
    onChangeMonth(date) {
        this.setState({ date, mode: 'day' });
    }
    onSelectYear(date) {
        this.onSelectDay(date);
        this.setState({ mode: 'day' });
    }
    onReset() {
        this.setState({ date: this.defaultDateValue });
    }
    onNextMonth() {
        const currentDate = utils_1.isArray(this.state.date)
            ? this.state.date[this.state.selectedRange]
            : this.state.date;
        if (currentDate) {
            const date = new Date(currentDate);
            date.setMonth(date.getMonth() + 1);
            this.setState({ date });
        }
    }
    onPrevMonth() {
        const currentDate = utils_1.isArray(this.state.date)
            ? this.state.date[this.state.selectedRange]
            : this.state.date;
        if (currentDate) {
            const date = new Date(currentDate);
            date.setMonth(date.getMonth() - 1);
            this.setState({ date });
        }
    }
    onSelectTime(time, mode, commit = false) {
        const format = this.props.format;
        const value = this.props.value || new Date();
        const newDate = utils_1.isArray(value)
            ? value.map(d => utils_1.setDate(d, time.getHours(), time.getMinutes()))
            : utils_1.setDate(value, time.getHours(), time.getMinutes());
        const valueText = utils_1.dateFormat(newDate, format);
        this.setState({ mode, valueText }, () => this.emitChange(newDate, commit));
    }
    onSubmitOrCancelTime(time, mode) {
        if (time) {
            this.onSelectTime(time, mode, true);
        }
        if (this.onToggle) {
            this.onToggle();
        }
    }
    onMobileMenuContainerClick(e) {
        if (e.target instanceof HTMLDivElement &&
            e.target.classList.contains('react-slct-menu')) {
            if (this.onToggle) {
                this.onToggle();
            }
        }
    }
    onMenuRef(el) {
        if (el) {
            this.setState({ menuHeight: el.getBoundingClientRect().height });
        }
        else {
            this.setState({ menuHeight: 0 });
        }
    }
}
ReactTimebomb.MENU_WIDTH = 320;
ReactTimebomb.MENU_HEIGHT = 320;
/** @internal */
ReactTimebomb.defaultProps = {
    format: 'YYYY-MM-DD'
};
exports.ReactTimebomb = ReactTimebomb;
//# sourceMappingURL=index.js.map
});
___scope___.file("menu/index.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styled_components_1 = require("styled-components");
const utils_1 = require("../utils");
const button_1 = require("../components/button");
const table_1 = require("./table");
const mobile_1 = require("./mobile");
const time_1 = require("./time");
const MonthAndYearContainer = styled_components_1.default.div `
    display: flex;
    height: ${(props) => props.mobile ? '100%' : '220px'};
`;
const MonthsContainer = styled_components_1.default.div `
    display: flex;
    flex: 1;
    flex-direction: row;
    flex-wrap: wrap;
    align-self: flex-start;
    align-items: flex-start;
    padding: 10px;
    box-sizing: border-box;
    height: 100%;

    button {
        width: ${(props) => props.mobile ? 'calc(33% - 6px)' : '33%'};
        font-size: 16px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        min-height: 25%;
        border: none;
        margin: 0;
    }
`;
const MonthContainer = styled_components_1.default.div `
    flex: 1;
    padding: 0;
    height: ${(props) => (props.mobile ? '100' : 'auto')};
    overflow: hidden;
`;
const YearContainer = styled_components_1.default.div `
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    border-left: solid 1px #e6e6e6;
    padding: 10px;
    flex: 0 0 90px;

    button {
        width: 100%;
        font-size: 16px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        border: none;
        padding: 6px 0;
        margin: 0 0 4px;
        min-height: 46px;
    }
`;
const Confirm = styled_components_1.default.div `
    width: 100%;
    text-align: center;
    padding: 10px 0;

    button {
        padding: 3px 28px;
    }
`;
class Menu extends React.PureComponent {
    constructor(props) {
        super(props);
        this.yearContainer = null;
        this.scrollToYear = (() => {
            let timeout;
            return (delay) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    if (this.yearContainer) {
                        const selected = this.yearContainer.querySelector('.selected');
                        if (selected) {
                            selected.scrollIntoView();
                            if (this.yearContainer.scrollBy) {
                                this.yearContainer.scrollBy({ top: -10 });
                            }
                        }
                    }
                }, delay);
            };
        })();
        this.state = {};
        this.onSelectMonth = this.onSelectMonth.bind(this);
        this.onSelectYear = this.onSelectYear.bind(this);
        this.onYearContainer = this.onYearContainer.bind(this);
        this.onChangeMonth = this.onChangeMonth.bind(this);
        this.monthNames = utils_1.getMonthNames(true);
    }
    get now() {
        return new Date();
    }
    getDate(date) {
        return (utils_1.isArray(date) ? date[this.props.selectedRange] : date);
    }
    get fullYears() {
        const { value, minDate, maxDate } = this.props;
        const valueDate = this.getDate(value);
        const year = this.getDate(this.props.date).getFullYear();
        const getDateConfig = (date, newYear) => {
            date = new Date(date);
            date.setFullYear(newYear);
            const enabled = utils_1.isEnabled('year', date, this.props);
            const selected = year === newYear;
            if (value) {
                date.setSeconds(valueDate.getSeconds());
                date.setMinutes(valueDate.getMinutes());
                date.setHours(valueDate.getHours());
                date.setDate(valueDate.getDate());
                date.setMonth(valueDate.getMonth());
            }
            return { date, enabled, selected };
        };
        if (minDate && !maxDate) {
            const currentYear = minDate.getFullYear();
            return Array(120)
                .fill(undefined)
                .map((_, i) => getDateConfig(minDate, currentYear + i))
                .filter(obj => obj.enabled);
        }
        else if (!minDate && maxDate) {
            const currentYear = maxDate.getFullYear();
            return Array(120)
                .fill(undefined)
                .map((_, i) => getDateConfig(maxDate, currentYear - i))
                .filter(obj => obj.enabled)
                .reverse();
        }
        else if (minDate && maxDate) {
            const minYear = minDate.getFullYear();
            const maxYear = maxDate.getFullYear();
            const array = [];
            for (let i = maxYear; i >= minYear; i--) {
                array.push(getDateConfig(maxDate, i));
            }
            return array.reverse();
        }
        else {
            const now = this.now;
            const currentDate = valueDate > now ? valueDate : now;
            const currentYear = currentDate.getFullYear();
            return Array(120)
                .fill(undefined)
                .map((_, i) => {
                const date = new Date(currentDate);
                date.setFullYear(currentYear - i);
                const enabled = utils_1.isEnabled('year', date, this.props);
                const selected = year === date.getFullYear();
                return { date, enabled, selected };
            })
                .filter(obj => obj.enabled)
                .reverse();
        }
    }
    componentDidUpdate(prevProps) {
        if (!utils_1.dateEqual(prevProps.date, this.props.date)) {
            this.scrollToYear(64);
        }
    }
    render() {
        const { mode, mobile, showDate, showConfirm, showTime } = this.props;
        if (showDate || showTime) {
            switch (mode) {
                case 'year':
                case 'month':
                    return (React.createElement(MonthAndYearContainer, { mobile: mobile },
                        this.renderMenuMonths(),
                        this.renderMenuYear()));
                case 'day':
                case 'hour':
                case 'minute':
                case 'second':
                    return (React.createElement(MonthContainer, { mobile: mobile },
                        showDate && this.renderMonth(),
                        showTime && this.renderTime(),
                        showConfirm && this.renderConfirm()));
            }
        }
        return null;
    }
    renderMenuYear() {
        return (React.createElement(YearContainer, { ref: this.onYearContainer, className: "years" }, this.fullYears
            .map(({ date, selected }) => {
            const fullYear = date.getFullYear();
            const dateStr = date.toISOString();
            return (React.createElement(button_1.Button, { key: dateStr, tabIndex: -1, className: selected ? 'selected' : undefined, selected: selected, mobile: this.props.mobile, "data-date": dateStr, onClick: this.onSelectYear }, fullYear));
        })
            .reverse()));
    }
    renderMenuMonths() {
        const { value, mobile } = this.props;
        const valueDate = this.getDate(value);
        const date = this.getDate(this.props.date);
        const month = value && valueDate.getMonth();
        const year = value && valueDate.getFullYear();
        return (React.createElement(MonthsContainer, { mobile: mobile, className: "months" }, this.monthNames.map((str, i) => {
            const newDate = new Date(date);
            newDate.setMonth(i);
            const enabled = utils_1.isEnabled('month', newDate, this.props);
            const selected = month === newDate.getMonth() &&
                year === newDate.getFullYear();
            return (React.createElement(button_1.Button, { key: str, tabIndex: -1, className: selected ? 'selected' : undefined, selected: selected, disabled: !enabled, mobile: this.props.mobile, "data-date": newDate.toISOString(), onClick: this.onSelectMonth }, str));
        })));
    }
    renderMonth() {
        const { mobile } = this.props;
        if (mobile) {
            return (React.createElement(mobile_1.GestureWrapper, { onChangeMonth: this.onChangeMonth },
                React.createElement(table_1.MenuTable, { date: utils_1.subtractMonths(this.getDate(this.props.date), 1), minDate: this.props.minDate, maxDate: this.props.maxDate, mobile: this.props.mobile, selectRange: this.props.selectRange, selectedRange: this.props.selectedRange, selectWeek: this.props.selectWeek, showCalendarWeek: this.props.showCalendarWeek, showConfirm: this.props.showConfirm, showTime: this.props.showTime, value: utils_1.subtractMonths(this.getDate(this.props.value), 1), onSubmit: this.props.onSubmit, onSelectDay: this.props.onSelectDay }),
                React.createElement(table_1.MenuTable, { date: this.props.date, minDate: this.props.minDate, maxDate: this.props.maxDate, mobile: this.props.mobile, selectRange: this.props.selectRange, selectedRange: this.props.selectedRange, selectWeek: this.props.selectWeek, showCalendarWeek: this.props.showCalendarWeek, showConfirm: this.props.showConfirm, showTime: this.props.showTime, value: this.props.value, onSubmit: this.props.onSubmit, onSelectDay: this.props.onSelectDay }),
                React.createElement(table_1.MenuTable, { date: utils_1.addMonths(this.getDate(this.props.date), 1), minDate: this.props.minDate, maxDate: this.props.maxDate, mobile: this.props.mobile, selectRange: this.props.selectRange, selectedRange: this.props.selectedRange, selectWeek: this.props.selectWeek, showCalendarWeek: this.props.showCalendarWeek, showConfirm: this.props.showConfirm, showTime: this.props.showTime, value: utils_1.addMonths(this.getDate(this.props.value), 1), onSubmit: this.props.onSubmit, onSelectDay: this.props.onSelectDay })));
        }
        return (React.createElement(table_1.MenuTable, { date: this.props.date, minDate: this.props.minDate, maxDate: this.props.maxDate, mobile: this.props.mobile, selectRange: this.props.selectRange, selectedRange: this.props.selectedRange, selectWeek: this.props.selectWeek, showCalendarWeek: this.props.showCalendarWeek, showConfirm: this.props.showConfirm, showTime: this.props.showTime, value: this.props.value, onSubmit: this.props.onSubmit, onSelectDay: this.props.onSelectDay }));
    }
    renderTime() {
        return (React.createElement(time_1.MenuTime, { date: this.props.date, timeStep: this.props.timeStep, topDivider: this.props.showDate, onChange: this.props.onSelectTime, onSubmit: this.props.onSubmitTime, onCancel: this.props.onSubmitTime }));
    }
    renderConfirm() {
        const { valueText, format } = this.props;
        const validDate = utils_1.validateDate(valueText, format);
        const isValid = validDate
            ? utils_1.isArray(validDate)
                ? validDate.every(v => utils_1.isEnabled('day', v, this.props))
                : utils_1.isEnabled('day', validDate, this.props)
            : false;
        return (React.createElement(Confirm, null,
            React.createElement(button_1.Button, { tabIndex: -1, disabled: !isValid, mobile: this.props.mobile, onClick: () => this.props.onSubmit() }, "Ok")));
    }
    onSelectMonth(e) {
        const date = new Date(utils_1.getAttribute(e.currentTarget, 'data-date'));
        setTimeout(() => this.props.onSelectMonth(date), 0);
    }
    onSelectYear(e) {
        const date = new Date(utils_1.getAttribute(e.currentTarget, 'data-date'));
        setTimeout(() => this.props.onSelectYear(date), 0);
    }
    onYearContainer(el) {
        this.yearContainer = el;
        this.scrollToYear(0);
    }
    onChangeMonth(direction) {
        const { onChangeMonth } = this.props;
        const date = this.getDate(this.props.date);
        switch (direction) {
            case 'next':
                onChangeMonth(utils_1.addMonths(date, 1));
                break;
            case 'prev':
                onChangeMonth(utils_1.subtractMonths(date, 1));
                break;
        }
    }
}
exports.Menu = Menu;
//# sourceMappingURL=index.js.map
});
___scope___.file("utils.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const moment_1 = require("moment");
const momentImport = require("moment");
const moment = moment_1.default || momentImport;
exports.formatSplitExpr = /[.|:|\-|\\|_|\s]/;
function dateFormat(date, format) {
    if (isArray(date)) {
        return date.map(date => moment(date).format(format));
    }
    else {
        return moment(date).format(format);
    }
}
exports.dateFormat = dateFormat;
function validateDate(date, format) {
    if (isArray(date)) {
        const dates = date
            .map(date => {
            const instance = moment(date, format, true);
            return instance.isValid() ? instance.toDate() : undefined;
        })
            .filter(d => Boolean(d));
        return dates.length === 0 ? undefined : dates;
    }
    else {
        const instance = moment(date, format, true);
        return instance.isValid() ? instance.toDate() : undefined;
    }
}
exports.validateDate = validateDate;
function getFormatType(format) {
    if (/^D/.test(format)) {
        return 'day';
    }
    if (/^M/.test(format)) {
        return 'month';
    }
    if (/^Y/.test(format)) {
        return 'year';
    }
    if (/^H/.test(format)) {
        return 'hour';
    }
    if (/^m/.test(format)) {
        return 'minute';
    }
    if (/^s/.test(format)) {
        return 'second';
    }
    return undefined;
}
exports.getFormatType = getFormatType;
function formatIsActualNumber(format) {
    // day / year
    if (/D|Y|H|m|s/.test(format)) {
        return true;
    }
    // month
    if (format === 'M' || format === 'MM') {
        return true;
    }
    return false;
}
exports.formatIsActualNumber = formatIsActualNumber;
/** @return returns a string with transformed value, true for valid input or false for invalid input */
function validateFormatGroup(input, format) {
    const formatType = getFormatType(format);
    return validateFormatType(input, formatType);
}
exports.validateFormatGroup = validateFormatGroup;
/** @return returns a string with transformed value, true for valid input or false for invalid input */
function validateFormatType(input, formatType) {
    if (isFinite(input)) {
        const int = typeof input === 'string' ? parseInt(input, 10) : input;
        const char = String(input);
        const strLen = char.length;
        switch (formatType) {
            case 'day':
                if (strLen === 1) {
                    if (int >= 0 && int <= 3) {
                        return true;
                    }
                    else {
                        return `0${input}`;
                    }
                }
                if (strLen === 2 && int >= 1 && int <= 31) {
                    return true;
                }
                break;
            case 'month':
                if (strLen === 1) {
                    if (int === 0 || int === 1) {
                        return true;
                    }
                    else {
                        return `0${input}`;
                    }
                }
                if (strLen === 2 && int >= 0 && int <= 12) {
                    return true;
                }
                break;
            case 'year':
                if (strLen === 1 && (int === 1 || int === 2)) {
                    return true;
                }
                if (strLen >= 2 &&
                    (char.startsWith('19') || char.startsWith('20'))) {
                    return true;
                }
                break;
            case 'hour':
                if (strLen === 1) {
                    if (int >= 0 && int <= 2) {
                        return true;
                    }
                    else {
                        return `0${input}`;
                    }
                }
                if (strLen >= 2 && int >= 0 && int <= 24) {
                    return true;
                }
                break;
            case 'minute':
            case 'second':
                if (strLen === 1) {
                    if (int >= 0 && int <= 5) {
                        return true;
                    }
                    else {
                        return `0${input}`;
                    }
                }
                if (strLen >= 2 && int >= 0 && int <= 59) {
                    return true;
                }
                break;
        }
    }
    return false;
}
exports.validateFormatType = validateFormatType;
const ALLOWED_CHARS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
function stringFromCharCode(keyCode) {
    const charCode = keyCode - 48 * Math.floor(keyCode / 48);
    const char = String.fromCharCode(96 <= keyCode ? charCode : keyCode);
    if (ALLOWED_CHARS.includes(char)) {
        return char;
    }
    return '';
}
exports.stringFromCharCode = stringFromCharCode;
function formatNumber(number) {
    if (number <= 1) {
        return '01';
    }
    if (number <= 9) {
        return `0${number}`;
    }
    return String(number);
}
exports.formatNumber = formatNumber;
function formatNumberRaw(number) {
    if (number <= 9) {
        return `0${number || 0}`;
    }
    return String(number);
}
exports.formatNumberRaw = formatNumberRaw;
function splitDate(date, format) {
    const formattedDate = dateFormat(date, format);
    return formattedDate
        .split(exports.formatSplitExpr)
        .filter(group => group && exports.formatSplitExpr.test(group) === false);
}
exports.splitDate = splitDate;
function joinDates(parts, format) {
    const strParts = parts
        .map(part => (part instanceof HTMLElement ? part.innerText : part))
        .filter(val => val);
    const splittedFormat = format.split(exports.formatSplitExpr);
    if (strParts.length !== splittedFormat.length) {
        return '';
    }
    const date = strParts.join(' ');
    const spaceFormat = splittedFormat.join(' ');
    const momentDate = moment(date, spaceFormat);
    const parsingFlags = momentDate.parsingFlags();
    if (parsingFlags.overflow === 2) {
        return moment(
        // @ts-ignore
        new Date(...parsingFlags.parsedDateParts)).format(format);
    }
    return momentDate.format(format);
}
exports.joinDates = joinDates;
function clearSelection() {
    const sel = getSelection();
    if (sel.empty) {
        // Chrome
        sel.empty();
    }
    else if (sel.removeAllRanges) {
        // Firefox
        sel.removeAllRanges();
    }
}
exports.clearSelection = clearSelection;
function selectElement(el, caret) {
    if (el) {
        const range = document.createRange();
        const sel = getSelection();
        if (caret === undefined) {
            range.selectNodeContents(el);
        }
        else {
            const [start, end] = caret;
            range.setStart(el, start);
            range.setEnd(el, end);
        }
        sel.removeAllRanges();
        sel.addRange(range);
    }
}
exports.selectElement = selectElement;
function getWeekOfYear(date) {
    return moment(date).isoWeek();
}
exports.getWeekOfYear = getWeekOfYear;
function startOfWeek(date) {
    return moment(date)
        .startOf('isoWeek')
        .toDate();
}
exports.startOfWeek = startOfWeek;
function endOfWeek(date) {
    return moment(date)
        .endOf('isoWeek')
        .toDate();
}
exports.endOfWeek = endOfWeek;
function startOfDay(date) {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
}
exports.startOfDay = startOfDay;
function endOfDay(date) {
    const newDate = new Date(date);
    newDate.setHours(23, 59, 59, 999);
    return newDate;
}
exports.endOfDay = endOfDay;
function addDays(date, num) {
    return moment(date)
        .add(num, 'days')
        .toDate();
}
exports.addDays = addDays;
function addMonths(date, num) {
    return moment(date)
        .add(num, 'months')
        .toDate();
}
exports.addMonths = addMonths;
function addYears(date, num) {
    return moment(date)
        .add(num, 'years')
        .toDate();
}
exports.addYears = addYears;
function addHours(date, num) {
    return moment(date)
        .add(num, 'hours')
        .toDate();
}
exports.addHours = addHours;
function addMinutes(date, num) {
    return moment(date)
        .add(num, 'minutes')
        .toDate();
}
exports.addMinutes = addMinutes;
function addSeconds(date, num) {
    return moment(date)
        .add(num, 'seconds')
        .toDate();
}
exports.addSeconds = addSeconds;
function subtractSeconds(date, num) {
    return moment(date)
        .subtract(num, 'seconds')
        .toDate();
}
exports.subtractSeconds = subtractSeconds;
function subtractMinutes(date, num) {
    return moment(date)
        .subtract(num, 'minutes')
        .toDate();
}
exports.subtractMinutes = subtractMinutes;
function subtractHours(date, num) {
    return moment(date)
        .subtract(num, 'hours')
        .toDate();
}
exports.subtractHours = subtractHours;
function subtractDays(date, num) {
    return moment(date)
        .subtract(num, 'days')
        .toDate();
}
exports.subtractDays = subtractDays;
function subtractMonths(date, num) {
    return moment(date)
        .subtract(num, 'months')
        .toDate();
}
exports.subtractMonths = subtractMonths;
function subtractYears(date, num) {
    return moment(date)
        .subtract(num, 'years')
        .toDate();
}
exports.subtractYears = subtractYears;
function manipulateDate(date, formatType, direction, timeStep) {
    switch (formatType) {
        case 'day':
            if (direction === 'add')
                return addDays(date, 1);
            if (direction === 'subtract')
                return subtractDays(date, 1);
            break;
        case 'month':
            if (direction === 'add')
                return addMonths(date, 1);
            if (direction === 'subtract')
                return subtractMonths(date, 1);
            break;
        case 'year':
            if (direction === 'add')
                return addYears(date, 1);
            if (direction === 'subtract')
                return subtractYears(date, 1);
            break;
        case 'hour':
            if (direction === 'add')
                return addHours(date, 1);
            if (direction === 'subtract')
                return subtractHours(date, 1);
            break;
        case 'minute':
            if (direction === 'add')
                return addMinutes(date, timeStep || 1);
            if (direction === 'subtract')
                return subtractMinutes(date, timeStep || 1);
            break;
        case 'second':
            if (direction === 'add')
                return addSeconds(date, timeStep || 1);
            if (direction === 'subtract')
                return subtractSeconds(date, timeStep || 1);
            break;
    }
    return new Date();
}
exports.manipulateDate = manipulateDate;
function startOfMonth(date) {
    const newDate = new Date(date);
    newDate.setDate(1);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
}
exports.startOfMonth = startOfMonth;
function endOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}
exports.endOfMonth = endOfMonth;
function isUndefined(val) {
    return val === null || val === undefined;
}
exports.isUndefined = isUndefined;
function setDate(date, hour, min) {
    const newDate = new Date(date);
    newDate.setHours(hour, min);
    return newDate;
}
exports.setDate = setDate;
function isToday(date) {
    return moment(date).isSame(new Date(), 'day');
}
exports.isToday = isToday;
function isBefore(date, inp) {
    return moment(date).isBefore(inp, 'day');
}
exports.isBefore = isBefore;
function isAfter(date, inp) {
    return moment(date).isAfter(inp, 'day');
}
exports.isAfter = isAfter;
function isBetween(date, cmpDateA, cmpDateB, context = 'day') {
    return moment(date).isBetween(cmpDateA, cmpDateB, context, '[]');
}
exports.isBetween = isBetween;
function dateEqual(dateA, dateB, considerTime = false) {
    if (!dateA || !dateB) {
        return false;
    }
    if (considerTime) {
        if (isArray(dateA)) {
            dateA = dateA.map(startOfDay);
        }
        else {
            dateA = startOfDay(dateA);
        }
        if (isArray(dateB)) {
            dateB = dateB.map(startOfDay);
        }
        else {
            dateB = startOfDay(dateB);
        }
    }
    if (isArray(dateA) && isArray(dateB)) {
        return dateA.every((date, i) => {
            const dBi = dateB[i];
            if (date && dBi) {
                return date.getTime() === dBi.getTime();
            }
            return false;
        });
    }
    else if (isArray(dateA) && dateB instanceof Date) {
        return dateA.some(d => d.getTime() === dateB.getTime());
    }
    else if (isArray(dateB) && dateA instanceof Date) {
        return dateB.some(d => d.getTime() === dateA.getTime());
    }
    else if (!isArray(dateA) && !isArray(dateB)) {
        return dateA.getTime() === dateB.getTime();
    }
    return false;
}
exports.dateEqual = dateEqual;
function getMonthNames(short) {
    if (short) {
        return moment.monthsShort();
    }
    return moment.months();
}
exports.getMonthNames = getMonthNames;
function getWeekdayNames() {
    return moment.weekdaysShort();
}
exports.getWeekdayNames = getWeekdayNames;
function isEnabled(context, date, { minDate, maxDate }) {
    if (!minDate && !maxDate) {
        return true;
    }
    if (minDate && !maxDate) {
        return moment(date).isSameOrAfter(minDate, context);
    }
    if (!minDate && maxDate) {
        return moment(date).isSameOrBefore(maxDate, context);
    }
    return isBetween(date, minDate, maxDate, context);
}
exports.isEnabled = isEnabled;
function getAttribute(input, attr) {
    return input.getAttribute(attr);
}
exports.getAttribute = getAttribute;
function isDateFormat(format) {
    return Boolean(/D|M|Y/.test(format));
}
exports.isDateFormat = isDateFormat;
function isTimeFormat(format) {
    return Boolean(/H|h|m|k|a|S|s/.test(format));
}
exports.isTimeFormat = isTimeFormat;
function sortDates(a, b) {
    return a.getTime() - b.getTime();
}
exports.sortDates = sortDates;
function isArray(val) {
    return Array.isArray(val);
}
exports.isArray = isArray;
function fillZero(value, formatType) {
    value = String(value);
    switch (formatType) {
        case 'day':
            if (value === '1' || value === '2' || value === '3') {
                return `0${value}`;
            }
            break;
        case 'month':
            if (value === '1') {
                return `0${value}`;
            }
            break;
    }
    return undefined;
}
exports.fillZero = fillZero;
function replaceSpaceWithNbsp(str) {
    if (!str) {
        return str;
    }
    return str.replace(' ', ' ');
}
exports.replaceSpaceWithNbsp = replaceSpaceWithNbsp;
exports.keys = {
    ARROW_UP: 38,
    ARROW_RIGHT: 39,
    ARROW_DOWN: 40,
    ARROW_LEFT: 37,
    ENTER: 13,
    TAB: 9,
    ESC: 27,
    BACKSPACE: 8,
    DELETE: 46,
    SPACE: 32,
    SHIFT: 16,
    DOT: 190,
    COMMA: 188
};
//# sourceMappingURL=react-timebomb.js.map?tm=1549459361115
});
___scope___.file("components/button.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const React = require("react");
const styled_components_1 = require("styled-components");
const StyledButton = styled_components_1.default.button `
    margin-right: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 3px 6px;
    min-height: 21px;
    box-sizing: border-box;
    background: ${(props) => (props.selected ? '#ccc' : '#fff')};

    ${(props) => props.mobile
    ? styled_components_1.css `
                  font-size: 16px;
                  margin-right: 6px;
                  padding: 6px 12px;
              `
    : ''}

    &:focus {
        outline: none;
    }

    &:disabled {
        cursor: not-allowed;
    }

    &:not(:disabled) {
        cursor: pointer;
    }

    &:not(:disabled):hover {
        background-color: ${(props) => props.selected ? '#ccc' : '#efefef'};
    }

    &:last-child {
        margin-right: 0;
    }
`;
exports.Button = (props) => (React.createElement(StyledButton, Object.assign({ "data-react-timebomb-selectable": true, "data-role": "button", type: "button" }, props)));
exports.SmallButton = styled_components_1.default(exports.Button) `
    font-size: 13px;
    color: #ccc;
    cursor: pointer;
    border: none;
    line-height: 1;

    &:hover:not(:disabled) {
        color: #333;
    }

    &:focus {
        outline: none;
    }
`;
exports.ArrowButton = (props) => (React.createElement(exports.SmallButton, { className: "react-timebomb-arrow", disabled: props.disabled, tabIndex: -1 }, props.open ? '▲' : '▼'));
//# sourceMappingURL=button.js.map
});
___scope___.file("menu/table.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const utils_1 = require("../utils");
const styled_components_1 = require("styled-components");
const day_1 = require("./day");
const Table = styled_components_1.default.table `
    width: 100%;
    height: 100%;
    font-size: inherit;
    user-select: none;
    padding: 5px 10px;
    box-sizing: border-box;

    td.calendar-week {
        color: #aaa;
    }

    th.calendar-week {
        text-align: left;
        color: #aaa;
    }

    tr {
        ${(props) => props.selectWeek
    ? styled_components_1.css `
                      &:hover {
                          cursor: pointer;

                          td.day {
                              background-color: #eee;
                          }
                      }
                  `
    : ''};

        th {
            padding: 3px 2px;
            width: 14.285714286%;
        }

        td {
            width: 14.285714286%;
        }
    }
`;
class MenuTable extends React.PureComponent {
    constructor(props) {
        super(props);
        this.monthMatrixCache = new Map();
        this.state = {};
        this.weekdayNames = utils_1.getWeekdayNames();
        this.onSelectDay = this.onSelectDay.bind(this);
        this.onDayMouseEnter = this.onDayMouseEnter.bind(this);
        this.onDayMouseLeave = this.onDayMouseLeave.bind(this);
    }
    get monthMatrix() {
        const date = this.getDate(this.props.date);
        const dateMonth = date.getMonth();
        const dateYear = date.getFullYear();
        // cache
        const cacheKey = `${dateMonth}-${dateYear}`;
        const cached = this.monthMatrixCache.get(cacheKey);
        if (cached) {
            return cached;
        }
        // generate
        const weeks = [];
        let base = utils_1.startOfMonth(date);
        let week = 0;
        while (utils_1.startOfWeek(base).getMonth() === dateMonth ||
            utils_1.endOfWeek(base).getMonth() === dateMonth) {
            const weekStart = utils_1.startOfWeek(new Date(dateYear, dateMonth, week++ * 7 + 1));
            weeks.push([
                weekStart,
                utils_1.addDays(weekStart, 1),
                utils_1.addDays(weekStart, 2),
                utils_1.addDays(weekStart, 3),
                utils_1.addDays(weekStart, 4),
                utils_1.addDays(weekStart, 5),
                utils_1.addDays(weekStart, 6)
            ]);
            base = utils_1.addDays(base, 7);
        }
        this.monthMatrixCache.set(cacheKey, weeks);
        return weeks;
    }
    render() {
        const { showCalendarWeek, selectWeek, mobile } = this.props;
        const { hoverDay } = this.state;
        const [sun, mon, tue, wed, thu, fri, sat] = this.weekdayNames;
        return (React.createElement(Table, { className: "month", selectWeek: selectWeek, mobile: mobile, cellSpacing: 0, cellPadding: 0 },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    showCalendarWeek && React.createElement("th", { className: "calendar-week" }),
                    React.createElement("th", null, mon),
                    React.createElement("th", null, tue),
                    React.createElement("th", null, wed),
                    React.createElement("th", null, thu),
                    React.createElement("th", null, fri),
                    React.createElement("th", null, sat),
                    React.createElement("th", null, sun))),
            React.createElement("tbody", null, this.monthMatrix.map(dates => {
                const weekNum = utils_1.getWeekOfYear(dates[0]);
                return (React.createElement("tr", { key: weekNum },
                    showCalendarWeek && (React.createElement("td", { className: "calendar-week" },
                        React.createElement(day_1.WeekNum, { day: dates[0], onClick: this.onSelectDay }, weekNum))),
                    dates.map(date => (React.createElement("td", { className: "day", key: date.toISOString() },
                        React.createElement(day_1.Day, { day: date, hoverDay: hoverDay, date: this.props.date, value: this.props.value, minDate: this.props.minDate, maxDate: this.props.maxDate, selectWeek: this.props.selectWeek, selectRange: this.props.selectRange, showTime: this.props.showTime, onSelectDay: this.onSelectDay, onMouseEnter: this.onDayMouseEnter, onMouseLeave: this.onDayMouseLeave }))))));
            }))));
    }
    getDate(date) {
        return (utils_1.isArray(date) ? date[this.props.selectedRange] : date);
    }
    onSelectDay(date) {
        const { onSelectDay, showConfirm, onSubmit } = this.props;
        onSelectDay(date);
        if (!showConfirm) {
            onSubmit();
        }
    }
    onDayMouseEnter(day) {
        if (this.props.selectRange) {
            this.setState({ hoverDay: day });
        }
    }
    onDayMouseLeave() {
        if (this.props.selectRange) {
            this.setState({ hoverDay: undefined });
        }
    }
}
exports.MenuTable = MenuTable;
//# sourceMappingURL=table.js.map
});
___scope___.file("menu/day.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const utils_1 = require("../utils");
const styled_components_1 = require("styled-components");
const Flex = styled_components_1.default.div `
    display: flex;
    align-items: center;
`;
const StyledDay = styled_components_1.default(Flex) `
    padding: 8px 2px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: ${(props) => (props.current ? 'inherit' : '#aaa')};
    background-color: ${(props) => props.selected
    ? '#ddd'
    : props.today
        ? 'rgba(172, 206, 247, 0.4)'
        : 'transparent'};
    font-weight: ${(props) => props.selected ? 'bold' : 'normal'};
    pointer-events: ${(props) => props.disabled ? 'none' : 'auto'};
    user-select: none;
    opacity: ${(props) => (props.disabled ? 0.3 : 1)};

    &:hover {
        background-color: ${(props) => props.selected ? '#ddd' : '#eee'};
    }
`;
class Day extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            current: false,
            enabled: true,
            today: false,
            selected: false
        };
        this.onSelectDay = this.onSelectDay.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }
    get selected() {
        const { value, selectWeek, selectRange, hoverDay, day } = this.props;
        if (value) {
            if (selectWeek) {
                const dayWeekOfYear = utils_1.getWeekOfYear(day);
                if (utils_1.isArray(value)) {
                    return value.some(v => utils_1.getWeekOfYear(v) === dayWeekOfYear);
                }
                return utils_1.getWeekOfYear(value) === dayWeekOfYear;
            }
            if (selectRange && utils_1.isArray(value)) {
                const [minDate, maxDate] = value;
                if (value.length === 1 && hoverDay) {
                    return utils_1.isEnabled('day', day, {
                        minDate: minDate < hoverDay ? minDate : hoverDay,
                        maxDate: minDate > hoverDay ? minDate : hoverDay
                    });
                }
                if (value.length === 2) {
                    return utils_1.isEnabled('day', day, {
                        minDate,
                        maxDate
                    });
                }
            }
        }
        return utils_1.dateEqual(value, day, this.props.showTime);
    }
    get current() {
        const { day, date } = this.props;
        const dayMonth = day.getMonth();
        if (utils_1.isArray(date)) {
            return date.some(d => d.getMonth() === dayMonth);
        }
        if (date) {
            return dayMonth === date.getMonth();
        }
        return false;
    }
    get enabled() {
        return utils_1.isEnabled('day', this.props.day, this.props);
    }
    get today() {
        return utils_1.isToday(this.props.day);
    }
    componentDidMount() {
        this.updateState();
    }
    componentDidUpdate(prevProps) {
        this.updateState(prevProps);
    }
    render() {
        const { day } = this.props;
        const { selected, current, enabled, today } = this.state;
        return (React.createElement(StyledDay, { className: selected ? 'value selected' : 'value', selected: selected, current: current, disabled: !enabled, today: today, onClick: this.onSelectDay, onMouseEnter: this.onMouseEnter, onMouseLeave: this.onMouseLeave }, day.getDate()));
    }
    updateState(prevProps = {}) {
        const { day, minDate, maxDate } = this.props;
        const dayChanged = !utils_1.dateEqual(prevProps.day, day);
        const minMaxChanged = !utils_1.dateEqual(prevProps.minDate, minDate) ||
            !utils_1.dateEqual(prevProps.maxDate, maxDate);
        this.setState({
            current: this.current,
            enabled: dayChanged || minMaxChanged ? this.enabled : this.state.enabled,
            today: dayChanged ? this.today : this.state.today,
            selected: this.selected
        });
    }
    onSelectDay() {
        this.props.onSelectDay(this.props.day);
    }
    onMouseEnter() {
        this.props.onMouseEnter(this.props.day);
    }
    onMouseLeave() {
        this.props.onMouseLeave(this.props.day);
    }
}
exports.Day = Day;
class WeekNum extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    render() {
        return React.createElement("div", { onClick: this.onClick }, this.props.children);
    }
    onClick() {
        this.props.onClick(this.props.day);
    }
}
exports.WeekNum = WeekNum;
//# sourceMappingURL=day.js.map
});
___scope___.file("menu/mobile.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_with_gesture_1 = require("react-with-gesture");
const styled_components_1 = require("styled-components");
const MobileMenuTableWrapper = styled_components_1.default.div `
    display: flex;
    width: 300%;
    position: relative;
    left: -100%;
    transition: ${(props) => props.animate ? 'transform 0.15s ease-out' : 'none'};
`;
let GestureWrapper = class GestureWrapper extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidUpdate(prevProps) {
        const props = this.props;
        if (prevProps.down && !props.down) {
            const [xDir] = props.direction;
            let x = '';
            let direction;
            if (xDir > 0) {
                x = '33.3%';
                direction = 'prev';
            }
            else if (xDir < 0) {
                x = '-33.3%';
                direction = 'next';
            }
            if (x && direction) {
                this.setState({ x, cooldown: true }, () => {
                    setTimeout(() => {
                        this.setState({ x: undefined }, () => {
                            this.props.onChangeMonth(direction);
                            this.setState({ cooldown: false });
                        });
                    }, 167);
                });
            }
        }
    }
    render() {
        const props = this.props;
        const { x, cooldown } = this.state;
        const [deltaX] = props.delta;
        const translateX = x || `${props.down ? deltaX : 0}px`;
        if (cooldown && props.cancel) {
            props.cancel();
        }
        return (React.createElement(MobileMenuTableWrapper, { animate: Boolean(x), style: { transform: `translateX(${translateX})` } }, props.children));
    }
};
GestureWrapper = __decorate([
    react_with_gesture_1.withGesture({ mouse: false }),
    __metadata("design:paramtypes", [Object])
], GestureWrapper);
exports.GestureWrapper = GestureWrapper;
//# sourceMappingURL=mobile.js.map
});
___scope___.file("menu/time.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styled_components_1 = require("styled-components");
const utils_1 = require("../utils");
const number_input_1 = require("../components/number-input");
const Container = styled_components_1.default.div `
    padding: 0;
    display: flex;
    align-items: center;
    margin: 0 auto;
    width: 100%;
    border-top: ${(props) => props.topDivider ? '1px solid #ccc' : 'none'};

    &:not(:last-child) {
        border-bottom: 1px solid #ccc;
    }
`;
const Divider = styled_components_1.default.span `
    margin: 0 5px;
    font-weight: bold;
`;
class MenuTime extends React.PureComponent {
    render() {
        const { date, timeStep, topDivider, onChange, onSubmit, onCancel } = this.props;
        if (utils_1.isArray(date) || !date) {
            return null;
        }
        return (React.createElement(Container, { topDivider: topDivider, className: "react-timebomb-time" },
            React.createElement(number_input_1.NumberInput, { date: date, step: 1, mode: "hour", onChange: onChange, onSubmit: onSubmit, onCancel: onCancel }),
            React.createElement(Divider, { className: "divider" }, ":"),
            React.createElement(number_input_1.NumberInput, { date: date, step: timeStep, mode: "minute", onChange: onChange, onSubmit: onSubmit, onCancel: onCancel })));
    }
}
exports.MenuTime = MenuTime;
//# sourceMappingURL=time.js.map
});
___scope___.file("components/number-input.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styled_components_1 = require("styled-components");
const utils_1 = require("../utils");
const Steps = styled_components_1.default.div `
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 0;
    top: 0;
    width: 24px;
    height: 100%;
    border-width: 0 1px;
    border-style: solid;
    border-color: #ccc;
    visibility: hidden;
`;
const Step = styled_components_1.default.button `
    margin: 0;
    padding: 0;
    line-height: 1;
    border: none;
    flex: 1;
    font-size: 8px;
    color: #ccc;
    cursor: pointer;
    -webkit-appearance: none;

    &:focus {
        outline: none;
    }

    &:hover {
        background: #eee;
        color: #000;
    }
`;
const InputContainer = styled_components_1.default.div `
    position: relative;
    flex: 1;
    display: flex;

    &:hover {
        ${Steps} {
            visibility: visible;
        }
    }

    &:last-child {
        ${Steps} {
            border-right: none;
        }
    }
`;
const Input = styled_components_1.default.input `
    flex: 1;
    padding: 0 25px 0 6px;
    margin: 0;
    width: 50%;
    min-height: 32px;
    text-align: center;
    border: none;

    // @see https://stackoverflow.com/a/4298216/1138860
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        /* display: none; <- Crashes Chrome on hover */
        -webkit-appearance: none;
        margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
    }

    &:focus {
        outline: none;
    }

    &:focus {
        background: #eee;

        + ${Steps} {
            visibility: visible;
        }
    }
`;
class NumberInput extends React.PureComponent {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.state = {};
        this.onChange = this.onChange.bind(this);
        this.onFocusIn = this.onFocusIn.bind(this);
        this.onFocusOut = this.onFocusOut.bind(this);
        this.onStepUp = this.onStepUp.bind(this);
        this.onStepDown = this.onStepDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
    }
    get renderedValue() {
        if (this.state.focused) {
            return this.state.value;
        }
        else {
            return isFinite(this.state.value)
                ? utils_1.formatNumberRaw(this.state.value)
                : '';
        }
    }
    componentDidMount() {
        const { date } = this.props;
        if (date) {
            this.setStateValue();
        }
    }
    componentDidUpdate(prevProps, prevState) {
        const { date, mode, onChange } = this.props;
        const { value, focused } = this.state;
        if (date && prevProps.date.getTime() !== date.getTime()) {
            this.setStateValue();
        }
        if (prevState.value !== value && value !== '' && focused) {
            const newDate = this.setDateValue(value);
            onChange(newDate, mode);
        }
    }
    render() {
        const { step, mode } = this.props;
        return (React.createElement(InputContainer, { className: `react-timebomb-number-input ${mode}`, onMouseEnter: this.onFocusIn, onMouseLeave: this.onFocusOut },
            React.createElement(Input, { "data-react-timebomb-selectable": true, type: "number", ref: this.ref, step: step, value: this.renderedValue, onChange: this.onChange, onFocus: this.onFocusIn, onBlur: this.onFocusOut, onKeyUp: this.onKeyUp }),
            React.createElement(Steps, null,
                React.createElement(Step, { "data-react-timebomb-selectable": true, tabIndex: -1, onClick: this.onStepUp }, "\u25B2"),
                React.createElement(Step, { "data-react-timebomb-selectable": true, tabIndex: -1, onClick: this.onStepDown }, "\u25BC"))));
    }
    setStateValue(value = this.props.date) {
        this.setState({ value: this.getDateValue(value) });
    }
    setDateValue(value) {
        const newDate = new Date(this.props.date);
        const newValue = parseInt(value || '0', 10);
        switch (this.props.mode) {
            case 'hour':
                newDate.setHours(newValue);
                break;
            case 'minute':
                newDate.setMinutes(newValue);
                break;
        }
        return newDate;
    }
    getDateValue(date) {
        switch (this.props.mode) {
            case 'hour':
                return date.getHours();
            case 'minute':
                return date.getMinutes();
        }
        return 0;
    }
    onFocusIn() {
        this.setState({ focused: true });
    }
    onFocusOut() {
        if (document.querySelector(':focus') !== this.ref.current) {
            this.setState({ focused: false });
        }
    }
    onChange(e) {
        const { date } = this.props;
        const { value } = e.currentTarget;
        if (value.length > 2) {
            e.preventDefault();
            return;
        }
        if (value === '') {
            this.setState({ value });
        }
        else if (date) {
            const newDate = this.setDateValue(value);
            this.setStateValue(newDate);
        }
    }
    onStepUp() {
        const { date, step } = this.props;
        const { value } = this.state;
        if (date && value !== undefined) {
            const newDate = this.setDateValue(value + step);
            this.setStateValue(newDate);
        }
    }
    onStepDown() {
        const { date, step } = this.props;
        const { value } = this.state;
        if (date && value !== undefined) {
            const newDate = this.setDateValue(value - step);
            this.setStateValue(newDate);
        }
    }
    onKeyUp(e) {
        switch (e.keyCode) {
            case utils_1.keys.ENTER:
                this.props.onSubmit(this.props.date, this.props.mode);
                break;
            case utils_1.keys.ESC:
                this.props.onCancel(undefined, this.props.mode);
                break;
        }
    }
}
NumberInput.defaultProps = {
    step: 1
};
exports.NumberInput = NumberInput;
//# sourceMappingURL=number-input.js.map
});
___scope___.file("menu/title.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styled_components_1 = require("styled-components");
const button_1 = require("../components/button");
const utils_1 = require("../utils");
const Container = styled_components_1.default.div `
    display: ${(props) => (props.show ? 'flex' : 'none')};
    align-items: center;
    width: 100%;
    padding: 10px;
    justify-content: space-between;
    box-sizing: border-box;
    white-space: nowrap;
`;
class MenuTitle extends React.PureComponent {
    get prevDisabled() {
        const { minDate, date } = this.props;
        if (minDate && date) {
            return utils_1.subtractDays(utils_1.startOfMonth(this.date), 1) < minDate;
        }
        return false;
    }
    get nextDisabled() {
        const { maxDate, date } = this.props;
        if (maxDate && date) {
            const lastDate = utils_1.isArray(date) ? date[date.length - 1] : date;
            return utils_1.addDays(utils_1.endOfMonth(lastDate), 1) > maxDate;
        }
        return false;
    }
    get date() {
        const { date, selectedRange } = this.props;
        return (utils_1.isArray(date) ? date[selectedRange] : date);
    }
    constructor(props) {
        super(props);
        this.monthNames = utils_1.getMonthNames();
    }
    render() {
        const { mode, showDate, onNextMonth, onPrevMonth, onMonth, onReset, onYear } = this.props;
        const show = (mode === 'day' ||
            mode === 'hour' ||
            mode === 'minute' ||
            mode === 'second') &&
            Boolean(showDate);
        const date = this.date;
        return (React.createElement(Container, { className: "react-timebomb-menu-title", show: show },
            React.createElement("div", null,
                React.createElement(button_1.Button, { className: "react-timebomb-button-month", tabIndex: -1, mobile: this.props.mobile, onClick: onMonth },
                    React.createElement("b", null, this.monthNames[date.getMonth()])),
                React.createElement(button_1.Button, { className: "react-timebomb-button-year", tabIndex: -1, mobile: this.props.mobile, onClick: onYear }, date.getFullYear())),
            React.createElement("div", null,
                React.createElement(button_1.Button, { className: "react-timebomb-button-month-prev", tabIndex: -1, disabled: this.prevDisabled, mobile: this.props.mobile, onClick: onPrevMonth }, "\u25C0"),
                React.createElement(button_1.Button, { className: "react-timebomb-button-month-reset", tabIndex: -1, mobile: this.props.mobile, onClick: onReset }, "\u25CB"),
                React.createElement(button_1.Button, { className: "react-timebomb-button-month-next", tabIndex: -1, disabled: this.nextDisabled, mobile: this.props.mobile, onClick: onNextMonth }, "\u25B6"))));
    }
}
exports.MenuTitle = MenuTitle;
//# sourceMappingURL=title.js.map
});
___scope___.file("value/value.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styled_components_1 = require("styled-components");
const utils_1 = require("../utils");
const button_1 = require("../components/button");
exports.Flex = styled_components_1.default.div `
    display: flex;
    align-items: center;
    white-space: nowrap;
    position: relative;
`;
exports.Container = styled_components_1.default(exports.Flex) `
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
    border: 1px solid #ccc;
    cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'};
    width: 100%;
    height: 100%;
    box-sizing: border-box;
`;
const Input = styled_components_1.default.span `
    padding: 2px 0 2px 0;
    min-width: 1px;
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'text')};
    pointer-events: ${(props) => props.disabled ? 'none' : 'auto'};

    &:focus {
        outline: none;
    }

    &:last-of-type {
        padding: 2px 10px 2px 0;
    }

    &:not(:last-of-type):after {
        content: attr(data-separator);
        min-width: 4px;
        display: inline-block;
    }

    &:empty:before {
        content: attr(data-placeholder);
        color: #aaa;
    }

    &:empty:not(:last-of-type):after {
        color: #aaa;
    }

    &:not([contenteditable='true']) {
        user-select: none;
    }
`;
exports.ClearButton = styled_components_1.default(button_1.SmallButton) `
    font-size: 18px;
`;
exports.Placeholder = styled_components_1.default.span `
    color: #aaa;
    user-select: none;
`;
exports.Icon = styled_components_1.default.span `
    margin-right: 5px;
    user-select: none;

    &:after {
        content: '${(props) => props.icon}';
    }
`;
const META_KEYS = [utils_1.keys.BACKSPACE, utils_1.keys.DELETE, utils_1.keys.TAB];
const FORBIDDEN_KEYS = [
    utils_1.keys.SHIFT,
    utils_1.keys.ARROW_LEFT,
    utils_1.keys.ARROW_RIGHT,
    utils_1.keys.ARROW_UP,
    utils_1.keys.ARROW_DOWN,
    utils_1.keys.TAB
];
class Value extends React.PureComponent {
    constructor(props) {
        super(props);
        this.inputs = [];
        this.onFocus = (() => {
            let timeout;
            return (e) => {
                clearTimeout(timeout);
                const input = e.currentTarget;
                utils_1.selectElement(input);
                timeout = setTimeout(() => {
                    if (!this.state.allSelected) {
                        const formatGroup = utils_1.getAttribute(input, 'data-group');
                        this.props.onChangeFormatGroup(formatGroup);
                    }
                }, 16);
            };
        })();
        this.state = {};
        this.onSearchRef = this.onSearchRef.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onDblClick = this.onDblClick.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClear = this.onClear.bind(this);
        this.onToggle = this.onToggle.bind(this);
    }
    get formatGroups() {
        return this.props.format.split('').reduce((memo, char) => {
            const prevChar = memo[memo.length - 1];
            if ((prevChar && char === prevChar.substr(0, 1)) ||
                (utils_1.formatSplitExpr.test(prevChar) &&
                    utils_1.formatSplitExpr.test(char))) {
                memo[memo.length - 1] += char;
            }
            else {
                memo = [...memo, char];
            }
            return memo;
        }, []);
    }
    get focused() {
        return document.querySelector(':focus');
    }
    get iconClass() {
        const { showTime, showDate } = this.props;
        if (!showDate && showTime) {
            return 'time';
        }
        return 'calendar';
    }
    get icon() {
        switch (this.iconClass) {
            case 'calendar':
                return '📅';
            case 'time':
                return '⏱';
        }
    }
    componentDidUpdate(prevProps) {
        setTimeout(() => {
            const { open, value, format, mode, allowValidation } = this.props;
            const hasFocus = this.inputs.some(inp => inp === this.focused);
            const allowTextSelection = mode === 'day' || mode === 'month' || mode === 'year';
            if (!hasFocus) {
                if (open) {
                    if (prevProps.value !== value && value) {
                        const parts = utils_1.splitDate(value, format);
                        const input = this.inputs[0];
                        this.inputs.forEach((input, i) => (input.innerText = parts[i]));
                        if (input && allowTextSelection) {
                            input.focus();
                        }
                    }
                    if (allowTextSelection) {
                        if (!prevProps.open || value !== prevProps.value) {
                            const [input] = this.inputs;
                            if (input) {
                                utils_1.selectElement(input);
                            }
                        }
                    }
                }
            }
            if (open &&
                prevProps.mode !== mode &&
                !this.state.allSelected &&
                allowTextSelection) {
                const input = this.inputs.find(el => {
                    const format = utils_1.getAttribute(el, 'data-group');
                    const type = utils_1.getFormatType(format);
                    return type === mode;
                });
                utils_1.selectElement(input);
            }
            if (!open && value) {
                const parts = utils_1.splitDate(value, format);
                this.inputs.forEach((input, i) => (input.innerText = parts[i]));
            }
            if (open && prevProps.value && !value && !allowValidation) {
                this.inputs.forEach(input => (input.innerText = ''));
            }
            if (!open) {
                this.setState({ allSelected: false });
            }
        }, 16);
    }
    componentDidMount() {
        if (this.props.value) {
            this.forceUpdate();
        }
    }
    render() {
        const { placeholder, value, showDate, showTime, disabled, open } = this.props;
        const ArrowButtonComp = this.props.arrowButtonComponent || button_1.ArrowButton;
        const showPlaceholder = placeholder && !open;
        const showClearer = value && !disabled;
        const timeOnly = showTime && !showDate;
        return (React.createElement(exports.Container, { "data-role": "value", className: "react-slct-value react-timebomb-value", disabled: disabled, onClick: this.onToggle },
            React.createElement(exports.Flex, null,
                React.createElement(exports.Icon, { icon: this.icon, className: `react-timebomb-icon ${this.iconClass}` }),
                React.createElement(exports.Flex, null,
                    this.renderValue(),
                    showPlaceholder && (React.createElement(exports.Placeholder, { className: "react-timebomb-placeholder" }, placeholder)))),
            React.createElement(exports.Flex, null,
                showClearer && (React.createElement(exports.ClearButton, { className: "react-timebomb-clearer", tabIndex: -1, onClick: this.onClear }, "\u00D7")),
                !timeOnly && (React.createElement(ArrowButtonComp, { disabled: disabled, open: open })))));
    }
    renderValue() {
        const { open, disabled, mobile, value } = this.props;
        const contentEditable = !disabled && !mobile;
        if (!open && !value) {
            return null;
        }
        const formatGroups = this.formatGroups;
        return (React.createElement(exports.Flex, null, formatGroups.map((group, i) => {
            if (group.split('').some(g => utils_1.formatSplitExpr.test(g))) {
                return null;
            }
            else {
                const separator = formatGroups[i + 1];
                return (React.createElement(Input, { "data-react-timebomb-selectable": true, contentEditable: contentEditable, disabled: disabled, "data-placeholder": group, "data-separator": utils_1.replaceSpaceWithNbsp(separator), key: group, "data-group": group, ref: this.onSearchRef, onKeyDown: this.onKeyDown, onKeyUp: this.onKeyUp, onFocus: this.onFocus, onBlur: this.onBlur, onClick: this.onClick, onDoubleClick: this.onDblClick, onChange: this.onChange }));
            }
        })));
    }
    onSearchRef(el) {
        if (el) {
            this.inputs.push(el);
        }
        else {
            this.inputs = [];
        }
    }
    onKeyDown(e) {
        const { onChangeValueText, format, value, allowValidation, timeStep } = this.props;
        const input = e.currentTarget;
        const { innerText, nextSibling, previousSibling } = input;
        const formatGroup = utils_1.getAttribute(input, 'data-group');
        const numericFormat = utils_1.formatIsActualNumber(formatGroup);
        const sel = getSelection();
        const hasSelection = Boolean(sel.focusOffset - sel.baseOffset);
        let numericValue = parseInt(innerText, 10);
        switch (e.keyCode) {
            case utils_1.keys.ENTER:
            case utils_1.keys.ESC:
            case utils_1.keys.BACKSPACE:
            case utils_1.keys.DOT:
            case utils_1.keys.COMMA:
                e.preventDefault();
                return;
            case utils_1.keys.ARROW_RIGHT:
                e.preventDefault();
                if (nextSibling instanceof HTMLSpanElement) {
                    nextSibling.focus();
                }
                else {
                    utils_1.selectElement(input);
                }
                return;
            case utils_1.keys.ARROW_LEFT:
                e.preventDefault();
                if (previousSibling instanceof HTMLSpanElement) {
                    previousSibling.focus();
                }
                else {
                    utils_1.selectElement(input);
                }
                return;
            case utils_1.keys.ARROW_UP:
            case utils_1.keys.ARROW_DOWN:
                e.preventDefault();
                if (!numericFormat) {
                    return;
                }
                const isArrowUp = e.keyCode === utils_1.keys.ARROW_UP;
                if (isNaN(numericValue)) {
                    numericValue = 0;
                }
                if (isFinite(numericValue)) {
                    const formatType = utils_1.getFormatType(formatGroup);
                    if (!allowValidation) {
                        const add = formatType === 'minute' ? timeStep || 1 : 1;
                        const nextValue = numericValue + (isArrowUp ? add : -add);
                        const valid = utils_1.validateFormatGroup(nextValue, formatGroup);
                        if (valid) {
                            input.innerText =
                                typeof valid === 'string'
                                    ? valid
                                    : utils_1.formatNumber(nextValue);
                        }
                    }
                    else {
                        if (value && formatType) {
                            const direction = isArrowUp ? 'add' : 'subtract';
                            const newDate = utils_1.manipulateDate(value, formatType, direction, timeStep);
                            const enabled = utils_1.isEnabled('day', newDate, this.props);
                            if (enabled) {
                                const dateParts = utils_1.splitDate(newDate, format);
                                this.inputs.map((inp, i) => (inp.innerText = dateParts[i]));
                            }
                        }
                    }
                    utils_1.selectElement(input);
                    onChangeValueText(utils_1.joinDates(this.inputs, format));
                }
                return;
        }
        const char = utils_1.stringFromCharCode(e.keyCode);
        const groupValue = innerText && !hasSelection ? innerText + char : char;
        if (META_KEYS.includes(e.keyCode) || e.metaKey || e.ctrlKey) {
            return;
        }
        if (!numericFormat) {
            e.preventDefault();
            return;
        }
        const valid = utils_1.validateFormatGroup(groupValue, formatGroup);
        if (!valid) {
            e.preventDefault();
        }
        else if (typeof valid === 'string') {
            e.preventDefault();
            input.innerText = valid;
        }
        if (this.state.allSelected &&
            e.keyCode !== utils_1.keys.BACKSPACE &&
            e.keyCode !== utils_1.keys.DELETE) {
            const [firstInput] = this.inputs;
            let validatedChar = utils_1.validateFormatGroup(char, formatGroup);
            if (validatedChar && validatedChar === true) {
                validatedChar = char;
            }
            if (validatedChar) {
                e.preventDefault();
                this.inputs.forEach((el, i) => i !== 0 && (el.innerText = ''));
                if (validatedChar.length === 2) {
                    utils_1.selectElement(firstInput);
                }
                else {
                    utils_1.clearSelection();
                    firstInput.innerText = validatedChar;
                    firstInput.focus();
                    utils_1.selectElement(firstInput, [1, 1]);
                }
            }
        }
        // validate group
        if (!hasSelection && innerText.length >= formatGroup.length) {
            e.preventDefault();
        }
    }
    onKeyUp(e) {
        const { onChangeValueText, format, onSubmit, onToggle } = this.props;
        const input = e.currentTarget;
        const { innerText, nextSibling, previousSibling } = input;
        if (e.keyCode === utils_1.keys.ENTER) {
            e.preventDefault();
            if (this.focused) {
                this.focused.blur();
            }
            onSubmit();
            return;
        }
        if (e.keyCode === utils_1.keys.ESC) {
            onToggle();
            return;
        }
        if (this.state.allSelected) {
            if (e.keyCode === utils_1.keys.BACKSPACE || e.keyCode === utils_1.keys.DELETE) {
                // delete all
                this.inputs.forEach(el => (el.innerText = ''));
                utils_1.selectElement(this.inputs[0]);
            }
            this.setState({ allSelected: false });
        }
        // remove text / focus prev
        else if (e.keyCode === utils_1.keys.BACKSPACE) {
            if (innerText) {
                input.innerText = '';
            }
            else if (previousSibling instanceof HTMLSpanElement) {
                utils_1.selectElement(previousSibling);
            }
        }
        // focus next
        else if ((innerText.length >= utils_1.getAttribute(input, 'data-group').length &&
            !FORBIDDEN_KEYS.includes(e.keyCode)) ||
            e.keyCode === utils_1.keys.DOT ||
            e.keyCode === utils_1.keys.COMMA) {
            if (!nextSibling) {
                utils_1.selectElement(input);
            }
            else if (nextSibling instanceof HTMLSpanElement) {
                utils_1.selectElement(nextSibling);
            }
            onChangeValueText(utils_1.joinDates(this.inputs, format));
        }
    }
    onClick(e) {
        utils_1.selectElement(e.currentTarget);
    }
    onDblClick(e) {
        const input = e.currentTarget;
        if (input.parentNode && this.inputs.some(el => Boolean(el.innerText))) {
            utils_1.selectElement(this.inputs[0]);
            utils_1.selectElement(input.parentNode);
            this.setState({ allSelected: true }, this.props.onAllSelect);
        }
    }
    onBlur(e) {
        if (!this.state.allSelected) {
            const input = e.target;
            const value = input.innerText;
            const dataGroup = utils_1.getAttribute(input, 'data-group');
            const formatType = utils_1.getFormatType(dataGroup);
            if (formatType) {
                const filledValue = utils_1.fillZero(value, formatType);
                if (filledValue) {
                    input.innerText = filledValue;
                }
            }
        }
        // check if timebomb is still focused
        setTimeout(() => {
            const { focused } = this;
            if (this.props.open &&
                focused &&
                !utils_1.getAttribute(focused, 'data-react-timebomb-selectable')) {
                this.props.onToggle();
            }
        }, 0);
    }
    onChange(e) {
        const { format, onChangeValueText } = this.props;
        const input = e.currentTarget;
        const { innerText, nextSibling } = input;
        onChangeValueText(utils_1.joinDates(this.inputs, format));
        if (innerText.length >= utils_1.getAttribute(input, 'data-group').length) {
            if (nextSibling instanceof HTMLSpanElement) {
                nextSibling.focus();
            }
        }
    }
    onClear(e) {
        e.stopPropagation();
        this.props.onClear();
    }
    onToggle(e) {
        const { open, disabled, onToggle } = this.props;
        if (disabled) {
            return;
        }
        if (!this.inputs.some(inp => inp === e.target) || !open) {
            onToggle();
        }
    }
}
exports.Value = Value;
//# sourceMappingURL=value.js.map
});
___scope___.file("typings.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const button_1 = require("./components/button");
exports.ReactTimebombArrowButtonProps = button_1.ArrowButtonProps;
//# sourceMappingURL=react-timebomb.js.map?tm=1549456933045
});
___scope___.file("value/value-multi.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const value_1 = require("./value");
const utils_1 = require("../utils");
const button_1 = require("../components/button");
class ValueMulti extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onClear = this.onClear.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
    }
    componentDidMount() {
        document.body.addEventListener('keyup', this.onKeyUp);
    }
    componentWillUnmount() {
        document.body.removeEventListener('keyup', this.onKeyUp);
    }
    render() {
        const { placeholder, value, open, disabled, onToggle } = this.props;
        const ArrowButtonComp = this.props.arrowButtonComponent || button_1.ArrowButton;
        const showPlaceholder = placeholder && !open;
        return (React.createElement(value_1.Container, { "data-role": "value", className: "react-slct-value react-timebomb-value", disabled: disabled, onClick: disabled ? undefined : onToggle },
            React.createElement(value_1.Flex, null,
                React.createElement(value_1.Icon, { className: "react-timebomb-icon", icon: "\uD83D\uDCC5" }),
                React.createElement(value_1.Flex, null,
                    this.renderValue(),
                    showPlaceholder && (React.createElement(value_1.Placeholder, { className: "react-timebomb-placeholder" }, placeholder)))),
            React.createElement(value_1.Flex, null,
                value && (React.createElement(value_1.ClearButton, { className: "react-timebomb-clearer", disabled: disabled, tabIndex: -1, onClick: this.onClear }, "\u00D7")),
                React.createElement(ArrowButtonComp, { disabled: disabled, open: open }))));
    }
    renderValue() {
        const { value } = this.props;
        if (!value) {
            return null;
        }
        return value.map(d => utils_1.dateFormat(d, 'DD.MM.YYYY')).join(' – ');
    }
    onClear(e) {
        e.stopPropagation();
        this.props.onClear();
    }
    onKeyUp(e) {
        const { open, onToggle } = this.props;
        switch (e.keyCode) {
            case utils_1.keys.ESC:
                if (open) {
                    onToggle();
                }
                break;
        }
    }
}
exports.ValueMulti = ValueMulti;
//# sourceMappingURL=value-multi.js.map
});
return ___scope___.entry = "index.jsx";
});

FuseBox.import("default/index.jsx");
FuseBox.main("default/index.jsx");
})
(function(e){function r(e){var r=e.charCodeAt(0),n=e.charCodeAt(1);if((m||58!==n)&&(r>=97&&r<=122||64===r)){if(64===r){var t=e.split("/"),i=t.splice(2,t.length).join("/");return[t[0]+"/"+t[1],i||void 0]}var o=e.indexOf("/");if(o===-1)return[e];var a=e.substring(0,o),f=e.substring(o+1);return[a,f]}}function n(e){return e.substring(0,e.lastIndexOf("/"))||"./"}function t(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];for(var n=[],t=0,i=arguments.length;t<i;t++)n=n.concat(arguments[t].split("/"));for(var o=[],t=0,i=n.length;t<i;t++){var a=n[t];a&&"."!==a&&(".."===a?o.pop():o.push(a))}return""===n[0]&&o.unshift(""),o.join("/")||(o.length?"/":".")}function i(e){var r=e.match(/\.(\w{1,})$/);return r&&r[1]?e:e+".js"}function o(e){if(m){var r,n=document,t=n.getElementsByTagName("head")[0];/\.css$/.test(e)?(r=n.createElement("link"),r.rel="stylesheet",r.type="text/css",r.href=e):(r=n.createElement("script"),r.type="text/javascript",r.src=e,r.async=!0),t.insertBefore(r,t.firstChild)}}function a(e,r){for(var n in e)e.hasOwnProperty(n)&&r(n,e[n])}function f(e){return{server:require(e)}}function u(e,n){var o=n.path||"./",a=n.pkg||"default",u=r(e);if(u&&(o="./",a=u[0],n.v&&n.v[a]&&(a=a+"@"+n.v[a]),e=u[1]),e)if(126===e.charCodeAt(0))e=e.slice(2,e.length),o="./";else if(!m&&(47===e.charCodeAt(0)||58===e.charCodeAt(1)))return f(e);var s=x[a];if(!s){if(m&&"electron"!==_.target)throw"Package not found "+a;return f(a+(e?"/"+e:""))}e=e?e:"./"+s.s.entry;var l,d=t(o,e),c=i(d),p=s.f[c];return!p&&c.indexOf("*")>-1&&(l=c),p||l||(c=t(d,"/","index.js"),p=s.f[c],p||"."!==d||(c=s.s&&s.s.entry||"index.js",p=s.f[c]),p||(c=d+".js",p=s.f[c]),p||(p=s.f[d+".jsx"]),p||(c=d+"/index.jsx",p=s.f[c])),{file:p,wildcard:l,pkgName:a,versions:s.v,filePath:d,validPath:c}}function s(e,r,n){if(void 0===n&&(n={}),!m)return r(/\.(js|json)$/.test(e)?h.require(e):"");if(n&&n.ajaxed===e)return console.error(e,"does not provide a module");var i=new XMLHttpRequest;i.onreadystatechange=function(){if(4==i.readyState)if(200==i.status){var n=i.getResponseHeader("Content-Type"),o=i.responseText;/json/.test(n)?o="module.exports = "+o:/javascript/.test(n)||(o="module.exports = "+JSON.stringify(o));var a=t("./",e);_.dynamic(a,o),r(_.import(e,{ajaxed:e}))}else console.error(e,"not found on request"),r(void 0)},i.open("GET",e,!0),i.send()}function l(e,r){var n=y[e];if(n)for(var t in n){var i=n[t].apply(null,r);if(i===!1)return!1}}function d(e){if(null!==e&&["function","object","array"].indexOf(typeof e)!==-1&&!e.hasOwnProperty("default"))return Object.isFrozen(e)?void(e.default=e):void Object.defineProperty(e,"default",{value:e,writable:!0,enumerable:!1})}function c(e,r){if(void 0===r&&(r={}),58===e.charCodeAt(4)||58===e.charCodeAt(5))return o(e);var t=u(e,r);if(t.server)return t.server;var i=t.file;if(t.wildcard){var a=new RegExp(t.wildcard.replace(/\*/g,"@").replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&").replace(/@@/g,".*").replace(/@/g,"[a-z0-9$_-]+"),"i"),f=x[t.pkgName];if(f){var p={};for(var v in f.f)a.test(v)&&(p[v]=c(t.pkgName+"/"+v));return p}}if(!i){var g="function"==typeof r,y=l("async",[e,r]);if(y===!1)return;return s(e,function(e){return g?r(e):null},r)}var w=t.pkgName;if(i.locals&&i.locals.module)return i.locals.module.exports;var b=i.locals={},j=n(t.validPath);b.exports={},b.module={exports:b.exports},b.require=function(e,r){var n=c(e,{pkg:w,path:j,v:t.versions});return _.sdep&&d(n),n},m||!h.require.main?b.require.main={filename:"./",paths:[]}:b.require.main=h.require.main;var k=[b.module.exports,b.require,b.module,t.validPath,j,w];return l("before-import",k),i.fn.apply(k[0],k),l("after-import",k),b.module.exports}if(e.FuseBox)return e.FuseBox;var p="undefined"!=typeof ServiceWorkerGlobalScope,v="undefined"!=typeof WorkerGlobalScope,m="undefined"!=typeof window&&"undefined"!=typeof window.navigator||v||p,h=m?v||p?{}:window:global;m&&(h.global=v||p?{}:window),e=m&&"undefined"==typeof __fbx__dnm__?e:module.exports;var g=m?v||p?{}:window.__fsbx__=window.__fsbx__||{}:h.$fsbx=h.$fsbx||{};m||(h.require=require);var x=g.p=g.p||{},y=g.e=g.e||{},_=function(){function r(){}return r.global=function(e,r){return void 0===r?h[e]:void(h[e]=r)},r.import=function(e,r){return c(e,r)},r.on=function(e,r){y[e]=y[e]||[],y[e].push(r)},r.exists=function(e){try{var r=u(e,{});return void 0!==r.file}catch(e){return!1}},r.remove=function(e){var r=u(e,{}),n=x[r.pkgName];n&&n.f[r.validPath]&&delete n.f[r.validPath]},r.main=function(e){return this.mainFile=e,r.import(e,{})},r.expose=function(r){var n=function(n){var t=r[n].alias,i=c(r[n].pkg);"*"===t?a(i,function(r,n){return e[r]=n}):"object"==typeof t?a(t,function(r,n){return e[n]=i[r]}):e[t]=i};for(var t in r)n(t)},r.dynamic=function(r,n,t){this.pkg(t&&t.pkg||"default",{},function(t){t.file(r,function(r,t,i,o,a){var f=new Function("__fbx__dnm__","exports","require","module","__filename","__dirname","__root__",n);f(!0,r,t,i,o,a,e)})})},r.flush=function(e){var r=x.default;for(var n in r.f)e&&!e(n)||delete r.f[n].locals},r.pkg=function(e,r,n){if(x[e])return n(x[e].s);var t=x[e]={};return t.f={},t.v=r,t.s={file:function(e,r){return t.f[e]={fn:r}}},n(t.s)},r.addPlugin=function(e){this.plugins.push(e)},r.packages=x,r.isBrowser=m,r.isServer=!m,r.plugins=[],r}();return m||(h.FuseBox=_),e.FuseBox=_}(this))
//# sourceMappingURL=react-timebomb.js.map?tm=1549459361115