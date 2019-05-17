import React,{Component} from 'react';
import {BrowserRouter ,Route , Switch ,Link} from 'react-router-dom';
import Survey from './Survey/Survey';
import Preview from './Preview/Preview';
import Publish from './Publish/publish'


class App extends Component {


    render(){

        return(
            <div>
                <BrowserRouter>
                    <Route path="/createsurvey" component={Survey} />
                    <Route path="/preview/:id" render={({match}) => (                        
                        <Preview id={match.params.id} />             
                    )} />
                    <Route path="/publish" component={Publish} />
                    <Route path="/responses" />
                    <Route path="/analyze" />

                </BrowserRouter>
            </div>
        );
    }

}


export default App;
