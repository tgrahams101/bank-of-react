import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import DebitEntry from './DebitEntry.js';
import NewDebitForm from './NewDebitForm.js';


class Debits extends Component {
    constructor() {
        super();
        this.handleNewDebitSubmit = this.handleNewDebitSubmit.bind(this);
    }

    handleNewDebitSubmit(description, debitAmount) {
        console.log('Bruhhh!', this, description, debitAmount);
        let payload = {
            description,
            amount: debitAmount
        };
        payload.date = new Date(Date.now());
        payload.date = payload.date.toString();
        console.log('payLoad for POST', payload);
        this.props.callParentAdd(payload);
    }
    

    render() {
        
        console.log(this.props);
        const showDebits = () => {
            if (this.props.debits) {
                // return this.props.debits.map( (element, index) => {
                //     return <DebitEntry entry={element} key={index} />
                // });

                 for (let i = 0; i < this.props.debits; i++) {
                    return <DebitEntry entry= {this.props.debits[i]} key ={i} />
                }
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

            { (() => {
                 return this.props.debits.map( (element, index) => {
                    return <DebitEntry entry={element} key={index} />;
                });
            })()
            }

        </section>

        );
    }
}


export default Debits;