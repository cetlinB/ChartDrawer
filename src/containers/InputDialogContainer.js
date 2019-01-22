import {connect} from "react-redux";
import {setDataLabel} from "../actions/ChartActions";
import BasicLabelDialog from "../components/BasicLabelDialog";

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = (dispatch, ownProps) => ({
    setDataLabel: (newLabel, dataSetIndex, dataIndex) => dispatch(setDataLabel(newLabel, dataSetIndex, dataIndex))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BasicLabelDialog);