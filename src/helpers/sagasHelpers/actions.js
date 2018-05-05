// sagas labels
export const sagasFetchType = 'API_REQUIRE'; // send data to server - get answer and put it in store
export const sagasDispatchWithNotifi = 'DISPATCH_WITH_NOTIFI';
// put data to reduce and show red flag 'data unsaved in ui'

// sagas actions creators
export const FetchSaga = (
    RequestedType,
    url,
    body = {},
    method
) => ({
    type: sagasFetchType,
    url,
    body,
    RequestedType,
    method
});


export const dispatchWithNotifiSaga = (targetAction, notifiName, options = { field: 'data', oldValue: true }) => ({
    type: sagasDispatchWithNotifi,
    targetAction,
    notifiName,
    options
});

