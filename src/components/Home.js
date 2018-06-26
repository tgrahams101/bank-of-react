import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    console.log('HOME COMPONENT');
    return (
        <div>
          <br />
          <Link to="/userprofile"> User Profile </Link> <br />
          <Link to="/login"> Log In</Link><br />
          <Link to="/debits"> See Debits </Link><br />
          <Link to="/credits"> See Credits </Link> <br />
          <img src="https://letstalkpayments.com/wp-content/uploads/2016/04/Bank.png" alt="bank"/>
          <h1>Bank of React</h1>
          <AccountBalance accountBalance={this.props.accountBalance}/>
          <br />
        </div>
    );
  }
}

export default Home;