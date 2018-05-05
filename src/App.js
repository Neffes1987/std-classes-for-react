import React from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import Alert from './helpers/Alert';
import ProgressComp from './helpers/Progress'; 
import Buttons from './helpers/Action_buttons';
import Notify from './helpers/unSave';
import './App.css';
import {
    appReduceInstCreators
} from './reducers/appReduce';

class App extends React.Component {
    config = [
        { 
            title: 'Add new row',
            click: () => this.props.addField() 
        },
        {
            title: 'Save data',
            click: () => this.props.save(this.props.app)
        },
    ]
    
    style = {
        width: '60%',
        margin: 20,
        textAlign: 'center',
        display: 'inline-block',
    };
    render() {
        const {
            app = [],
        } = this.props;
        return (    
            <div className="App"> 
                <Alert/>
                <Notify/>
                <ProgressComp/>
                <h2>Fields for type</h2>
                <div>
                    <Paper style ={this.style}>
                        {app.map(item => (<AppRow key = {item.id} {...item} {...this.props}/>))}
                    </Paper>
                </div>
                <Buttons buttons={this.config}/>
            </div>
        );
    }
}
  
export class AppRow extends React.Component {
    deleteBtn = [{
        title: 'Delete row',
        click: () => this.props.deleteField(this.props.id)
    }];

    render() {
        const { 
            id = 0,
            title = '',
            changeField,
            value
        } = this.props;
        return (
            <div key = {id}>
                <TextField 
                    hintText={title} 
                    underlineShow={false}
                    value = {value}
                    onChange = {e => changeField(id, e.target.value)}
                />
                <Buttons buttons={this.deleteBtn} id = {id}/>
                <Divider/>
            </div>
        );
    }
}

const mapStateToProps = store => ({
    app: store.App
});
const mapDispatchToProps = dispatch => ({
    changeField: (id, value) => dispatch(appReduceInstCreators.update({ id, value }, 'UPDATE')),
    addField: () => dispatch(appReduceInstCreators.add({}, 'ADD')),
    deleteField: id => dispatch(appReduceInstCreators.delete({ id }, 'DELETE')),
    save: data => dispatch(appReduceInstCreators.fetch('/api/some_url/', data, 'POST')),
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
