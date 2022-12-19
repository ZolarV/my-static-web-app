import React, { Component} from 'react';
import 'bulma/css/bulma.css';
import './styles.scss';
import  { config } from './Config';
import  {PublicClientApplication } from '@azure/msal-browser'
/* import  {  TableServiceClient, AzureSASCredential} from '@azure/data-tables';
 */
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
          scopes:  config.scopes,
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
  /*  async getLatest(){
   
    var sas = '?sv=2021-06-08&ss=t&srt=sco&sp=rl&se=2023-01-10T06:08:43Z&st=2022-12-18T22:08:43Z&spr=https&sig=wFUjZHLzqG11pxrmp95uf9Niyd49FhuwHGk3ncc1Vcs%3D';
    var serviceClientWithSAS = new TableServiceClient('https://teststoragec2consultants.table.core.windows.net',new AzureSASCredential(sas));
   
    let tablesIter = serviceClientWithSAS.listTables();
    
    var tables = new Array();
    for await (const table of tablesIter) {
      tables += table.name;
      
    }
    return tables
} */



  render() {
    return (
      <div className='App'>
          <div className='App-header'>         
            {
              this.state.isAuthenticated ? 
              <p> 
                this getlatest table         
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
                  <table>
                    <thead>
                        <tr>
                            <th>Server</th>
                            <th>IP Address</th>
                            <th>State</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                  </table>
                  <div>
                    {this.getLatest()} 
                  </div>

                </div>
              </p>: 
              <p>
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
                  Logging in  {this.login()}
                </div>
                
                    
                 
              </p>  
            }
          </div>
        </div>    
    );
  }
}
export default App;