import React, { Component } from 'react';
import TimeLine from "react-gantt-timeline";
import './App.css';


class App extends Component {
    constructor(props) {
        super(props);
        let d1 = new Date('2020-09-15');
        let d2 = new Date('2020-09-20');
        let d3 = new Date('2020-09-21');
        let d4 = new Date('2020-09-25');

        let data = [
            {
                id: 1,
                start: d1,
                end: d2,
                name: 'task 1'
            },
            {
                id: 2,
                start: d3,
                end: d4,
                name: 'task 2'
            },

        ];

        this.state = {
            data: data,
            links: []
        };
    };

    genID() {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (
            S4() +
            S4() +
            "-" +
            S4() +
            "-4" +
            S4().substr(0, 3) +
            "-" +
            S4() +
            "-" +
            S4() +
            S4() +
            S4()
        ).toLowerCase();
    };

    createLink(start, end) {
        return {
            id: this.genID(),
            start: start.task.id,
            startPosition: start.position,
            end: end.task.id,
            endPosition: end.position
        };
    };

    onUpdateTask = (item, props) => {
        console.log(item)
        console.log(this.state.data[0])
        item.start = props.start;
        item.end = props.end;
        //this.setState({ data: [...this.state.data] });
       
    };

    onCreateLink = item => {
        let newLink = this.createLink(item.start, item.end);
        this.setState({ links: [...this.state.links, newLink] });
    };

    onSelectItem = (item) => {
        //console.log(item)
    };

    render() {
        return (
            <div className="app-container">

                <button onClick = {() => {
                 
                }} >click </button>

                <h1>Getting Started Demo</h1>
                {/* DayWidth<input type="range" min="30" max="500" value={this.state.daysWidth} onChange={this.handleDayWidth} step="1"/>
                Item Height<input type="range" min="30" max="500" value={this.state.itemheight} onChange={this.handleItemHeight} step="1"/> */}
                <div className="time-line-container">
                    <TimeLine
                        data={this.state.data}
                        links={this.state.links}
                        onUpdateTask={this.onUpdateTask}
                        onCreateLink={this.onCreateLink}
                        onSelectItem={this.onSelectItem}
                    />
                </div>
            </div>
        )
    }

}

export default App;

