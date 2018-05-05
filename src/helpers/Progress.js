import React, { Component } from 'react'; //eslint-disable-line
import {
    connect
} from 'react-redux';
import LinearProgress from 'material-ui/LinearProgress';
import PropTypes from 'prop-types';
  
export class Progress extends React.Component {
    styles = {
        position: 'fixed',
        top: 0,
        left: 0,
    }
    render() {
        const { 
            Progress: {
                show = false
            } = {}
        } = this.props;
        return (
            <div >
                {show ? <LinearProgress size={80} thickness={5} style = {this.styles}/> : ''}
            </div>
        );
    }
}
    
Progress.propTypes = {
    Progress: PropTypes.shape({
        show: PropTypes.bool.isRequired
    })
    
};
Progress.defaultProps = {
    Progress: {
        show: false
    }
};

const mapStateToProps = store => ({
    Progress: store.Progress
});
const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Progress);
