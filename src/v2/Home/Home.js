import React from 'react'
import '../Core.scss'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'
import Record from './Record/Record'
import RecordModal from './Record/RecordModal'

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

            modalShow: false
        }
        this.fetchRecords()
    }

    hideModal = () => this.setState({ modalShow: false })

    fetchRecords = async () => {
        let records = await fetch(`${API_URL}${RECORDS_ENDPOINT}`)
        let json = await records.json()

        this.setState({ records: json.records, total: json.total })
    }

    render() {
        return (
            <Container>
                <Row className="head mt-3">
                    <h3>Boris</h3>
                </Row>
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
                            this.state.records.map(record => <Record data={record} key={record._id} />)
                    }
                </Row>
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
                />
            </Container>
        )
    }
}

export default Home