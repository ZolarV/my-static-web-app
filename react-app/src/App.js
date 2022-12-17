import React, { Component, lazy, Suspense } from 'react';
import 'bulma/css/bulma.css';
import './styles.scss';
import { Redirect, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import { HeaderBar, NavBar, NotFound } from './components';
import { config } from './Config';
import  {PublicClientApplication } from '@azure/msal-browser'
import About from './About';

const Products = withRouter(
  lazy(() => import(/* webpackChunkName: "products" */ './products/Products'))
);

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      error: null,
      isAuthenticated: false,
      user: {}
    };
    this.login = this.login.bind(this)
    this.PublicClientApplication = new PublicClientApplication({
      auth:{
        clientId: config.appId,
        redirectUri: config.redirectUri,
        authority: config.authortiy
      },
      cache:{
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: true
      }
    });
  }

  async login(){
    try{
      await this.PublicClientApplication.loginPopup(
        {
          scopes:config.scopes,
          prompt: "select_account"
        }
      );
    this.setState({isAuthenticated:true})
    }
    catch(err){
      this.setState({
        isAuthenticated:false,
        user:{},
        error:err
      });
    }
  }
  
  logout(){
    this.PublicClientApplication.logout();
  }
  



  render() {
    return (
      <div>
        <HeaderBar />
        <div className="section columns">
          <NavBar />
          <main className="column">
            {
              this.state.isAuthenticated ? <p>
                <Suspense fallback={<div>Loading...</div>}>
               <Switch>
                 <Redirect from="/" exact to="/products" />
                 <Route path="/products" component={Products} />
                 <Route path="/about" component={About} />
                 <Route exact path="**" component={NotFound} />
               </Switch>
             </Suspense>
              </p>:
               <p>
                <button onClick={()=>this.login}>Log in</button>
               </p>
            }
           
          </main>
        </div>
      </div>
    );
  }
}

export default App;
