import {
    SET_NEW_DATA_BY_DATA_SET_INDEX,
    SET_LABEL_BY_INDEX,
    SET_PURE_DATA, SET_COLOR_BY_INDEX, ADD_NEW_EMPTY_DATA_SET, ADD_NEW_EMPTY_DATA_TO_EVERY_SET, SET_DATA_LABEL,
    SET_CHART_TYPE, SET_CHART_TITLE, REMOVE_SERIES, REMOVE_ROW
} from "../constants/ChartActionTypes";
import {DEFAULT_COLOR_LIST} from "../constants/DefaultColorList";
import {deepCopyObject} from "../utils/utils";
import Highcharts from "highcharts";

const initialState = {

    title: {
        style: {visibility: 'hidden'},
        text: 'My chart'
    },
    mapNavigation: {
        enabled: true,
        enableDoubleClickZoomTo: true
    },
    yAxis: {
        title: {
            text: 'Total fruit consumption'
        },
        stackLabels: {
            enabled: true,
            style: {
                fontWeight: 'bold',
                color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
            }
        }
    },
    plotOptions: {
        column: {
            dataLabels: {
                enabled: true,
                color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
            }
        }
    },
    chart: {
        type: 'map'
    },
    series: [{
        index: 0,
        color: '#00ff00',
        name: 'zieloni',
        data: [[1, 2],[2, 4],[3, 1]]
    },
        {
            index: 1,
            color: '#ffff00',
            name: 'żółci',
            data: [[4, 2],[1, 4],[5, 3]]
        }]
};

export const dataSets = (state = initialState, action) => {
    let newState = deepCopyObject(state);
    switch(action.type) {
        case  SET_CHART_TYPE:
            newState.chart.type = action.newChartType;
            return newState;
        case SET_CHART_TITLE:
            newState.title.text = action.newTitle;
            return newState;
        case SET_LABEL_BY_INDEX:
            newState.series[action.dataSetIndex].name = action.newLabel;
            return newState;
        case SET_COLOR_BY_INDEX:
            newState.series[action.dataSetIndex].color = action.newColor;
            return newState;
        case ADD_NEW_EMPTY_DATA_SET:
            const newIndex = newState.series.length;
            const newData = newIndex === 0
                ? []
                : newState.series[0].data.map(()=> ([0,0]));
            newState.series.push({
                index: newIndex,
                name: `Seria ${newIndex+1}`,
                color: DEFAULT_COLOR_LIST[newIndex],
                data: newData
            });
            return newState;
        case ADD_NEW_EMPTY_DATA_TO_EVERY_SET:
            const newDataPrototype = [0,0];
            newState.series.forEach( set => set.data.push(deepCopyObject(newDataPrototype)) );
            return newState;
        case SET_NEW_DATA_BY_DATA_SET_INDEX:
            newState.series[action.dataSetIndex].data[action.dataIndex] = deepCopyObject(action.newData);
            return newState;
        case SET_PURE_DATA:
            let index = 0;
            return action.dataList.map( (data) => ({
                index: index,
                label: `Seria ${index}`,
                color: DEFAULT_COLOR_LIST[index++],
                data
            }));
        case SET_DATA_LABEL:
            newState.series[action.dataSetIndex].data[action.dataIndex].label = action.newLabel;
            return newState;
        case REMOVE_SERIES:
            for (let i = action.dataSetIndex + 1; i < newState.series.length; i++) {
                newState.series[i - 1] = newState.series[i];
                newState.series[i-1].index--;
            }
            if(newState.series.length > 1){
                newState.series.splice(newState.series.length-1,1);
            } else if (newState.series.length === 1){
                newState.series[0].index = 0;
                newState.series[0].name = 'Seria 1';
                newState.series[0].color = '#ffffff';
                newState.series[0].data = [[0,0]];
            }
            return newState;
        case REMOVE_ROW:
            const max = newState.series.length;
            for (let i = 0; i < max; i++) {
                console.log(newState.series[i].data);
                newState.series[i].data.splice(newState.series[i].data.length-1,1);
            }
            return newState;
        default:
            return state;
    }
};