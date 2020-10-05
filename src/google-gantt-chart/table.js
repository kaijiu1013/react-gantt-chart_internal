import React, { Component } from 'react';
import Table  from 'react-bootstrap/Table';


class TableComponent extends Component {
    render() {
        return (
            <div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Task ID</th>
                        <th>Task Name</th>
                        <th>Resource</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Duration</th>
                        <th>Percent Complete</th>
                        <th>Dependencies</th>
                    </tr>
                </thead>
                {this.props.data_1.map((item, index) => (
                    <tbody>
                        <tr key={index}>
                            <td> {item[0]} </td>
                            <td> {item[1]} </td>
                            <td> {item[2]} </td>
                            <td> {item[3]} </td>
                            <td> {item[4]} </td>
                            <td> {item[5]} </td>
                            <td> {item[6]} </td>
                            <td> {item[7]} </td>
                        </tr>
                    </tbody>
                ))}
            </Table>
            </div>
        )
    }
}

export default TableComponent;