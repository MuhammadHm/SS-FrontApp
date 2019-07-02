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
class App extends Component {

  constructor() {
    super();
    this.state = {
      language : '',
      survey_id: '',
      user_id: '',
      title: '',
      welcomeMessage: '',
      jsonLang : ''
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

                </div>
            )} />

            <Route path="/preview/:id" render={({ match }) => (
              <div>
                <Preview lang={this.state.jsonLang}
                id={match.params.id}
                styleLang={this.state.language}
                />
              </div>
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
                <Sidebar survey_id={this.state.survey_id}
                  user_id={this.state.user_id} 
                  lang={this.state.jsonLang}
                  styleLang={this.state.language}

                  />
                <Publish survey_id={this.state.survey_id}
                lang={this.state.jsonLang} 
                styleLang={this.state.language}
                />
              </div>
            )} />

            <Route path="/responses/:id" render={({ match }) => (
              <div>
                <Sidebar survey_id={this.state.survey_id}
                  user_id={this.state.user_id} 
                  lang={this.state.jsonLang} 
                  styleLang={this.state.language}
                  />
                <Responses survey_id={match.params.id} lang={this.state.jsonLang}
                                    styleLang={this.state.language}
                                    />
              </div>
            )} />

            <Route path="/analyze" render={({ match }) => (
              <div>
                <Sidebar survey_id={this.state.survey_id}
                  user_id={this.state.user_id} 
                  lang={this.state.jsonLang} 
                  styleLang={this.state.language}
                  />   
              </div>
            )} />

            <Route path="/edit/:id" render={({ match }) => (
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
              </div>
            )} />

            <Route path="/report/:id" render={({ match }) => (
              <div>
              
                <Report survey_id={match.params.id} lang={this.state.jsonLang}                  
                   styleLang={this.state.language}
                />

              </div>
            )} />   

        
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
