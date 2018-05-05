import { connect } from 'react-redux';
import UnSaveMarker from './unsavedMarker';
import { UnSavedInstCreators } from '../../reducers/unSave';

const mapStateToProps = store => ({
    unSaved: store.unSaved,
});

const mapDispatchToProps = dispatch => ({
    ClearUnsaved: () => {
        dispatch(UnSavedInstCreators.clear());
    }
});
const UnSave = connect(mapStateToProps, mapDispatchToProps)(UnSaveMarker);

export default UnSave;
