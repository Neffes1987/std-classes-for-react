import stdReduce from './stdReduce';

class ALERT_REDUCE extends stdReduce {
    initialState = {
        text: ''
    };
    prefix = 'ALERT_REDUCE__';
    config = () => [
        { type: 'SHOW', method: this.show.bind(this) },
        { type: 'HIDE', method: this.hide.bind(this) },
    ];

    init = () => this.subscribeReduceOnActions(this.config());

    show = (clone, action) => {
        if (clone.text) return clone; 
        clone.text = action.text;
        return clone;
    };                                    

    hide = (clone) => {
        clone = '';
        return clone;
    };                                    
}

const ALERT_REDUCEInst = new ALERT_REDUCE();
ALERT_REDUCEInst.init();
export const AlertReduceInstCreators = ALERT_REDUCEInst.getActionCreators();
export default ALERT_REDUCEInst.checkActionForState;
