import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CreditEntry from './CreditEntry.js';
import './credits.css';



class Credits extends Component {
    constructor() {
        super();
        console.log('IN CREDITS CONSTRUCTOR');
    }

    componentDidMount() {
        console.log('PROPS IN CREDIT DID MOUNT', this.props);
    }

    componentDidUpdate() {
        console.log('PROPS IN CREDIT DID UPDATE', this.props);
    }

    render() {
        const style = {
            color: this.props.credits ? 'blue': 'red'
        };
        console.log('IN CREDITS RENDER');
        return (
            <div style={style}>
                <h1> Credits Page </h1>
                <h6> Account Balance is {this.props.balance} </h6>
                <Link to="/"> Go Home </Link>
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