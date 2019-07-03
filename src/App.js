import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Survey from './Survey/Survey';
import Preview from './Preview/Preview';
import Publish from './Publish/publish';
import Sidebar from './Side Bar/Sidebar';
import Edit from './Survey/edit';
import EditTemplate from './Survey/EditTemplate';
import Analyze from './Analyze/analyze';
//import Chart from './Analyze/test';
import Pageerr from './pageerr';
import UserPreview from './Preview/UserPreview';
import Responses from './Responses/Responses';
import Report from './Responses/Report';
import Cookies from 'js-cookie';
import ar from './Language/ar';
import en from './Language/en';
import { template } from '@babel/core';
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');



class App extends Component {

  constructor() {
    super();
    this.state = {
      language : '',
      survey_id: '',
      user_id: '',
      title: '',
      welcomeMessage: '',
      jsonLang : '',
      allow : true
    }
  }
  
  sendFile=(link,value,message) =>{
    if (localStorage.getItem(value) !== null)
    {let result=localStorage.getItem(value);
       fetch(link, {
            method: 'POST',
            headers: {
              'Accept' : 'application/json',
              'Content-Type' : 'application/json',  
            },
            body: result
        })
        .then(response =>  response.json())
        .then(data => { 
          localStorage.removeItem(value);
          alert(message); } )
        .catch(err => console.log(err)); 
      }

  }

  async componentDidMount() {
      let link;
      //console.log(Cookies.get("template"))
      //if(Cookies.get("template") == "true" )
        //link=`http://localhost:8080/survey/sendtemplate/${Cookies.get("survey")}` ;   
     // else 
      link=`http://localhost:8080/survey/sendsurveyinfo/${Cookies.get("survey")}`;

      if (Cookies.get("user") !== undefined){
        this.state.allow=true;
        
      await fetch(link)
      .then(response => response.json())
      .then(data => {
        this.setState({
          language : Cookies.get("Language"),
          survey_id: Cookies.get("survey"),
          user_id: data.user_id,
          title: data.title,
          welcomeMessage: data.welcomeMessage
        });
      })
      .catch(error => {
        console.log(error);
      });
    }
    else
    {
      this.state.allow=false;
    }
      this.sendFile('http://localhost:8080/results/submit','submit','your survey submitted');
      this.sendFile('http://localhost:8080/survey/savesurvey','survey','Your survey saved sucessfuly');
      this.sendFile('http://localhost:8080/survey/saveastemplate','template','Your template saved successfully');
      this.sendFile('http://localhost:8080/survey/editsurvey','esurvey','Your survey edited sucessfuly');
      this.sendFile('http://localhost:8080/survey/saveastemplate','etemplate','Your template saved successfully');
      await this.getJsonLanguage();
  }
  
  getJsonLanguage= ()=>{
    
    if(this.state.language === 'ar'){
        this.setState({
          jsonLang : ar
        })
    }
    else {
      this.setState({
        jsonLang : en
      })
    }

  }


  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            
            <Route path="/createsurvey" render={({ match }) => (
                <div>
                {this.state.allow ?
                <div>
                  <Sidebar survey_id={this.state.survey_id}
                    user_id={this.state.user_id}
                    lang={this.state.jsonLang}
                    styleLang={this.state.language}
                    />
                  <Survey
                    survey_id={this.state.survey_id}
                    user_id={this.state.user_id}
                    title={this.state.title}
                    lang={this.state.jsonLang}
                    welcomeMessage={this.state.welcomeMessage}
                    styleLang={this.state.language}
                    />

                </div>  : <Pageerr /> }
                </div>
            )} />

            <Route path="/preview/:id" render={({ match }) => (
              <div>
              {this.state.allow ?
              <div>
                <Preview lang={this.state.jsonLang}
                id={match.params.id} 
                styleLang={this.state.language}
                />
              </div>: <Pageerr />
                }</div>
            )} />

            <Route path="/userpreview/:id" render={({ match }) => (
              <div>
                <UserPreview 
                lang={this.state.jsonLang}
                styleLang={this.state.language}
                id={match.params.id} />
              </div>
            )} />

            <Route path="/publish" render={({ match }) => (
              <div>
                {this.state.allow ?
              <div>
                <Sidebar survey_id={this.state.survey_id}
                  user_id={this.state.user_id} 
                  lang={this.state.jsonLang}
                  styleLang={this.state.language}

                  />
                <Publish survey_id={this.state.survey_id}
                lang={this.state.jsonLang} 
                styleLang={this.state.language}/>
              </div>: <Pageerr />
              
            }</div>
              
              
            )} />

            <Route path="/responses/:id" render={({ match }) => (
              <div>
                {this.state.allow ?
              <div>
                <Sidebar survey_id={this.state.survey_id}
                  user_id={this.state.user_id} 
                  lang={this.state.jsonLang} 
                  styleLang={this.state.language}/>

                <Responses survey_id={match.params.id} 
                lang={this.state.jsonLang} 
                styleLang={this.state.language}/>
              </div>: <Pageerr />
              
              }</div>
                 
            )} />

            <Route path="/analyze/:id" render={({ match }) => (
              <div>
                {this.state.allow ?
              <div>
                <Sidebar survey_id={this.state.survey_id}
                  user_id={this.state.user_id} 
                  lang={this.state.jsonLang} 
                  styleLang={this.state.language}/>  
                  <br/><br/>
                  <div style={{ margin: '100px 10px'}}>
                    <Analyze 
                      survey_id={match.params.id}  
                      styleLang={this.state.language}/>
                  </div>
              </div>: <Pageerr />
                }</div>
            )} />

            <Route path="/edit/:id" render={({ match }) => (
              <div>
                {this.state.allow ?
              <div>
                <Sidebar survey_id={this.state.survey_id}
                  user_id={this.state.user_id} 
                  lang={this.state.jsonLang}
                  styleLang={this.state.language}
                  />
                <Edit
                  survey_id={match.params.id}
                  lang={this.state.jsonLang}
                  styleLang={this.state.language}

                />
              </div>: <Pageerr />
                }</div>
            )} />

             <Route path="/edittemplate/:id" render={({ match }) => (
              <div>
                <Sidebar survey_id={this.state.survey_id}
                  user_id={this.state.user_id} 
                  lang={this.state.jsonLang}
                  styleLang={this.state.language}
                  />
                <EditTemplate
                  survey_id={match.params.id}
                  lang={this.state.jsonLang}
                  styleLang={this.state.language}
                />
              </div>
            )} />

            <Route path="/report/:id" render={({ match }) => (
              <div>
                {this.state.allow ?
              <div>
              
                <Report survey_id={match.params.id} lang={this.state.jsonLang}                  
                   styleLang={this.state.language}
                />

              </div>: <Pageerr />
                }</div>
            )} />   

        
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
