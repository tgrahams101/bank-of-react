import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';



const DebitEntry = (props) => {
    return (
        <div>
            <hr />
            <p> Description: {props.entry.description} </p>
            <p> Amount: {props.entry.amount} </p>
            <p> Date: {props.entry.date} </p>
            <hr />
        </div>        
    );

};

export default DebitEntry;