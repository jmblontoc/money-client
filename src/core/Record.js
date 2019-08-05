import React from 'react'
import './Record.css'
import moment from 'moment'

class Record extends React.Component {

    formatter = "LLLL"
    momentObj = moment(this.props.record.date, this.formatter)
    formattedDate = this.props.record.is_old ? 
                        this.momentObj.format(this.formatter) : 
                        this.momentObj.add(8, 'h').format(this.formatter)


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