import {
    takeEvery
} from 'redux-saga/effects';
import {
    sagasFetchType,
    sagasDispatchWithNotifi
} from '../helpers/sagasHelpers/actions';
import {
    unSavedNotifiSagas,
    FetchSingleDataSagas
} from '../helpers/sagasHelpers/generators';

// use them in parallel
export default function* sagas() {
    yield takeEvery(sagasFetchType, FetchSingleDataSagas);
    yield takeEvery(sagasDispatchWithNotifi, unSavedNotifiSagas);
}
