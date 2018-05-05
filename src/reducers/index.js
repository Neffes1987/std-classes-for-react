import { combineReducers } from 'redux';

import alerts from './AlertsReduce';
import Progress from './ProgressReduce';
import App from './appReduce';
import unSaved from './unSave';

const rootReducer = combineReducers({
    alerts,
    Progress,
    App,
    unSaved
});

export default rootReducer;
