import React from 'react';
import ReactDataGrid from 'react-data-grid';
import { Chart } from "react-google-charts"


const columns = [
    { key: "task_id", name: "task id", editable: true },
    { key: "task_name", name: "task name", editable: true },
    { key: "resource", name: "resource", editable: true },
    { key: "start_date", name: "start date", editable: true },
    { key: "end_date", name: "end date", editable: true },
    { key: "duration", name: "duration", editable: true },
    { key: "percent_complete", name: "Percent Complete", editable: true},
    { key: "dependencies", name: "Dependencies", editable: true},
];

  const rows = [
    { task_id: '', task_name: '', resource: '', start_date: null, end_date: null, duration: 600000, percent_complete: 50,  dependencies: ''},
    { task_id: '', task_name: '', resource: '', start_date: null, end_date: null, duration: 600000, percent_complete: 50,  dependencies: ''},
    { task_id: '', task_name: '', resource: '', start_date: null, end_date: null, duration: 600000, percent_complete: 50,  dependencies: ''},
    { task_id: '', task_name: '', resource: '', start_date: null, end_date: null, duration: 600000, percent_complete: 50,  dependencies: ''},
  ];

  var chartDataExample = [
    [
        { type: 'string', label: 'Task ID' },
        { type: 'string', label: 'Task Name' },
        { type: 'string', label: 'Resource' },
        { type: 'date', label: 'Start Date' },
        { type: 'date', label: 'End Date' },
        { type: 'number', label: 'Duration' },
        { type: 'number', label: 'Percent Complete' },
        { type: 'string', label: 'Dependencies' },
      ],
    ['task1', 'task 1', 'resource1', null, null, 0, 0, ''],
    ['task2', 'task 2', 'resource2', null, null, 0, 0, ''],

  ];   

  class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rows: rows,
            chartData: chartDataExample
        };
    }
   
   
    //state = { rows };
    
    onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
      this.setState(state => {
        const rows = state.rows.slice();
        for (let i = fromRow; i <= toRow; i++) {
          rows[i] = { ...rows[i], ...updated };
        }
        this.setState({ rows: rows})
        this.dataUpdate(this.state.rows)
      });
    };


    dataUpdate (inputArr) {
        let resultArr = [];
        resultArr[0] =  [
            { type: 'string', label: 'Task ID' },
            { type: 'string', label: 'Task Name' },
            { type: 'string', label: 'Resource' },
            { type: 'date', label: 'Start Date' },
            { type: 'date', label: 'End Date' },
            { type: 'number', label: 'Duration' },
            { type: 'number', label: 'Percent Complete' },
            { type: 'string', label: 'Dependencies' },
          ]
  
        let insertArr = [];
        for (let i = 0; i<inputArr.length; i++) {
            insertArr.push(inputArr[i].task_id);
            insertArr.push(inputArr[i].task_name);
            insertArr.push(inputArr[i].resource);
            insertArr.push(null); //inputArr[i].start_date
            insertArr.push(null); //inputArr[i].end_date
            insertArr.push(this.toNumber(inputArr[i].duration)); //
            insertArr.push(this.toNumber(inputArr[i].percent_complete)); //
            insertArr.push(inputArr[i].dependencies);
            
            resultArr.push(insertArr);
            insertArr = [];
        }
        this.setState({chartData: resultArr});
    };

    toDate(elm) {
        return new Date(elm)
    }

    toNumber(elm) {
        return Number(elm)
    }

    render() {
      return (
        <div>
        {/* <div>{JSON.stringify(this.state.rows)}</div> */}
        {/* <div>{JSON.stringify(this.state.chartData)}</div> */}


        <Chart
                    width={'100%'}
                    height={'400px'}
                    chartType="Gantt"
                    loader={<div>Loading Chart</div>}
                    data={this.state.chartData}
                    options={{
                        height: 275,
                        gantt: {
                            defaultStartDateMillis: new Date(2015, 3, 28),
                        },
                    }}
                />

        <ReactDataGrid
          columns={columns}
          rowGetter={i => this.state.rows[i]}
          rowsCount={this.state.rows.length}
          onGridRowsUpdated={this.onGridRowsUpdated}
          enableCellSelect={true}
        />
        </div>
      );
    }
  }
  


export default App;
