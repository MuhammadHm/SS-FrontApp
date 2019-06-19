import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Survey from './Survey/Survey';
import Preview from './Preview/Preview';
import Publish from './Publish/publish';
import Sidebar from './Side Bar/Sidebar';
import Edit from './Survey/edit';
import UserPreview from './Preview/UserPreview';
import Responses from './Responses/Responses';
class App extends Component {

  constructor() {
    super();
    this.state = {
      survey_id: '',
      user_id: '',
      title: '',
      welcomeMessage: ' '
    }
  }
  componentDidMount() {

    fetch('http://localhost:8080/survey/sendsurveyinfo')
      .then(response => response.json())
      .then(data => {
        this.setState({
          survey_id: data.survey_id,
          user_id: data.user_id,
          title: data.title,
          welcomeMessage: data.welcomeMessage
        });
        console.log(this.state);
      })
      .catch(error => {
        console.log(error);
      });

  }
  render() {

    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/createsurvey" render={({ match }) => (
                <div>
                  <Sidebar survey_id={this.state.survey_id}
                    user_id={this.state.user_id}/>
                  <Survey
                    survey_id={this.state.survey_id}
                    user_id={this.state.user_id}
                    title={this.state.title}
                    welcomeMessage={this.state.welcomeMessage}/>
                </div>
            )} />

            <Route path="/preview/:id" render={({ match }) => (
              <div>
                <Preview id={match.params.id} />
              </div>
            )} />

            <Route path="/userpreview/:id" render={({ match }) => (
              <div>
                <UserPreview id={match.params.id} />
              </div>
            )} />

            <Route path="/publish" render={({ match }) => (
              <div>
                <Sidebar survey_id={this.state.survey_id}
                  user_id={this.state.user_id} />
                <Publish survey_id={this.state.survey_id} />
              </div>
            )} />

            <Route path="/responses/:id" render={({ match }) => (
              <div>
                <Sidebar survey_id={this.state.survey_id}
                  user_id={this.state.user_id} />
                <Responses survey_id={match.params.id} />
              </div>
            )} />

            <Route path="/analyze" render={({ match }) => (
              <div>
                <Sidebar survey_id={this.state.survey_id}
                  user_id={this.state.user_id} />
              </div>
            )} />

            <Route path="/edit/:id" render={({ match }) => (
              <div>
                <Sidebar survey_id={this.state.survey_id}
                  user_id={this.state.user_id} />
                <Edit
                  survey_id={match.params.id}
                />
              </div>
            )} />

            <Route path="/" render={({ match }) => (
              <div>
                <Sidebar survey_id={this.state.survey_id}
                  user_id={this.state.user_id} />
                <Survey />
              </div>
            )} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
