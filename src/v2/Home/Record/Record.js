import React from 'react'
import '../../Core.scss'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Button from 'react-bootstrap/Button'
import RecordModal from './RecordModal'
const moment = require('moment-timezone')

class Record extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            modalShow: false,
            isProcessing: false,
            data: this.props.data,
        }

        this.isToday = moment().tz('Asia/Manila').format(`LL`) === moment(this.state.data.date, 'LLLL').tz('Asia/Manila').format(`LL`)

        this.reload = this.reload.bind(this)

        this.popover = (
            <Popover>
                <Popover.Title as="h3">{this.state.data.title}</Popover.Title>
                <Popover.Content>
                    <div>
                        {this.state.data.description}
                    </div>
                    <div>
                        <Button
                            variant="info"
                            size="sm"
                            className="mr-1 ml-1"
                            onClick={() => this.setState({ modalShow: true })}
                        >
                            <i className="fas fa-edit" />
                        </Button>
                        <Button
                            onClick={() => this.deleteRecord()}
                            variant="danger"
                            size="sm"
                            className="mr-1 ml-1">
                            <i className="fas fa-trash" />
                        </Button>
                    </div>
                </Popover.Content>
            </Popover>
        )
    }

    componentWillReceiveProps(props) {
        this.setState({data: props.data })
    }

    reload = () => {
        this.props.reload()
    }

    deleteRecord = () => {
        try {
            this.setState({ isProcessing: true })
            this.deleteRequest()
        } catch (error) {
        } finally {
            this.props.reload()
        }
    }

    deleteRequest = async () => {
        let url = `https://money-server-api.herokuapp.com/v2/records?id=${this.state.data._id}`
        let response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return await response.json()
    }

    render() {
        return (
            <>
                <OverlayTrigger
                    trigger="click"
                    placement="right"
                    overlay={this.popover}
                >
                    <div className="record-holder" data-today={this.isToday ? 'today' : ''}>
                        <div className="title">
                            {this.state.data.title}
                            <div className="sub">
                                {this.state.data.date}
                            </div>
                        </div>
                        <div className="amount text-right">
                            {this.state.data.amount}
                        </div>
                    </div>
                </OverlayTrigger>
                <RecordModal
                    reload={this.reload}
                    willAdd={false}
                    recordData={this.state.data}
                    hideModal={() => this.setState({ modalShow: false })}
                    show={this.state.modalShow} />
            </>
        )
    }
}

export default Record