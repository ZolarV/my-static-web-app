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
      <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1>Status Page</h1>
        </div>
      </div>
      <div class="row clearfix">
          <div class="col-md-12 column">
              <div class="panel panel-warning">
                <div class="panel-heading">
                  <h3 class="panel-title">
                    Not All Systems Operational
                    <small class="pull-right">Refreshed 39 minutes ago</small>
                  </h3>
                </div>                
              </div>
            

              <div class="row clearfix">
                  <div class="col-md-12 column">
                      <div class="list-group">
                        
                          <div class="list-group-item">
                              <h4 class="list-group-item-heading">
                                  Website and API 
                                  <a href="#"  data-toggle="tooltip" data-placement="bottom" title="Access website and use site API">
                                    <i class="fa fa-question-circle"></i>
                                  </a>
                              </h4>
                              <p class="list-group-item-text">
                                  <span class="label label-danger">Not Operational</span>
                              </p>
                          </div>
                        
                          <div class="list-group-item">
                              <h4 class="list-group-item-heading">
                                  SSH 
                                  <a href="#"  data-toggle="tooltip" data-placement="bottom" title="Access site using SSH terminal">
                                    <i class="fa fa-question-circle"></i>
                                  </a>
                              </h4>
                              <p class="list-group-item-text">
                                  <span class="label label-success">Operational</span>
                              </p>
                          </div>
                        
                          <div class="list-group-item">
                              <h4 class="list-group-item-heading">
                                  Database Server 
                                  <a href="#"  data-toggle="tooltip" data-placement="bottom" title="Access database server and execute queries">
                                    <i class="fa fa-question-circle"></i>
                                  </a>
                              </h4>
                              <p class="list-group-item-text">
                                  <span class="label label-success">Operational</span>
                              </p>
                          </div>
                          
                      </div>
                  </div>
              </div>
          </div>
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
