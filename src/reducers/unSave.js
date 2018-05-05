import stdReduce from './stdReduce';

class UnSaved extends stdReduce {
    initialState = false;
    prefix = 'UnSaved__';
    config = () => [
        { type: 'CHANGE', method: this.set },
        { type: 'CLEAR', method: this.clear },
    ];

    init = () => this.subscribeReduceOnActions(this.config());

    set = () => true;
    clear = () => false;                                    
}

const UnSavedInst = new UnSaved();
UnSavedInst.init();
export const UnSavedInstCreators = UnSavedInst.getActionCreators();
export default UnSavedInst.checkActionForState;
