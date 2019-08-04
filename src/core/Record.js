import React from 'react'
import './Record.css'
import moment from 'moment'

class Record extends React.Component {

    formatter = "LLLL"
    formattedDate = moment(this.props.record.date, this.formatter).add(8, 'h').format(this.formatter)


    render() {
        return (
            <div className="record-wrapper">
                <div className="column">
                    <div>
                        <b>{this.props.record.title}</b>
                    </div>
                    <div>
                        {this.props.record.description}
                    </div>
                    <div className="date-created">
                        {this.formattedDate}
                    </div>
                </div>
                <div className="column amount">
                    <span>{this.props.record.amount}</span>
                </div>
            </div>
        )
    }
}

export default Record