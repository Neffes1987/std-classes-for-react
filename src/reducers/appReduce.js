import _ from 'lodash';
import stdReduce from './stdReduce';


class APP_REDUCE extends stdReduce {
    template = id => ({
        id,
        title: `field #${id + 1}`,
        value: ''
    })
    initialState = [this.template(0)];
    constructor() {
        super();
        this.prefix = 'APP_REDUCE__';
    }
    config = () => [
        { 
            type: 'FETCH', 
            method: this.updateOnServer.bind(this), 
            saga: 'fetch' 
        },
        {
            type: 'ADD',
            method: this.addNewRow.bind(this),
            saga: 'notify'
        },
        {
            type: 'DELETE',
            method: this.deleteRow.bind(this),
            saga: 'notify'
        },
        {
            type: 'UPDATE',
            method: this.updateRow.bind(this),
            saga: 'notify'
        },
    ];

    init = () => this.subscribeReduceOnActions(this.config());
    
    updateOnServer = clone => clone
    addNewRow = (clone) => {
        const latestRow = _.maxBy(clone, 'id');
        clone.push(this.template(latestRow ? latestRow.id + 1 : 0));
        return clone;
    };     

    deleteRow = (clone, action) => _.filter(clone, item => item.id !== action.id);

    updateRow = (clone, action) => {
        const { id, value } = action;
        const row = _.find(clone, item => item.id === id);
        row.value = value;
        return clone;
    };                                    
}

const APP_REDUCEInst = new APP_REDUCE();
APP_REDUCEInst.init();
export const appReduceInstCreators = APP_REDUCEInst.getActionCreators();
export default APP_REDUCEInst.checkActionForState;
