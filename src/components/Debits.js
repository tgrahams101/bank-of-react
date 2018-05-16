import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import DebitEntry from './DebitEntry.js';


class Debits extends Component {


    

    render() {
        console.log(this.props);
        const showDebits = () => {
            if (this.props.debits) {
                return this.props.debits.map( (element) => {
                    return <DebitEntry entry={element} />
                });
            } else {
                return null;
            }
        };

      return  (
        <section>
            <h3>Debits Page </h3>
            <Link to="/"> Back Home </Link>

            {showDebits()}

        </section>

        );
    }
}


export default Debits;