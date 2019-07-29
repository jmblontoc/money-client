import React from 'react'
import './Add.css'

class Add extends React.Component {

    constructor(props) {
        super(props)

        this.addUrl = `https://money-server-api.herokuapp.com/v1/add-record`

        this.state = {
            // form data
            title: '',
            description: '',
            amount: 0,

            invalidAmount: false,
            emptyFields: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.goBack = this.goBack.bind(this)
        this.onSave = this.onSave.bind(this)
    }

    goBack() {
        this.props.willAdd(false)
    }

    handleChange(event) {
        let target = event.target
        let value = target.value
        let name = target.name

        this.setState({ [name]: value })
    }

    onSave() {

        if (isNaN(this.state.amount)) {
            this.setState({ invalidAmount: true })
            return
        }

        if (this.state.title.trim() === "") {
            this.setState({ emptyFields: true })
            return
        }

        this.setState({
            emptyFields: false,
            invalidAmount: false
        })

        fetch(this.addUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description,
                amount: parseFloat(this.state.amount)
            })
        })
            .then(res => res.json())
            .then(data => {
                this.goBack()
            })
            .catch(err => console.log(err))

    }

    render() {
        return (
            <div className="wrapper">
                <h1>Add Record </h1>
                <div className="form">
                    <div>
                        <div>
                            <label>Title</label>
                        </div>
                        <input 
                            name="title"
                            className="add-f"
                            onChange={this.handleChange} 
                            value={this.state.title} />
                    </div>
                    <div>
                        <div>
                            <label>Description</label>
                        </div>
                        <textarea
                            name="description"
                            value={this.state.description} 
                            className="add-f"
                            onChange={this.handleChange}></textarea>
                    </div>
                    <div>
                        <div>
                            <label>Amount</label>
                        </div>
                        <input 
                            name="amount"
                            className="add-f" 
                            value={this.state.amount}
                            onChange={this.handleChange} />
                    </div>
                    <div>
                        <button 
                            id="save"
                            onClick={this.onSave}>
                            Submit
                        </button>
                        <button 
                            id="back"
                            onClick={this.goBack}>
                            Back
                        </button>
                    </div>
                </div>
                <div className="errors">
                    {
                        this.state.invalidAmount &&

                        <p>Invalid amount entered </p>
                    }
                    {
                        this.state.emptyFields &&

                        <p>Please complete all fields</p>
                    }
                </div>
            </div>
        )
    }
}

export default Add