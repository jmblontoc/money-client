import React from 'react'

import '../../Core.scss'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import DatePicker from 'react-datepicker'
const moment = require('moment-timezone')

class RecordModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            amount: '',
            date: '',

            isProcessing: false
        }
    }

    componentDidMount() {
        if (!this.props.willAdd) {
            let date = moment(this.props.recordData.date, 'LLLL').tz('Asia/Manila').toDate()
            this.setState({
                title: this.props.recordData.title,
                description: this.props.recordData.description,
                amount: this.props.recordData.amount,
                date: date
            })
        }
    }

    addRecord = async () => {
        let url = `https://money-server-api.herokuapp.com/v2/records`
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })

        return await response.json()
    }

    editRecord = async () => {

        let body = { ...this.state }
        body.date = moment(body.date, 'LLL').tz('Asia/Manila').format('LLLL')

        let url = `https://money-server-api.herokuapp.com/v2/records?id=${this.props.recordData._id}`
        let response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
    }

    submit = async () => {

        try {
            if (this.props.willAdd) {
                this.addRecord()
            }
            else {
                this.editRecord()
            }

        } catch (error) {
            console.error(error)
        } finally {
            this.props.hideModal()
            this.props.reload()

            if (this.props.willAdd) {
                this.setState({
                    title: '',
                    description: '',
                    amount: '',
                    date: ''
                })
            }
        }
    }

    render() {

        let formDate = !this.props.willAdd ?
            <Form.Group>
                <Form.Label>Date</Form.Label>
                <DatePicker
                    selected={this.state.date}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={10}
                    timeCaption="time"
                    dateFormat="MMMM dd, yyyy hh:mm aa"
                    className="form-control"
                    onChange={(e) => this.setState({ date: e })}
                />
            </Form.Group>
            :
            ''

        return (
            <Modal
                show={this.props.show}
                onHide={() => this.props.hideModal()}
            >
                <Modal.Header
                    closeButton>
                    {this.props.modalTitle}
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Item</Form.Label>
                        <Form.Control
                            value={this.state.title}
                            onChange={(e) => this.setState({ title: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            value={this.state.description}
                            onChange={(e) => this.setState({ description: e.target.value })}
                            as="textarea"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            value={this.state.amount}
                            onChange={(e) => this.setState({ amount: Number(e.target.value) })}
                        />
                    </Form.Group>
                    {formDate}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => this.submit()}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default RecordModal