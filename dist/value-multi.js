import * as React from 'react';
import { Container, Flex, Icon, Placeholder, ClearButton, ArrowButton } from './value';
import { dateFormat, keys } from './utils';
export class ValueMulti extends React.PureComponent {
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
        const { placeholder, value, open } = this.props;
        const showPlaceholder = placeholder && !open;
        return (React.createElement(Container, { "data-role": "value", className: "react-slct-value react-timebomb-value", onClick: this.props.onToggle },
            React.createElement(Flex, null,
                React.createElement(Icon, { className: "react-timebomb-icon", icon: "\uD83D\uDCC5" }),
                React.createElement(Flex, null,
                    this.renderValue(),
                    showPlaceholder && (React.createElement(Placeholder, { className: "react-timebomb-placeholder" }, placeholder)))),
            React.createElement(Flex, null,
                value && (React.createElement(ClearButton, { className: "react-timebomb-clearer", tabIndex: -1, onClick: this.onClear }, "\u00D7")),
                React.createElement(ArrowButton, { tabIndex: -1, className: "react-timebomb-arrow" }, open ? '▲' : '▼'))));
    }
    renderValue() {
        const { value } = this.props;
        if (!value) {
            return null;
        }
        return value.map(d => dateFormat(d, 'DD.MM.YYYY')).join(' – ');
    }
    onClear(e) {
        e.stopPropagation();
        this.props.onClear();
    }
    onKeyUp(e) {
        const { open, onToggle } = this.props;
        switch (e.keyCode) {
            case keys.ESC:
                if (open) {
                    onToggle();
                }
                break;
        }
    }
}
//# sourceMappingURL=value-multi.js.map