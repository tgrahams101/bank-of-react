import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';



class NewDebitForm extends Component {
    constructor() { 
        super();
        this.state = {
            description: '',
            debitAmount: 0
        };
        this.handleChangeAmount = this.handleChangeAmount.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
    }
    
    handleChangeDescription(event) {
        console.log(event.target.value);
        this.setState({description: event.target.value});
    }
    handleChangeAmount(event) {
        let number = parseInt(event.target.value);
        if (number) {
            this.setState({debitAmount: number});
        }
        console.log(this.state);
      
    }

    render() {
        
      return  (
        <section>
            <input type="text" onChange={this.handleChangeDescription} placeholder="put description"  />
            <input type="text" onChange={this.handleChangeAmount} placeholder="put amount here for debit"   />
            <button onClick={this.props.handleSubmit.bind(null, this.state.description, this.state.debitAmount)} > Submit </button>

        </section>

        );
    }
}


export default NewDebitForm;