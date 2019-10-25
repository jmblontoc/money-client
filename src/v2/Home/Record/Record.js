import React from 'react'
import '../../Core.scss'

import Modal from 'react-bootstrap/Modal'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Button from 'react-bootstrap/Button'
import RecordModal from './RecordModal'

class Record extends React.Component {

    constructor(props) {
        super(props)
        this.data = this.props.data

        this.state = {
            modalShow: false
        }

        this.popover = (
            <Popover>
                <Popover.Title as="h3">{this.data.title}</Popover.Title>
                <Popover.Content>
                    <div>
                        {this.data.description}
                    </div>
                    <div>
                        <Button onClick={() => this.deleteRecord()} variant="danger" size="sm">
                            <i class="fas fa-trash" />
                        </Button>
                    </div>
                </Popover.Content>
            </Popover>
        )
    }

    deleteRecord = () => {
        try {
            this.deleteRecord()
        } catch (error) {
            console.log(error)
        }
    }

    deleteRequest = async () => {
        let url = `https://money-server-api.herokuapp.com/v2/records?id=${this.data.id}`
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
                    <div className="record-holder">
                        <div className="title">
                            {this.data.title}
                            <div className="sub">
                                {this.data.date}
                            </div>
                        </div>
                        <div className="amount text-right">
                            {this.data.amount}
                        </div>
                    </div>
                </OverlayTrigger>
                <RecordModal
                    show={this.state.modalShow} />
            </>
        )
    }
}

export default Record