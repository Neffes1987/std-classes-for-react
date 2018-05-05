import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class Buttons extends React.Component {
    render() {
        const buttons = this.props.buttons || [];
        return (buttons.map(item => <Button_item key={item.title} {...item}/>));
    }
}

export class Button_item extends React.Component {
    render() {
        const {
            title = '',
            click,
            disabled = false,
            id = 0
        } = this.props;
        return (
            <RaisedButton
                onClick={click.bind(this, id)}
                disabled={disabled}
                label = {title}
            />
        );
    }
}
