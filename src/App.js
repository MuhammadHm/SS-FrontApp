import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Survey from './Survey/Survey';
import Preview from './Preview/Preview';
import Publish from './Publish/publish';
import Sidebar from './Side Bar/Sidebar';
import Edit from './Survey/edit';
import UserPreview from './Preview/UserPreview';
import Responses from './Responses/Responses';
import Report from './Responses/Report';
import Cookies from 'js-cookie';
import ar from './Language/ar';
import en from './Language/en';
import Analyze from './Analyze/analyze';
import Chart from './Analyze/test';
import Pageerr from './pageerr';

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
      if (Cookies.get("user") !== undefined){
        this.state.allow=true;
      await fetch(`http://localhost:8080/survey/sendsurveyinfo/${Cookies.get("user")}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          language : Cookies.get("Language"),
          survey_id: data.survey_id,
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
<<<<<<< HEAD
    else  {
=======
    else {
>>>>>>> 90f827e622fd42a4d1e29567dffb99db38cc34ee
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
<<<<<<< HEAD
                    welcomeMessage={this.state.welcomeMessage}/>

                </div>  : <Pageerr />
                }</div>
=======
                    welcomeMessage={this.state.welcomeMessage}
                    styleLang={this.state.language}
                    />

                </div>
>>>>>>> 90f827e622fd42a4d1e29567dffb99db38cc34ee
            )} />

            <Route path="/preview/:id" render={({ match }) => (
              <div>
              {this.state.allow ?
              <div>
                <Preview lang={this.state.jsonLang}
<<<<<<< HEAD
                id={match.params.id} />
              </div>: <Pageerr />
                }</div>
=======
                id={match.params.id}
                styleLang={this.state.language}
                />
              </div>
>>>>>>> 90f827e622fd42a4d1e29567dffb99db38cc34ee
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
<<<<<<< HEAD
                lang={this.state.jsonLang} />
              </div>: <Pageerr />
                }</div>
=======
                lang={this.state.jsonLang} 
                styleLang={this.state.language}
                />
              </div>
>>>>>>> 90f827e622fd42a4d1e29567dffb99db38cc34ee
            )} />

            <Route path="/responses/:id" render={({ match }) => (
              <div>
                {this.state.allow ?
              <div>
                <Sidebar survey_id={this.state.survey_id}
                  user_id={this.state.user_id} 
<<<<<<< HEAD
                  lang={this.state.jsonLang} />
                <Responses survey_id={match.params.id} lang={this.state.jsonLang} />
              </div>: <Pageerr />
                }</div>
=======
                  lang={this.state.jsonLang} 
                  styleLang={this.state.language}
                  />
                <Responses survey_id={match.params.id} lang={this.state.jsonLang}
                                    styleLang={this.state.language}
                                    />
              </div>
>>>>>>> 90f827e622fd42a4d1e29567dffb99db38cc34ee
            )} />

            <Route path="/analyze/:id" render={({ match }) => (
              <div>
                {this.state.allow ?
              <div>
                <Sidebar survey_id={this.state.survey_id}
                  user_id={this.state.user_id} 
<<<<<<< HEAD
                  lang={this.state.jsonLang} />  
                  <br/><br/>
                  <div style={{ margin: '100px 10px'}}>
                    <Analyze 
                      survey_id={match.params.id}  />
                  </div>
              </div>: <Pageerr />
                }</div>
=======
                  lang={this.state.jsonLang} 
                  styleLang={this.state.language}
                  />   
              </div>
>>>>>>> 90f827e622fd42a4d1e29567dffb99db38cc34ee
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

<<<<<<< HEAD
            <Route path="/" render={({ match }) => (
              <div>
                {this.state.allow ?
              <div>
                <Sidebar survey_id={this.state.survey_id}
                  user_id={this.state.user_id} 
                  lang={this.state.jsonLang} />
                <Survey />
              </div>: <Pageerr />
                }</div>
            )} />
=======
        
>>>>>>> 90f827e622fd42a4d1e29567dffb99db38cc34ee
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
