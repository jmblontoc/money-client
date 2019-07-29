import React from 'react';
import Record from './Record'
import Add from './Add'
import './Main.css';

class Main extends React.Component {

    apiUrl = `https://money-server-api.herokuapp.com`
    recordsUrl = this.apiUrl.concat(`/v1/records`)

    constructor(props) {
        super(props)
        this.state = {
            records: null
        }
        this.willAdd = false
        this.willAddF = this.willAddF.bind(this)
    }

    willAddF() {
        this.setState({ willAdd: this.willAdd})
    }

    fetchRecords = () => {
        fetch(this.recordsUrl)
            .then(response => response.json())
            .then(data => {
                this.setState({ 
                    records: data.records, 
                    total: data.total,
                    willAdd: false
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    loadRecords = () => {

        if (this.state.records) {
            if (this.state.records.length > 0) {
                let records = this.state.records.map(record =>
                    <Record
                        record={record}
                        key={record._id} />)

                return <div>{records}</div>
            }
            else {
                return <div>No records</div>
            }
        }
        else {
            return <div>Loading... Please wait</div>
        }
    }

    componentDidMount() {
        this.fetchRecords()
    }

    render() {
        if (this.state.willAdd) {
            return(
                <div>
                    <Add 
                        willAdd={this.willAddF}/>
                </div>
            )
        }
        else {
            return (
                <div>
                    <div>
                        <p>Total: <b>{this.state.total ? this.state.total : 0}</b></p>
                    </div>
                    {this.loadRecords()}
                    <div 
                        id="add-btn"
                        onClick={() => { this.setState({ willAdd: true }) }}>
                        Add Record
                    </div>
                </div>
            )
        }
    }
}

export default Main