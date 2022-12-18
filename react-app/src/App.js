import React, { Component,  Suspense } from 'react';
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
      <div className="App">
          <div className="App-header">         
            {
              this.state.isAuthenticated ? 
              <p>               
              <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                <Redirect from="/" exact to="/status" />
                {/* <Route path="/status" component={status} /> */}
                <Route path="/about" component={About} />
                <Route exact path="**" component={NotFound} />
                </Switch>
              </Suspense>
              </p>: 
              <p>
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
                  <h1> I am centered </h1>
                  <button onClick={() => this.login()}>Login</button>
                </div>
                
                    
                 
              </p>  
            }
          </div>
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
