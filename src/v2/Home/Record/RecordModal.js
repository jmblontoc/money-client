import React from 'react'

import '../../Core.scss'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'

class RecordModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            amount: 0,

            isProcessing: false
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

    submit = async () => {

        try {
            this.addRecord()
            this.setState({ isProcessing: true })

        } catch (error) {
            console.error(error)
        } finally {
            this.props.hideModal()
            this.setState({ isProcessing: false })
        }
    }

    render() {
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
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            value={this.state.amount}
                            onChange={(e) => this.setState({ amount: Number(e.target.value) })}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => this.submit()}>
                        {
                            this.state.isProcessing ?
                                <Spinner animation="border" size="sm" />
                                :
                                ''
                        }
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default RecordModal