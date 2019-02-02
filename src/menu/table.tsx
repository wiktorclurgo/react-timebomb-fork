import * as React from 'react';
import {
    ReactTimebombProps,
    ReactTimebombState,
    ReactTimebombDate
} from '../typings';
import {
    startOfMonth,
    startOfWeek,
    endOfWeek,
    addDays,
    getWeekdayNames,
    getWeekOfYear,
    isArray
} from '../utils';
import styled, { css } from 'styled-components';
import { WeekNum, Day } from './day';

interface MenuTableProps {
    showTime: ReactTimebombState['showTime'];
    showConfirm: ReactTimebombProps['showConfirm'];
    showCalendarWeek: ReactTimebombProps['showCalendarWeek'];
    selectWeek: ReactTimebombProps['selectWeek'];
    selectRange: ReactTimebombProps['selectRange'];
    value: ReactTimebombProps['value'];
    minDate: ReactTimebombProps['minDate'];
    maxDate: ReactTimebombProps['maxDate'];
    date: ReactTimebombState['date'];
    selectedRange: ReactTimebombState['selectedRange'];
    mobile: ReactTimebombProps['mobile'];
    onSelectDay(date: Date): void;
    onSubmit(): void;
}

interface MenuTableState {
    hoverDay?: Date;
}

interface TableProps {
    selectWeek?: boolean;
    mobile?: boolean;
}

const Table = styled.table`
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
        ${(props: TableProps) =>
            props.selectWeek
                ? css`
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

export class MenuTable extends React.PureComponent<
    MenuTableProps,
    MenuTableState
> {
    private weekdayNames!: string[];
    private monthMatrixCache = new Map<string, (Date[])[]>();

    private get monthMatrix(): (Date[])[] {
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
        const weeks: (Date)[][] = [];

        let base = startOfMonth(date);
        let week = 0;

        while (
            startOfWeek(base).getMonth() === dateMonth ||
            endOfWeek(base).getMonth() === dateMonth
        ) {
            const weekStart = startOfWeek(
                new Date(dateYear, dateMonth, week++ * 7 + 1)
            );

            weeks.push([
                weekStart,
                addDays(weekStart, 1),
                addDays(weekStart, 2),
                addDays(weekStart, 3),
                addDays(weekStart, 4),
                addDays(weekStart, 5),
                addDays(weekStart, 6)
            ]);

            base = addDays(base, 7);
        }

        this.monthMatrixCache.set(cacheKey, weeks);

        return weeks;
    }

    constructor(props: MenuTableProps) {
        super(props);

        this.state = {};

        this.weekdayNames = getWeekdayNames();

        this.onSelectDay = this.onSelectDay.bind(this);
        this.onDayMouseEnter = this.onDayMouseEnter.bind(this);
        this.onDayMouseLeave = this.onDayMouseLeave.bind(this);
    }

    public render() {
        const { showCalendarWeek, selectWeek, mobile } = this.props;
        const { hoverDay } = this.state;
        const [sun, mon, tue, wed, thu, fri, sat] = this.weekdayNames;

        return (
            <Table
                className="month"
                selectWeek={selectWeek}
                mobile={mobile}
                cellSpacing={0}
                cellPadding={0}
            >
                <thead>
                    <tr>
                        {showCalendarWeek && <th className="calendar-week" />}
                        <th>{mon}</th>
                        <th>{tue}</th>
                        <th>{wed}</th>
                        <th>{thu}</th>
                        <th>{fri}</th>
                        <th>{sat}</th>
                        <th>{sun}</th>
                    </tr>
                </thead>
                <tbody>
                    {this.monthMatrix.map(dates => {
                        const weekNum = getWeekOfYear(dates[0]);

                        return (
                            <tr key={weekNum}>
                                {showCalendarWeek && (
                                    <td className="calendar-week">
                                        <WeekNum
                                            day={dates[0]}
                                            onClick={this.onSelectDay}
                                        >
                                            {weekNum}
                                        </WeekNum>
                                    </td>
                                )}
                                {dates.map(date => (
                                    <td
                                        className="day"
                                        key={date.toISOString()}
                                    >
                                        <Day
                                            day={date}
                                            hoverDay={hoverDay}
                                            date={this.props.date}
                                            value={this.props.value}
                                            minDate={this.props.minDate}
                                            maxDate={this.props.maxDate}
                                            selectWeek={this.props.selectWeek}
                                            selectRange={this.props.selectRange}
                                            showTime={this.props.showTime}
                                            onSelectDay={this.onSelectDay}
                                            onMouseEnter={this.onDayMouseEnter}
                                            onMouseLeave={this.onDayMouseLeave}
                                        />
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    }

    private getDate(date: ReactTimebombDate) {
        return (isArray(date) ? date[this.props.selectedRange] : date)!;
    }

    private onSelectDay(date: Date): void {
        const { onSelectDay, showConfirm, onSubmit } = this.props;

        onSelectDay(date);

        if (!showConfirm) {
            onSubmit();
        }
    }

    private onDayMouseEnter(day: Date) {
        if (this.props.selectRange) {
            this.setState({ hoverDay: day });
        }
    }

    private onDayMouseLeave() {
        if (this.props.selectRange) {
            this.setState({ hoverDay: undefined });
        }
    }
}
