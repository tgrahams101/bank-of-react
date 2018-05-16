import React, {Component} from 'react';
import { Redirect, Link } from 'react-router-dom';

class AccountBalance extends Component {
  render() {
    return (
        <div>
          Balance: {this.props.accountBalance}
        </div>
    );
  }
}

export default AccountBalance;