import React from 'react';

class UnSaveMarker extends React.Component {
    style = {
        position: 'fixed',
        right: '31px',
        background: 'red',
        padding: '5px',
        color: 'white',
        borderRadius: '5px'
    }
    render() {
        if (!this.props.unSaved) return <div> </div>;
        return (
            <div style={this.style}>
                <span>You have not saved data</span>
            </div>
        );
    }
    componentWillMount() {
        this.props.ClearUnsaved();
    }
}

export default UnSaveMarker;
