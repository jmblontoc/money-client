import React from 'react'
import '../Core.scss'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'
import Record from './Record/Record'
import RecordModal from './Record/RecordModal'
const popper = require('popper-jm')

/** Constants below */
const API_URL = `https://money-server-api.herokuapp.com/v2`
const RECORDS_ENDPOINT = `/records`
/* - - - - - - - - - */

class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            records: null,
            total: 0,

            modalShow: false,
            refreshPage: false,
            totalToday: 0
        }
        this.reloadData = this.reloadData.bind(this)
    }

    reloadData = () => {
        setTimeout(() =>
            this.fetchRecords()
                .then(resp => {
                    this.setState({ records: resp.records, total: resp.total })
                })
                .catch(err =>
                    popper.createPopper({
                        color: '#dc3545',
                        body: document.body,
                        message: 'Something went wrong',
                        duration: 3,
                        icon: 'fas fa-times',
                        position: popper.BOTTOM_LEFT
                    }))
                .finally(() => {
                    popper.createPopper({
                        color: '#28a745',
                        body: document.body,
                        message: 'Data has been updated',
                        duration: 3,
                        icon: 'fas fa-check',
                        position: popper.BOTTOM_LEFT
                    })
                }), 1500)

    }

    hideModal = () => this.setState({ modalShow: false })

    fetchRecords = async () => {
        let temp = 0
        try {
            let records = await fetch(`${API_URL}${RECORDS_ENDPOINT}`)
            let json = await records.json()

            this.fetchTotalToday()

            temp = json
        }
        catch (err) {
            this.setState({ refreshPage: true })
        }
        finally {
            return new Promise(resolve => resolve(temp))
        }

    }

    fetchTotalToday = () => {
        fetch(`${API_URL}${RECORDS_ENDPOINT}/total/today`)
            .then(response => response.json())
            .then(data => this.setState({ totalToday: data.total }))
    }

    componentDidMount() {
        this.fetchRecords()
            .then(resp => {
                this.setState({ records: resp.records, total: resp.total })
            })
        
        this.fetchTotalToday()
    }

    render() {
        return (
            <Container>
                <Row className="head mt-3">
                    <h3>Boris</h3>
                </Row>
                {
                    !this.state.refreshPage ?
                        <>
                            <Row className="head">
                                <div className="total">
                                    Total Spendings:
                                    {
                                        this.state.total === 0 ?
                                            <span className="ml-1">
                                                <Spinner
                                                    animation="border"
                                                    size="sm"
                                                    variant="success"
                                                />
                                            </span>
                                            :
                                            <span className="font-weight-bold ml-1">{this.state.total}</span>
                                    }
                                </div>
                            </Row>
                            <Row className="head">
                                <div className="total">
                                    Total Spendings Today:
                                    {
                                        this.state.totalToday === 0 ?
                                            <span className="ml-1">
                                                <Spinner
                                                    animation="border"
                                                    size="sm"
                                                    variant="success"
                                                />
                                            </span>
                                            :
                                            <span className="font-weight-bold ml-1">{this.state.totalToday}</span>
                                    }
                                </div>
                            </Row>
                            <Row className="head main-holder">
                                {
                                    this.state.records === null ?
                                        <div className="record-loader">
                                            <Spinner
                                                animation="grow"
                                                size="lg"
                                                variant="success"
                                            />
                                            <Spinner
                                                animation="grow"
                                                size="lg"
                                                variant="success"
                                            />
                                            <Spinner
                                                animation="grow"
                                                size="lg"
                                                variant="success"
                                            />
                                        </div>
                                        :
                                        this.state.records.map(record =>
                                            (
                                                <Record
                                                    reload={this.reloadData}
                                                    data={record}
                                                    key={record._id}
                                                />
                                            )
                                        )
                                }
                            </Row>
                        </>
                        :
                        <div className="text-center p-4 m-4">Please refresh.</div>
                }
                {
                    this.state.records ?
                        <div className="add-btn" onClick={() => this.setState({ modalShow: true })}>
                            <i className="fas fa-plus" />
                        </div>
                        :
                        ``
                }

                <RecordModal
                    show={this.state.modalShow}
                    modalTitle="Add Record"
                    willAdd={true}
                    hideModal={() => this.hideModal()}
                    reload={this.reloadData}
                />
            </Container>
        )
    }
}

export default Home