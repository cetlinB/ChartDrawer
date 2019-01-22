import {connect} from "react-redux";
import DownloadCsv from "../components/DownloadCsv"
import {deepCopyObject} from "../utils/utils";

const mapStateToProps = (state, ownProps) => ({
    dataSets: deepCopyObject(state.dataSets.present)
});

export default connect(
    mapStateToProps
)(DownloadCsv);