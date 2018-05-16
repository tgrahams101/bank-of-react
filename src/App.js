import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import axios from 'axios';
import Debits from './components/Debits';

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
  }
  componentDidMount() {
    const makeCall = async () => {
      try {
        let responseDebits = await axios.get("http://localhost:4000/debits");
        let responseCredits = await axios.get("http://localhost:4000/credits");
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
  
  
  
  render() {
    
    const HomeComponent = () => <Home accountBalance={this.state.accountBalance} /> ;
    const UserProfileComponent = () => {
      return (<UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />)
    };
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} {...this.props}/>)
    console.log(this.mockLogIn);
    const DebitsComponent = () => {
      return (<Debits  currentUser={this.state.currentUser} credits={this.state.credits} debits={this.state.debits} balance={this.state.accountBalance} /> )
    };

    return (
      <Router>
          <Switch>
            <Route exact path="/debits" render={DebitsComponent} />
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