import {connect} from "react-redux";
import DataSheet from "../components/DataSheet";
import {
    addNewEmptyDataSet,
    addNewEmptyDataToEverySet,
    setColorByIndex,
    setLabelByIndex,
    setNewDataByDataSetIndex,
    removeSeries,
    removeRovFromEverySet
} from "../actions/ChartActions";
import {deepCopyObject} from "../utils/utils";

const mapStateToProps = (state, ownProps) => ({
    dataSets: deepCopyObject(state.dataSets.present),
    type: state.dataSheet.present.type
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    setLabelByIndex: (newLabel, dataSetIndex) => dispatch(setLabelByIndex(newLabel, dataSetIndex)),
    setColorByIndex: (newColor, dataSetIndex) => dispatch(setColorByIndex(newColor, dataSetIndex)),
    addNewEmptyDataSet: () => dispatch(addNewEmptyDataSet()),
    addNewEmptyDataToEverySet: () => dispatch(addNewEmptyDataToEverySet()),
    addNewDataByDataSetIndex: (newData, dataSetIndex, dataIndex) => dispatch(setNewDataByDataSetIndex(newData, dataSetIndex, dataIndex)),
    removeSeries: (dataSetIndex) => dispatch(removeSeries(dataSetIndex)),
    removeRovFromEverySet: (dataIndex) =>  dispatch(removeRovFromEverySet(dataIndex))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DataSheet);