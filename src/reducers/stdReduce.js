import { set, cloneDeep } from 'lodash';
import { FetchSaga, dispatchWithNotifiSaga } from '../helpers/sagasHelpers/actions';

export default class StdReduce {
    _actions = {};
    actionCreators = {};

    _setValueToTheReduceState = (state, action) => {
        const {
            block,
            fld,
            value
        } = action;
        if (fld) { block.push(fld); }
        set(state, block, value);
        return state;
    };

    /** UNIQUE PREFIX BLOCK START */
    uniquePrefix = '';

    set prefix(value) {
        const lowedValue = value ? value.toLowerCase() : '';
        this.uniquePrefix = lowedValue;
    }

    get prefix() {
        return this.uniquePrefix;
    }
    
    /** INITIAL STATE BLOCK START */
    initialStateValues = {};

    set initialState(value) {
        this.initialStateValues = value;
    }
    
    get initialState() {
        return this.initialStateValues;
    }

    /** PUBLIC BLOCK START */
    /**
    * Method will get reduce action configuration and create action creators for each of them 
    * @author Neffes
    * @method subscribeReduceOnActions
    * @param {array} actionsConfig - it is a configuration collection, that consist of:
    * - type{string}[required] - label of action that later will be concat with prefix;
    * - method{func}[required] - it is a method that should implement changes for new cloned state;
    * - saga{string} - it is a additional property. By this flag class make decision what type of action
    * should be done. 
    * If it is empty will be created standard action by _getActionCreator
    * fetch - action by _getFetchSaga
    * notify - action by _getNotifiAction
    * another actions could be added in method _subscribeActionCreator
    */
    subscribeReduceOnActions = actionsConfig => actionsConfig.forEach(this._subscribeAction);

    /**
    * It does two things:
    * 1. adds action method in special set _actions, where the key - is a action type. 
    *   It is helped to find certain method faster then use switch sentence
    * 2. adds action creator to the special block. So no need to export from reduce action creator one by one
    *   It can be share for controller as a set of action creators 
    * @author Neffes
    * @method _subscribeAction
    * @param {object} action - it is action configuration record 
    */
    _subscribeAction = (action) => {
        const type = action.type.toLowerCase();
        this._actions[type] = action.method;
        this.actionCreators[type] = this._subscribeActionCreator(type, action.saga);
    }

    /**
    * Method choose what type of action creator should be implemented bt the creator type flag 
    * @author Neffes
    * @method _subscribeActionCreator
    * @param {string} type - the action name as a part for playload type 
    * @param {string} creatorType - the action creator type  
    * @return {function} returns function for creating action playload
    */ 
    _subscribeActionCreator = (type, creatorType) => {
        const label = (this.prefix + type).toUpperCase();
        switch (creatorType) {
        case 'fetch': return this._getFetchSaga(label);
        case 'notify': return this._getNotifiAction(label);
        default: return this._getActionCreator(label);
        }
    }

    /**
    * Saga action creator for dispatching fetch to server
    * @author Neffes
    * @method _getFetchSaga
    * @param {string} label - payload type what will be called when the saga will get answer from server
    * @return {object} will returns the action creator for reduce dispatching  
    */
    _getFetchSaga = label => FetchSaga.bind(this, label);

    /**
    * Standard reduce action. Will be assigned for no sagas actions
    * @author Neffes
    * @param {string} label - payload type what will be called when the action will be dispatched
    * @return {function} will returns action creator function. 
    * this function will get addition properties as 'params' for generating playload
    * @return {object} will returns the action creator for reduce dispatching  
    */
    _getActionCreator = label => (params = {}) => ({
        type: label,
        ...params
    });

    _getNotifiAction = label => (params, name, notifiOptions) => dispatchWithNotifiSaga({
        type: label,
        ...params
    }, name, notifiOptions)


    /**
    * This is a entry point method. When reduce starting to run each reduce function in list, 
    * this method will takes state and check incoming action with playloads stack 
    * that was assigned for certain reduce in configuration  
    * @author Neffes
    * @method checkActionForState
    * @param {any} state - it is a previously state from 'combineReducers' function
    * @param {object} action - it is playload and additional data that will be used for changing reduce state
    * @return {object} if instance of class does not has aaction labels for playload it is returns not changed state.
    * Otherwise it is calls a action method with cloned state as a first property and playload as a second 
    */

    checkActionForState = (state = this.initialState || {}, action) => {
        // in all cases when playload not for particular reduce, reduce should return back unchanged state
        if (!action.type) return state; 
        
        // get playload type
        const type = action.type.toLowerCase();
        
        // get prefix for reduce
        const prefix = this.prefix;
        
        // replace prefix from reduce
        // If playload created by action creator from particular reduce,
        // then the playload and reduce will be has the same prefix
        // but class keeps labels without prefix, so it should be excluded
        const internalType = type.replace(prefix, '');

        // than class compare incoming playload type with existing labels
        if (this._actions[internalType]) {
            // class automatically create clone for incoming change
            const clone = cloneDeep(state);
            // then it calls action method from configuration 
            // and then returns cloned and changed state as a result
            return this._actions[internalType](clone, action);
        }

        // if payload not match, then will return unchanged state
        return state;
    }

    /**
    * getter for action playloads creators 
    * @author Neffes
    * @method getActionCreators
    * @return {object} will return set of action creators that can be used as action for dispatching 
    */
    getActionCreators = () => this.actionCreators;
}
