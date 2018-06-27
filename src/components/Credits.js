import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CreditEntry from './CreditEntry.js';
import './credits.css';



class Credits extends Component {
    constructor() {
        super();
        this.state = {
            newCredit: {

            },
            showNewCreditForm: false
        };
        console.log('IN CREDITS CONSTRUCTOR');
        this.handleInputChange = this.handleInputChange.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        console.log('PROPS IN CREDIT DID MOUNT', this.props);
    }

    componentDidUpdate() {
        console.log('PROPS IN CREDIT DID UPDATE', this.props);
    }

    handleInputChange(event) {
        const key = event.target.name;
        const value = event.target.value;
        console.log('VALUE OF INPUT', value, typeof value);
        const newCredit = { ...this.state.newCredit };
        newCredit[ key ] =  key == "amount" ? parseInt(value) : value;
        console.log('HANDLE INPUT CHANGE', newCredit);
        this.setState( (prevState, props)=> {
            console.log('PREV STATE IN SET STATE CALLBACK', prevState);
            console.log('CURRENT STATE IN SET STATE CALLBACK', this.state);
            return (
                { newCredit }
            );
        });
    }

    toggleForm() {
        const showNewCreditForm = !this.state.showNewCreditForm;
        this.setState({ showNewCreditForm });
    }

    handleSubmit(event) {
        console.log('HANDLING SUBMIT');
        event.preventDefault();
        this.props.processNewCredit(this.state.newCredit);
    }

    render() {
        const style = {
            color: this.props.credits ? 'blue': 'red'
        };
        console.log('IN CREDITS RENDER', this.state);
        const newCreditForm = (
            <div>
                <form onSubmit={ this.handleSubmit }>
                    <p> Title: <input type="text" name="description" placeholder="Title of Credit" onChange={this.handleInputChange} />
                    </p>
                    <p> Amount: <input type="number" name="amount" min="0.0" step="0.1" placeholder="Amount of Credit here" onChange={this.handleInputChange} />
                    </p>
                    <p> <input type="submit" value="Process New Credit" />
                    </p>
                </form>
            </div>
        )
        return (
            <div style={style}>
                <h1> Credits Page </h1>
                <h6> Account Balance is {this.props.balance} </h6>
                <Link to="/"> Go Home </Link>
                <button onClick={this.toggleForm } > {this.state.showNewCreditForm ? "Hide" : "Show Form"} </button>

                {this.state.showNewCreditForm && newCreditForm}
                <h4>Credits Display Area </h4>
                { this.props.credits && this.props.credits.map( (entry, index) => {
                    return(
                        <CreditEntry entry={entry} key={index}/>
                    );
                })  }
            </div>
        );
    }
}


export default Credits;