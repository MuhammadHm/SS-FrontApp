import React,{Component} from 'react';
import {BrowserRouter ,Route , Switch ,Link} from 'react-router-dom';
import Survey from './Survey/Survey';
import Preview from './Preview/Preview';



class App extends Component {


    render(){

        return(
            <div>
                <BrowserRouter>
                    <Route path="/createsurvey" component={Survey} />
                    <Route path="/preview/:10" render={()=>{
                        return(
                            <Preview />
                        );
                        
                    }} />
                    <Route path="/responses" />
                    <Route path="/analyze" />

                </BrowserRouter>
            </div>
        );
    }

}


export default App;
