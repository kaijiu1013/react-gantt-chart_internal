import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { Chart } from "react-google-charts"
import { duration } from '@material-ui/core';



class App extends Component {
    constructor(props) {
        super(props);

        // const columns = [
        //     { title: 'Name', field: 'name' },
        //     { title: 'Surname', field: 'surname', initialEditValue: 'initial edit value' },
        //     { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
        //     {
        //         title: 'Birth Place',
        //         field: 'birthCity',
        //         lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
        //     },
        // ]

        // const data = [
        //     { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
        //     { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
        // ]

          // const data = [
        //     {task_Id: 'toTrain', task_Name: 'Walk to train stop', resource: 'walk', start_date: null, end_date: null, duration: 5 * 60 * 1000, percent_complete: 100, dependencies: null}
        // ]

        const columns = [
            {title: 'Task ID', field: 'task_Id'},
            {title: 'Task Name', field: 'task_Name'},
            {title: 'Resource', field: 'resource'},
            {title: 'Start Date', field: 'start_date'},
            {title: 'End Date', field: 'end_date'},
            {title: 'Duration', field: 'duration'},
            {title: 'Percent Complete', field: 'percent_complete'},
            {title: 'Dependencies', field: 'dependencies'},
        ]

      

        var data_1 = [
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
            // [
            //   'toTrain',
            //   'Walk to train stop',
            //   'walk',
            //   null,
            //   null,
            //   5 * 60 * 1000,
            //   100,
            //   null,
            // ],
            // [
            //   'music',
            //   'Listen to music',
            //   'music',
            //   null,
            //   null,
            //   70 * 60 * 1000,
            //   100,
            //   null,
            // ],
            // [
            //   'wait',
            //   'Wait for train',
            //   'wait',
            //   null,
            //   null,
            //   10 * 60 * 1000,
            //   100,
            //   'toTrain',
            // ],
            // ['train', 'Train ride', 'train', null, null, 45 * 60 * 1000, 75, 'wait'],
            // [
            //   'toWork',
            //   'Walk to work',
            //   'walk',
            //   null,
            //   null,
            //   10 * 60 * 1000,
            //   0,
            //   'train',
            // ],
            // [
            //   'work',
            //   'Sit down at desk',
            //   null,
            //   null,
            //   null,
            //   2 * 60 * 1000,
            //   0,
            //   'toWork',
            // ],
          ]

        this.state = {
            columns: columns,
            data: null,
            data_1: data_1
        };

    };

    get computedArr () {
        const { data_1 } = this.state;
        var data_2 = Object.assign([], data_1).splice(1); // create a new array to achieve the immutable state
        let arr = []
        let object = {
            task_Id: null, 
            task_Name: null, 
            resource: null, 
            start_date: null, 
            end_date: null, 
            duration: null, 
            percent_complete: null, 
            dependencies: null
        };

        for ( let i =0; i < data_2.length; i++) {
            object.task_Id = data_2[i][0]
            object.task_Name = data_2[i][1]
            object.resource =  data_2[i][2]
            object.start_date = data_2[i][3]
            object.end_date = data_2[i][4]
            object.duration = data_2[i][5]
            object.percent_complete = data_2[i][6]
            object.dependencies = data_2[i][7]

            arr.push(object);
            object = {
                task_Id: null, 
                task_Name: null, 
                resource: null, 
                start_date: null, 
                end_date: null, 
                duration: null, 
                percent_complete: null, 
                dependencies: null
            };
        }
        return arr
    };

    dataUpdate (inputArr) {
        console.log(inputArr)
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
          ];
        
        let insertArr = [];
        for (let i = 0; i<inputArr.length; i++) {
            insertArr.push(inputArr[i].task_Id);
            insertArr.push(inputArr[i].task_Name);
            insertArr.push(inputArr[i].resource);
            insertArr.push(null); //inputArr[i].start_date
            insertArr.push(null); //inputArr[i].end_date
            insertArr.push(this.toNumber(inputArr[i].duration)); //
            insertArr.push(this.toNumber(inputArr[i].percent_complete)); //
            insertArr.push(inputArr[i].dependencies);
            
            resultArr.push(insertArr);
            insertArr = [];
        }
        //console.log(resultArr)
        this.setState({data_1: resultArr});

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
            <div>{JSON.stringify(this.state.data_1)}</div>
            <h1>{JSON.stringify(this.computedArr)}</h1>

                <Chart
                    width={'100%'}
                    height={'400px'}
                    chartType="Gantt"
                    loader={<div>Loading Chart</div>}
                    data={this.state.data_1}
                    options={{
                        height: 275,
                        gantt: {
                            defaultStartDateMillis: new Date(2015, 3, 28),
                        },
                    }}
                />

                <MaterialTable
                    title="Editable Preview"
                    columns={this.state.columns}
                    data={this.computedArr}
                    editable={{
                        onRowAdd: newData =>
                            new Promise((resolve, reject) => { // onRowAdd function is working now 
                                setTimeout(() => {
                                    //this.setState({ data: [...this.state.data, newData] });
                                    let inputArr = [...this.computedArr ,newData]
                                    this.dataUpdate(inputArr)

                                    resolve();
                                }, 100)
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => { // onRowUpdate is not working
                                setTimeout(() => {
                                    //const dataUpdate = [...this.state.data];
                                    const dataUpdate = [...this.computedArr];
                                    const index = oldData.tableData.id;
                                    dataUpdate[index] = newData;
                                    //this.setState({ data: [...dataUpdate] });
                                    let inputArr = [...this.dataUpdate]
                                    this.dataUpdate(inputArr)

                                    resolve();
                                }, 1000)
                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => { // onRowDelete is not working
                                setTimeout(() => {
                                   // const dataDelete = [...this.state.data];
                                   const dataDelete = [...this.computedArr];
                                    const index = oldData.tableData.id;
                                    dataDelete.splice(index, 1);
                                    //this.setState({ data: [...dataDelete] });
                                    let inputArr = [...dataDelete];
                                    this.dataUpdate(inputArr)

                                    resolve()
                                }, 100)
                            }),
                    }}

                />
            </div>

        )
    }

}

export default App;
