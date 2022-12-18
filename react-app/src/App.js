import React, { Component, lazy, Suspense } from 'react';
import 'bulma/css/bulma.css';
import './styles.scss';
import { Redirect, Route, Switch } from 'react-router-dom';

//import { HeaderBar, NavBar, NotFound } from './components';
import  { NotFound } from './components';
import  { config } from './Config';
import  {PublicClientApplication } from '@azure/msal-browser'
import About from './About';

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
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: true
      }
    });
  }

  async login(){
    
   try{
      await this.PublicClientApplication.loginPopup(
        {
          scopes:config.scopes,
          prompt: 'select_account'
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
    this.PublicClientApplication.logoutPopup();
  }
  



  render() {
    return (

  



      <div className="parent">
          <header className="form_login">         
            {
              this.state.isAuthenticated ? <p>               
                <Redirect from="/" exact to="/status" />
              </p>:
               
                 
                    <p>
                    <button onClick={() => this.login()}>Login</button>
                    </p>
                
                
            }
          </header>
        </div>    
    );
  }
}

export default App;

{/* 
<div>
        <HeaderBar />
        <div className="section columns">
          <NavBar />
</main>
        </div>
      </div>

 */}
