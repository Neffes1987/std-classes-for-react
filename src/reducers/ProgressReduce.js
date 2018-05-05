import stdReduce from './stdReduce';

class Progress_REDUCE extends stdReduce {
    initialState = {
        show: false
    };
    constructor(props) {
        super(props);
        this.prefix = 'Progress__';
    }
    config = () => [
        { type: 'toggle', method: this.toggle },
    ];

    init = () => this.subscribeReduceOnActions(this.config());

    toggle = (clone, action) => {
        clone.show = action.visible;
        return clone;
    };                                    
}

const ProgressInst = new Progress_REDUCE(null);
ProgressInst.init();
export const ProgressInstCreators = ProgressInst.getActionCreators();
export default ProgressInst.checkActionForState;
