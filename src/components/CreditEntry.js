import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';



const CreditEntry = (props) => {
    let date = new Date(props.entry.date);
    date = date.toDateString();
    
    return (
        <div>
            <hr />
            <p> Description: {props.entry.description} </p>
            <p> Amount: {props.entry.amount} </p>
            <p> Date: {date} </p>
            <hr />
        </div>        
    );
};

export default CreditEntry;