import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import DebitEntry from './DebitEntry.js';
import NewDebitForm from './NewDebitForm.js';


class Debits extends Component {
    constructor() {
        super();
        this.handleNewDebitSubmit = this.handleNewDebitSubmit.bind(this);
    }

    handleNewDebitSubmit(hi, now) {
        console.log('Bruhhh!', this, hi, now);
    }
    

    render() {
        console.log(this.props);
        const showDebits = () => {
            if (this.props.debits) {
                return this.props.debits.map( (element, index) => {
                    return <DebitEntry entry={element} key={index} />
                });
            } else {
                return null;
            }
        };

      return  (
        <section>
            <h3>Debits Page </h3>
            <h4> Your Account Balance: {this.props.balance} </h4>
            <NewDebitForm handleSubmit={this.handleNewDebitSubmit} />
            <Link to="/"> Back Home </Link>

            {showDebits()}

        </section>

        );
    }
}


export default Debits;