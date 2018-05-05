import { put, call } from 'redux-saga/effects';
import fetchApiData from '../support_functions';
import { AlertReduceInstCreators } from '../../reducers/AlertsReduce';
import { ProgressInstCreators } from '../../reducers/ProgressReduce';
import { UnSavedInstCreators } from '../../reducers/unSave';

export function* FetchSingleDataSagas(action) {
    try {
        yield put(ProgressInstCreators.toggle({ visible: true }));
        yield call(FetchDataSagas, action);
    } catch (error) {
        yield put(AlertReduceInstCreators.show({
            text: `${error}`,
            alertType: 'danger'
        }));
    } finally {
        yield put(ProgressInstCreators.toggle({ visible: false }));
    }
}


export function* unSavedNotifiSagas(action) {
    yield put({ ...action.targetAction });
    yield put(UnSavedInstCreators.change());
}

export function* FetchDataSagas(action) {
    const data = yield call(
        fetchApiData, 
        action.url, 
        action.body, 
        action.method
    );
    
    yield put(AlertReduceInstCreators.show({
        text: data.error || 'success'
    }));

    yield put(UnSavedInstCreators.clear());
   
    if (action.RequestedType) {
        yield put({ type: action.RequestedType, value: data, ...action.requestedOptions || {} });
    }
}

