import {
    SET_NEW_DATA_BY_DATA_SET_INDEX,
    SET_LABEL_BY_INDEX,
    SET_PURE_DATA, SET_COLOR_BY_INDEX, ADD_NEW_EMPTY_DATA_SET, ADD_NEW_EMPTY_DATA_TO_EVERY_SET, SET_DATA_LABEL,
    SET_CHART_TYPE, SET_CHART_TITLE
} from "../constants/ChartActionTypes";
import {DEFAULT_COLOR_LIST} from "../constants/DefaultColorList";
import {deepCopyObject} from "../utils/utils";
import Highcharts from "highcharts";

const initialState = {
    title: {
        style: {visibility: 'hidden'},
        text: 'My chart'
    },
    xAxis: {
        categories: ['Apples', 'Oranges', 'Pears']
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
        type: 'scatter'
    },
    series: [{
        color: '#00ff00',
        name: 'zieloni',
        data: [[1, 2],[2, 4],[3, 1]]
    },
        {
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
            const newIndex = newState.length;
            const newData = newIndex === 0
                ? []
                : newState.series.data.map(()=> ({

                }));
            newState.series.push({
                index: newIndex,
                name: `SET ${newIndex}`,
                color: DEFAULT_COLOR_LIST[newIndex],
                data: newData
            });
            return newState;
        case ADD_NEW_EMPTY_DATA_TO_EVERY_SET:
            const newDataPrototype = {
                    x: "",
                    y: "",
                    valid: true
            };
            newState.forEach( set => set.data.push(deepCopyObject(newDataPrototype)) );
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
        default:
            return state;
    }
};