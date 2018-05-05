import React, { Component } from 'react'; //eslint-disable-line
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import { AlertReduceInstCreators } from '../reducers/AlertsReduce';

export class DialogAlert extends React.Component {
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
        this.props.clearAlert();
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.alert.text) {
            this.handleOpen();
            setTimeout(() => {
                this.handleClose();
            }, 3000);
        }
    }
    render() {
        return (
            <div>
                <Dialog
                    actions={[]}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    {this.props.alert.text}
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = store => ({
    alert: store.alerts
});
const mapDispatchToProps = dispatch => ({
    clearAlert: () => dispatch(AlertReduceInstCreators.hide())
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogAlert);
