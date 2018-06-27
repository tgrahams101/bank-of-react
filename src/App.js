import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import axios from 'axios';
import Debits from './components/Debits';
import Credits from './components/Credits';

class App extends Component {
  constructor() {
    super();
    this.state = {
      accountBalance: -14568.27,
      currentUser: {
        userName: 'bob_loblav',
        memberSince: '08/23/99',
      },
      debits: null,
      credits: null
    };
    this.handleDebitPayload = this.handleDebitPayload.bind(this);
    this.mockLogIn = this.mockLogIn.bind(this);
    this.processNewCredit = this.processNewCredit.bind(this);
    console.log('IN APP CONSTRUCTOR');
  }
  componentDidMount() {
    console.log('IN APP COMPONENT DID MOUNT');
    const makeCall = async () => {
      try {
        let responseDebits = await axios.get("/debits");
        let responseCredits = await axios.get("/credits");
        let debitsArray = responseDebits.data;
        let creditsArray = responseCredits.data;
        let debitSum  = debitsArray.reduce( (previous, current) => {
          return previous + current.amount;
        }, 0);
        let creditSum  = creditsArray.reduce( (previous, current) => {
          return previous + current.amount;
        }, 0);

        let balance = creditSum - debitSum;
        balance = parseFloat(Math.round(balance * 100) / 100).toFixed(2);
        console.log('PREVIOUS STATE', this.state.accountBalance);
        this.setState({accountBalance: balance});
        this.setState({credits: creditsArray});
        this.setState({debits: debitsArray});
        console.log('NEW STATE', this.state);        
        console.log(creditsArray, debitsArray);
      } catch (error) {
        console.log(error);
      }
           
    }
    makeCall();
  }



  mockLogIn(logInInfo) {
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser});
  }
  
  handleDebitPayload(payload) {
    console.log('HANDLE DEBIT PAY LOAD');
    this.state.debits.push(payload);
    console.log(this.state.debits[this.state.debits.length - 1]);
    // const balance = this.calculateBalance();
    // this.setState({accountBalance: balance});
    // console.log('DONE WITH HANDLE DEBIT PAYLOAD!', this.state.accountBalance);
    this.calculateBalance();
  }

  async processNewCredit(newCredit) {
    const dateNow = new Date(Date.now());
    const dateString = dateNow.toString();
    console.log('PROCESSING NEW CREDIT IN APP COMPONENT', newCredit);
    const creditsArray = [ ...this.state.credits];
    creditsArray.push({
      date: dateString,
      ...newCredit
    });
    console.log('BEFORE CREDITS SET STATE', this.state.credits)
    await this.setState({credits: creditsArray});
    console.log('AFTER CREDITS SET STATE', this.state.credits)
    // this.forceUpdate();
    console.log('AFTER CREDIT SET STATE, LAST NEW ENTRY', creditsArray[creditsArray.length - 1]);
    // let debitSum  = this.state.debits.reduce( (previous, current) => {
    //   return previous + current.amount;
    // }, 0);
    // let creditSum  = this.state.credits.reduce( (previous, current) => {
    //   return previous + current.amount;
    // }, 0);

    // let balance = creditSum - debitSum;
    // balance = parseFloat(Math.round(balance * 100) / 100).toFixed(2);
    console.log('PREVIOUS STATE', this.state.accountBalance);
    // const balance = this.calculateBalance();
    console.log('BEFORE CALCULATE BALANCE', this.state.credits);
    this.calculateBalance();
    // console.log('DEBUGGING', balance, this.state.credits.length, this.state.debits.length)
    // this.setState({accountBalance: balance});
    // console.log('DONE WITH HANDLE CREDIT PAYLOAD!', this.state.accountBalance);
  }

  calculateBalance() {
    console.log('STARTING CALCULATE BALANCE', this.state.credits);
    let debitSum  = this.state.debits.reduce( (previous, current) => {
      return previous + current.amount;
    }, 0);
    let creditSum  = this.state.credits.reduce( (previous, current) => {
      return previous + current.amount;
    }, 0);

    let balance = creditSum - debitSum;
    balance = parseFloat(Math.round(balance * 100) / 100).toFixed(2);
    console.log('PREVIOUS STATE', this.state.accountBalance);
    this.setState({accountBalance: balance});
    return balance;
  }
  
  
  render() {
    
    const HomeComponent = () => <Home accountBalance={this.state.accountBalance} /> ;
    const UserProfileComponent = () => {
      return (<UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />)
    };
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} {...this.props}/>);
    const DebitsComponent = () => {
      return (<Debits  callParentAdd={this.handleDebitPayload} currentUser={this.state.currentUser} credits={this.state.credits} debits={this.state.debits} balance={this.state.accountBalance} /> )
    };
    const CreditsComponent = () => {
      return (<Credits credits={this.state.credits} balance={this.state.accountBalance} processNewCredit={ this.processNewCredit }/> )
    };
    console.log('IN APP COMPONENT RENDER');
    return (
      <Router>
          <Switch>
            <Route exact path="/debits" render={DebitsComponent} />
            <Route exact path="/credits" render={CreditsComponent} />
            <Route exact path="/userProfile" render={UserProfileComponent} />
            <Route exact path="/login" render={LogInComponent} />
            <Route exact path="/" render={HomeComponent} />
            <Route component={UserProfile} />
          </Switch>
        </Router>
    );
  }
}

export default App;