import _ from 'lodash';
import { FetchSaga, dispatchWithNotifiSaga } from '../helpers/sagasHelpers/actions';
/*
    class for creating reduce actions
    @param {object} action - config for action method
        - @param {string} type - type of action without prefix, prefix will be added automaticly
        - @param {function} method - the function, that do something with reduce state,
            if reduce playload is the same as for this function
        - @param {string} saga - The flag for the action generator.
            For this flag will be automaticly created new action creator function

    if saga not defined, will be set default action creator wich expect object like argument
     _getActionCreator = label => (params = {}) => ({
        type: label,
        ...params
    });

    getActionCreators - return object with actions gererated from config,
    where key is a action type from config item in lower case

    ...
    config = () => [
        {
            { type: 'action_type', method: some_func}
        }
    ]
    init(){
        this.subscribeReduceOnActions(this.config());

        const actions = this.getActionCreators();

        actions['action_type'] === _getActionCreator('action_type')
    }

*/

export default class StdReduce {
    _actions = {};
    actionCreators = {};
    _getFetchSaga = label => FetchSaga.bind(this, label);
    _getActionCreator = label => (params = {}) => ({
        type: label,
        ...params
    });
    _getNotifiAction = label => (params, name, notifiOptions) => dispatchWithNotifiSaga({
        type: label,
        ...params
    }, name, notifiOptions)

    _subscribeActionCreator = (type, creatorType) => {
        const label = (this.prefix + type).toUpperCase();
        switch (creatorType) {
        case 'fetch': return this._getFetchSaga(label);
        case 'notify':
            return this._getNotifiAction(label);
        default: return this._getActionCreator(label);
        }
    }

    _subscribeAction = (action) => {
        const type = action.type.toLowerCase();
        this._actions[type] = action.method;
        this.actionCreators[type] = this._subscribeActionCreator(type, action.saga);
    }
    remaneKey = (key, newKey, obj) => {
        obj[newKey] = _.cloneDeep(obj[key]);
        delete obj[key];
        return obj;
    }
    removeKey = (key, obj) => {
        delete obj[key];
        if (!_.values(obj).length) {
            return null;
        }
        return obj;
    }
    addNewProperty = (obj, key, value) => {
        if (!obj) { obj = {}; }
        obj[key] = value;
        return obj;
    }
    checkActionForState = (state = this.initialState || {}, action) => {
        if (!action.type) return state;
        const type = action.type.toLowerCase();
        const prefix = this.prefix.toLowerCase();
        const internalType = type.replace(prefix, '');
        // console.log({ state, action, internalType, prefix, type: this._actions });
        if (this._actions[internalType]) {
            const clone = _.cloneDeep(state);
            return this._actions[internalType](clone, action);
        }

        return state;
    }
    _setValueToTheReduceState = (state, action) => {
        const {
            block,
            fld,
            value
        } = action;
        if (fld) { block.push(fld); }
        _.set(state, block, value);
        return state;
    };
    subscribeReduceOnActions = actionsConfig => actionsConfig.forEach(this._subscribeAction);

    getActionCreators = () => this.actionCreators;
}
